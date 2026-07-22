import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../utils/errors/app.error";
import Project from "../../models/project.model";
import Role, { IRole } from "../../models/role.model";
import { UpdateRoleInput } from "../../validators/role.validation";

export const getWorkspaceRolesService = async (
  workspaceId: string,
): Promise<IRole[]> => {
  return await Role.find({
    $or: [{ workspace: null }, { workspace: workspaceId }],
  })
    .sort({
      isSystem: -1,
      name: 1,
    })
    .lean();
};

export const updateWorkspaceRoleService = async (
  workspaceId: string,
  roleId: string,
  data: UpdateRoleInput,
): Promise<IRole> => {
  const role = await Role.findOne({
    _id: roleId,
    workspace: workspaceId,
  });
  if (!role) {
    throw new NotFoundError("Role not found.");
  }
  if (role.isSystem) {
    throw new ForbiddenError("System roles cannot be updated.");
  }
  if (data.name) {
    const normalizedName = data.name.trim().toLowerCase();
    const reservedNames = ["owner", "admin", "member", "viewer"];
    if (reservedNames.includes(normalizedName)) {
      throw new BadRequestError(`"${data.name}" is a reserved role name.`);
    }
    const duplicate = await Role.findOne({
      workspace: workspaceId,
      name: {
        $regex: `^${normalizedName}$`,
        $options: "i",
      },
      _id: { $ne: roleId },
    });
    if (duplicate) {
      throw new ConflictError(
        `A role named "${data.name}" already exists in this workspace.`,
      );
    }
    role.name = normalizedName;
  }

  if (data.permissions) {
    role.permissions = data.permissions;
  }
  await role.save();
  return role;
};

export const deleteWorkspaceRoleService = async (
  workspaceId: string,
  roleId: string,
): Promise<void> => {
  const role = await Role.findOne({
    _id: roleId,
    workspace: workspaceId,
  });

  if (!role) {
    throw new NotFoundError("Role not found.");
  }

  if (role.isSystem) {
    throw new ForbiddenError("System roles cannot be deleted.");
  }

  const inUse = await Project.findOne({
    workspace: workspaceId,
    "members.role": roleId,
  });

  if (inUse) {
    throw new BadRequestError(
      "This role is assigned to one or more project members. Reassign them before deleting.",
    );
  }

  await role.deleteOne();
};
