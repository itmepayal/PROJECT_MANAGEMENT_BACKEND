import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import logger from "../../config/logger.config";
import { AppResponse } from "../../utils/response/app.response";
import {
  createWorkspaceService,
  getUserWorkspacesService,
  getWorkspaceByIdService,
  deleteWorkspaceService,
  updateWorkspaceService,
  removeWorkspaceMemberService,
  updateWorkspaceMemberRoleService,
  addWorkspaceMemberService,
} from "./workspace.service";
import {
  addWorkspaceMemberSchema,
  createWorkspaceSchema,
  updateWorkspaceMemberRoleSchema,
  updateWorkspaceSchema,
} from "../../validators/worksapce.validator";

export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const validatedData = createWorkspaceSchema.parse(req.body);
    const workspace = await createWorkspaceService(userId, validatedData);
    logger.info(
      `Workspace "${workspace.name}" created successfully by user ${userId}.`,
    );
    AppResponse.success(
      res,
      StatusCodes.CREATED,
      "Workspace created successfully.",
      workspace,
    );
  },
);

export const getUserWorkspacesController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const workspaces = await getUserWorkspacesService(userId);
    logger.info(`Fetched ${workspaces.length} workspaces for user ${userId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Workspaces fetched successfully.",
      workspaces,
    );
  },
);

export const getWorkspaceByIdController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const workspace = await getWorkspaceByIdService(workspaceId);
    logger.info(`Workspace ${workspaceId} fetched successfully.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Workspace fetched successfully.",
      workspace,
    );
  },
);

export const updateWorkspaceController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const validatedData = updateWorkspaceSchema.parse(req.body);
    const workspace = await updateWorkspaceService(workspaceId, validatedData);
    logger.info(`Workspace ${workspaceId} updated successfully.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Workspace updated successfully.",
      workspace,
    );
  },
);

export const deleteWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    await deleteWorkspaceService(workspaceId);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Workspace deleted successfully.",
      null,
    );
  },
);

export const addWorkspaceMemberController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { userId, role } = addWorkspaceMemberSchema.parse(req.body);
    const workspace = await addWorkspaceMemberService(
      workspaceId,
      userId,
      role,
    );
    logger.info(`User ${userId} added as ${role} to workspace ${workspaceId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member added successfully.",
      workspace,
    );
  },
);

export const updateWorkspaceMemberRoleController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { workspaceId, userId } = req.params;
    const { role } = updateWorkspaceMemberRoleSchema.parse(req.body);
    const workspace = await updateWorkspaceMemberRoleService(
      workspaceId,
      userId,
      role,
    );
    logger.info(
      `Role of user ${userId} updated to ${role} in workspace ${workspaceId}.`,
    );
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member role updated successfully.",
      workspace,
    );
  },
);

export const removeWorkspaceMemberController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { workspaceId, userId } = req.params;
    const workspace = await removeWorkspaceMemberService(workspaceId, userId);
    logger.info(`User ${userId} removed from workspace ${workspaceId}.`);
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Member removed successfully.",
      workspace,
    );
  },
);
