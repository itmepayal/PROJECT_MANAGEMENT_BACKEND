import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  checkProjectAccess,
  requirePermission,
} from "../../middlewares/project.middleware";
import {
  addProjectMemberController,
  updateProjectMemberRoleController,
  removeProjectMemberController,
} from "./project.controller";

const projectRouter = express.Router();

projectRouter.post(
  "/:projectId/members",
  authenticate,
  checkProjectAccess,
  requirePermission("member:add"),
  addProjectMemberController,
);
projectRouter.patch(
  "/:projectId/members/:userId",
  authenticate,
  checkProjectAccess,
  requirePermission("member:update"),
  updateProjectMemberRoleController,
);
projectRouter.delete(
  "/:projectId/members/:userId",
  authenticate,
  checkProjectAccess,
  requirePermission("member:remove"),
  removeProjectMemberController,
);

export default projectRouter;
