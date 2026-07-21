import { Types } from "mongoose";
import Workspace, { IWorkspace } from "../../models/workspace.model";
import { BadRequestError, NotFoundError } from "../../utils/errors/app.error";
import {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../../validators/worksapce.validator";
import User from "../../models/user.model";

export const createWorkspaceService = async (
  ownerId: string,
  data: CreateWorkspaceInput,
): Promise<IWorkspace> => {
  const { name, description, color, icon, isPrivate } = data;

  const existingWorkspace = await Workspace.findOne({
    owner: ownerId,
    name,
  });

  if (existingWorkspace) {
    throw new BadRequestError("Workspace with this name already exists.");
  }

  const workspace = await Workspace.create({
    name,
    description,
    color,
    icon,
    isPrivate,
    owner: new Types.ObjectId(ownerId),
    members: [
      {
        user: new Types.ObjectId(ownerId),
        role: "owner",
      },
    ],
  });
  return workspace;
};

export const getUserWorkspacesService = async (
  userId: string,
): Promise<IWorkspace[]> => {
  const workspaces = await Workspace.find({
    $or: [
      {
        owner: userId,
      },
      {
        "members.user": userId,
      },
    ],
  })
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar")
    .sort({ createdAt: -1 });

  return workspaces;
};

export const getWorkspaceByIdService = async (
  workspaceId: string,
): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(new Types.ObjectId(workspaceId))
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar");

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  return workspace;
};

export const updateWorkspaceService = async (
  workspaceId: string,
  data: UpdateWorkspaceInput,
): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  if (data.name && data.name !== workspace.name) {
    const existingWorkspace = await Workspace.findOne({
      owner: workspace.owner,
      name: {
        $regex: new RegExp(`^${data.name}$`, "i"),
      },
      _id: {
        $ne: workspaceId,
      },
    });

    if (existingWorkspace) {
      throw new BadRequestError("Workspace with this name already exists.");
    }
  }

  if (data.name !== undefined) {
    workspace.name = data.name;
  }

  if (data.description !== undefined) {
    workspace.description = data.description;
  }

  if (data.color !== undefined) {
    workspace.color = data.color;
  }

  if (data.icon !== undefined) {
    workspace.icon = data.icon;
  }

  if (data.isPrivate !== undefined) {
    workspace.isPrivate = data.isPrivate;
  }
  await workspace.save();
  await workspace.populate([
    {
      path: "owner",
      select: "name email avatar",
    },
    {
      path: "members.user",
      select: "name email avatar",
    },
  ]);

  return workspace;
};

export const deleteWorkspaceService = async (
  workspaceId: string,
): Promise<void> => {
  const workspace = await Workspace.findByIdAndDelete(workspaceId);
  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }
};

export const addWorkspaceMemberService = async (
  workspaceId: string,
  userId: string,
  role: "admin" | "member",
): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  const alreadyMember = workspace.members.some(
    (member) => member.user.toString() === userId,
  );

  if (alreadyMember) {
    throw new BadRequestError("User is already a member.");
  }
  workspace.members.push({
    user: new Types.ObjectId(userId),
    role,
    joinedAt: new Date(),
  });
  await workspace.save();
  await workspace.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
  ]);

  return workspace;
};

export const updateWorkspaceMemberRoleService = async (
  workspaceId: string,
  userId: string,
  role: "admin" | "member",
): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  const member = workspace.members.find((m) => m.user.toString() === userId);

  if (!member) {
    throw new NotFoundError("Member not found.");
  }

  if (member.role === "owner") {
    throw new BadRequestError("Owner role cannot be changed.");
  }

  member.role = role;

  await workspace.save();

  await workspace.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
  ]);

  return workspace;
};

export const removeWorkspaceMemberService = async (
  workspaceId: string,
  userId: string,
): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  const member = workspace.members.find((m) => m.user.toString() === userId);

  if (!member) {
    throw new NotFoundError("Member not found.");
  }

  if (member.role === "owner") {
    throw new BadRequestError("Owner cannot be removed.");
  }

  workspace.members = workspace.members.filter(
    (m) => m.user.toString() !== userId,
  );
  await workspace.save();
  await workspace.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
  ]);
  return workspace;
};
