import { Types } from "mongoose";
import { BadRequestError, NotFoundError } from "../../utils/errors/app.error";
import User from "../../models/user.model";
import Project, { IProject } from "../../models/project.model";
import Role from "../../models/role.model";
import Workspace from "../../models/workspace.model";
import Board from "../../models/board.model";

export const addProjectMemberService = async (
  projectId: string,
  userId: string,
  roleId: string,
): Promise<IProject> => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError("Project not found.");
  }

  const workspace = await Workspace.findById(project.workspace);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  const isWorkspaceMember =
    workspace.owner.toString() === userId ||
    workspace.members.some((member) => member.user.toString() === userId);

  if (!isWorkspaceMember) {
    throw new BadRequestError(
      "User must be a member of the workspace before joining this project.",
    );
  }

  const role = await Role.findById(roleId);

  if (!role) {
    throw new NotFoundError("Role not found.");
  }

  if (role.name === "Owner") {
    throw new BadRequestError("Owner role cannot be assigned.");
  }

  const alreadyMember =
    project.owner.toString() === userId ||
    project.members.some((member) => member.user.toString() === userId);

  if (alreadyMember) {
    throw new BadRequestError("User is already a member of this project.");
  }

  project.members.push({
    user: new Types.ObjectId(userId),
    role: new Types.ObjectId(roleId),
    joinedAt: new Date(),
  });

  await project.save();

  await project.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
    { path: "members.role" },
  ]);

  return project;
};

export const updateProjectMemberRoleService = async (
  projectId: string,
  userId: string,
  roleId: string,
): Promise<IProject> => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError("Project not found.");
  }

  const workspace = await Workspace.findById(project.workspace);

  if (!workspace) {
    throw new NotFoundError("Workspace not found.");
  }

  if (project.owner.toString() === userId) {
    throw new BadRequestError("Project owner's role cannot be changed.");
  }

  const member = project.members.find((m) => m.user.toString() === userId);

  if (!member) {
    throw new NotFoundError("Member not found.");
  }

  const role = await Role.findById(roleId);

  if (!role) {
    throw new NotFoundError("Role not found.");
  }

  if (role.name === "Owner") {
    throw new BadRequestError("Owner role cannot be assigned.");
  }

  member.role = new Types.ObjectId(roleId);

  await project.save();
  await project.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
    { path: "members.role" },
  ]);

  return project;
};

export const removeProjectMemberService = async (
  projectId: string,
  userId: string,
): Promise<IProject> => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError("Project not found.");
  }

  if (project.owner.toString() === userId) {
    throw new BadRequestError("Project owner cannot be removed.");
  }

  const member = project.members.find((m) => m.user.toString() === userId);

  if (!member) {
    throw new NotFoundError("Member not found.");
  }

  project.members = project.members.filter((m) => m.user.toString() !== userId);

  await project.save();
  await project.populate([
    { path: "owner", select: "name email avatar" },
    { path: "members.user", select: "name email avatar" },
    { path: "members.role" },
  ]);

  return project;
};

export const createBoardService = async (
  projectId: string,
  workspaceId: string,
  userId: string,
  data: any,
) => {
  const board = await Board.create({
    ...data,
    project: projectId,
    workspace: workspaceId,
    createdBy: userId,
  });
  return board;
};

export const listBoardsService = async (projectId: string) => {
  return Board.find({ project: projectId }).sort({ createdAt: -1 });
};
