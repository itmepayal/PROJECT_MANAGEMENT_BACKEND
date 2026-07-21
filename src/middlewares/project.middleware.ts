import { Request, Response, NextFunction } from "express";
import Project from "../models/project.model";
import type { IRole } from "../models/role.model";
import { ForbiddenError, NotFoundError } from "../utils/errors/app.error";

export const checkProjectAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    const userId = req.user!.id;

    const project = await Project.findById(projectId).populate("members.role");

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    const isOwner = project.owner.toString() === userId;

    const membership = project.members.find(
      (m) => m.user.toString() === userId,
    );

    if (!isOwner && !membership) {
      throw new ForbiddenError("No access to this project");
    }

    const role = membership!.role as unknown as IRole;
    req.project = project;
    req.projectPermissions = isOwner ? ["*"] : role.permissions;

    next();
  } catch (error) {
    next(error);
  }
};

export const requirePermission =
  (permission: string) => (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.projectPermissions ?? [];

    if (permissions.includes("*") || permissions.includes(permission)) {
      return next();
    }

    return next(new ForbiddenError(`Missing permission: ${permission}`));
  };
