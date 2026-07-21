import {
  addProjectMemberSchema,
  updateProjectMemberRoleSchema,
} from "../../validators/project.validator";
import {
  addProjectMemberService,
  updateProjectMemberRoleService,
  removeProjectMemberService,
} from "./project.service";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import logger from "../../config/logger.config";
import { AppResponse } from "../../utils/response/app.response";

export const addProjectMemberController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const { userId, roleId } = addProjectMemberSchema.parse(req.body);
    const project = await addProjectMemberService(projectId, userId, roleId);
    logger.info(`User ${userId} added to project ${projectId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member added successfully.",
      project,
    );
  },
);

export const updateProjectMemberRoleController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { projectId, userId } = req.params;
    const { roleId } = updateProjectMemberRoleSchema.parse(req.body);
    const project = await updateProjectMemberRoleService(
      projectId,
      userId,
      roleId,
    );
    logger.info(`Role of user ${userId} updated in project ${projectId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member role updated successfully.",
      project,
    );
  },
);

export const removeProjectMemberController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { projectId, userId } = req.params;
    const project = await removeProjectMemberService(projectId, userId);
    logger.info(`User ${userId} removed from project ${projectId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member removed successfully.",
      project,
    );
  },
);
