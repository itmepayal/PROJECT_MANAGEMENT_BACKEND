import { Request, Response, NextFunction } from "express";
import Workspace from "../models/workspace.model";
import { ForbiddenError, NotFoundError } from "../utils/errors/app.error";

export const checkWorkspaceAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user!.id;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    const isOwner = workspace.owner.toString() === userId;
    const member = workspace.members.find((m) => m.user.toString() === userId);

    if (!isOwner && !member) {
      throw new ForbiddenError("You are not a member of this workspace");
    }

    req.workspace = workspace;
    req.workspaceRole = isOwner ? "owner" : member!.role;

    next();
  } catch (err) {
    next(err);
  }
};

export const requireWorkspaceAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.workspaceRole !== "owner" && req.workspaceRole !== "admin") {
    return next(new ForbiddenError("Admin access required"));
  }

  next();
};

export const requireWorkspaceOwner = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.workspaceRole !== "owner") {
    return next(
      new ForbiddenError("Only workspace owner can perform this action."),
    );
  }

  next();
};
