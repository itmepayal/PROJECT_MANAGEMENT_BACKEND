import { z } from "zod";

export const VALID_PERMISSIONS = [
  "workspace:view",
  "workspace:update",
  "workspace:delete",

  "project:create",
  "project:view",
  "project:update",
  "project:delete",

  "member:add",
  "member:update",
  "member:remove",

  "board:create",
  "board:update",
  "board:delete",

  "sprint:create",
  "sprint:update",
  "sprint:delete",

  "task:create",
  "task:update",
  "task:delete",
] as const;

export const createRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Role name must be at least 2 characters.")
    .max(50, "Role name cannot exceed 50 characters."),

  permissions: z
    .array(z.enum(VALID_PERMISSIONS))
    .min(1, "At least one permission is required."),
});

export const updateRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Role name must be at least 2 characters.")
    .max(50, "Role name cannot exceed 50 characters.")
    .optional(),

  permissions: z
    .array(z.enum(VALID_PERMISSIONS))
    .min(1, "At least one permission is required.")
    .optional(),
});

export const getRolesParamSchema = z.object({
  params: z.object({
    workspaceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid workspace id."),
  }),
});

export const roleIdParamSchema = z.object({
  params: z.object({
    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid role id."),
  }),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type GetRolesParamInput = z.infer<typeof getRolesParamSchema>["params"];
export type RoleIdParamSchema = z.infer<typeof roleIdParamSchema>["params"];
