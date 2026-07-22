import express from "express";
import {
  createWorkspaceController,
  getUserWorkspacesController,
  getWorkspaceByIdController,
  updateWorkspaceController,
  deleteWorkspaceController,
  addWorkspaceMemberController,
  updateWorkspaceMemberRoleController,
  removeWorkspaceMemberController,
  createProjectController,
  getWorkspaceProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
  getWorkspaceRolesController,
  createWorkspaceRoleController,
} from "./workspace.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  requireWorkspaceOwner,
} from "../../middlewares/workspace.middleware";

const workspaceRouter = express.Router();

workspaceRouter.post("/", authenticate, createWorkspaceController);
workspaceRouter.get("/", authenticate, getUserWorkspacesController);
workspaceRouter.get(
  "/:workspaceId",
  authenticate,
  checkWorkspaceAccess,
  getWorkspaceByIdController,
);
workspaceRouter.patch(
  "/:workspaceId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  updateWorkspaceController,
);
workspaceRouter.delete(
  "/:workspaceId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceOwner,
  deleteWorkspaceController,
);
workspaceRouter.post(
  "/:workspaceId/members",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  addWorkspaceMemberController,
);
workspaceRouter.patch(
  "/:workspaceId/members/:userId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  updateWorkspaceMemberRoleController,
);
workspaceRouter.delete(
  "/:workspaceId/members/:userId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  removeWorkspaceMemberController,
);
workspaceRouter.post(
  "/:workspaceId/projects",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  createProjectController,
);
workspaceRouter.get(
  "/:workspaceId/projects",
  authenticate,
  checkWorkspaceAccess,
  getWorkspaceProjectsController,
);
workspaceRouter.get(
  "/:workspaceId/projects/:projectId",
  authenticate,
  checkWorkspaceAccess,
  getProjectByIdController,
);
workspaceRouter.patch(
  "/:workspaceId/projects/:projectId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  updateProjectController,
);
workspaceRouter.delete(
  "/:workspaceId/projects/:projectId",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  deleteProjectController,
);
workspaceRouter.get(
  "/:workspaceId/roles",
  authenticate,
  checkWorkspaceAccess,
  getWorkspaceRolesController,
);
workspaceRouter.post(
  "/:workspaceId/roles",
  authenticate,
  checkWorkspaceAccess,
  requireWorkspaceAdmin,
  createWorkspaceRoleController,
);

export default workspaceRouter;
