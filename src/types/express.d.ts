import type { IWorkspace } from "../models/workspace.model";
import type { IProject } from "../models/project.model";
import { JWTPayload } from ".";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;

      workspace?: IWorkspace;
      workspaceRole?: "owner" | "admin" | "member";
      workspaceId?: string;

      project?: IProject;
      projectPermissions?: string[];
      projectId?: string;
    }
  }
}

export {};
