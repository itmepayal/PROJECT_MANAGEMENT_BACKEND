import { Request, Response, NextFunction } from "express";
import Role from "../models/role.model";
import { NotFoundError, ForbiddenError } from "../utils/errors/app.error";
import {
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
} from "./workspace.middleware";

export const attachRoleAndCheckAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findById(roleId);

    if (!role) {
      throw new NotFoundError("Role not found.");
    }

    if (role.isSystem || !role.workspace) {
      throw new ForbiddenError("System roles cannot be modified or deleted.");
    }

    req.role = role;
    req.params.workspaceId = role.workspace.toString();

    return checkWorkspaceAccess(req, res, (err?: any) => {
      if (err) return next(err);
      return requireWorkspaceAdmin(req, res, next);
    });
  } catch (error) {
    next(error);
  }
};
