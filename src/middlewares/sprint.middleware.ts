import { Request, Response, NextFunction } from "express";
import Sprint from "../models/sprint.model";
import { NotFoundError } from "../utils/errors/app.error";
import { checkProjectAccess } from "./project.middleware";

export const checkSprintAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sprintId } = req.params;
    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      throw new NotFoundError("Sprint not found.");
    }
    req.sprint = sprint;
    req.params.projectId = sprint.project.toString();
    return checkProjectAccess(req, res, next);
  } catch (err) {
    next(err);
  }
};
