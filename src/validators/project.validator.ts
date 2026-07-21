import { z } from "zod";

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters long.")
      .max(100, "Project name must not exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(1000, "Description must not exceed 1000 characters.")
      .optional()
      .default(""),

    color: z
      .string()
      .trim()
      .regex(hexColorRegex, "Color must be a valid HEX color (e.g. #6366F1).")
      .optional()
      .default("#6366F1"),

    status: z
      .enum(["active", "completed", "archived"])
      .optional()
      .default("active"),

    startDate: z
      .string()
      .datetime("Start date must be a valid ISO date.")
      .optional(),

    dueDate: z
      .string()
      .datetime("Due date must be a valid ISO date.")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.dueDate) return true;

      return new Date(data.startDate) <= new Date(data.dueDate);
    },
    {
      path: ["dueDate"],
      message: "Due date must be greater than or equal to start date.",
    },
  );

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const addProjectMemberSchema = z.object({
  userId: z.string().trim().min(1, "User ID is required."),
  roleId: z.string().trim().min(1, "Role ID is required."),
});

export type AddProjectMemberInput = z.infer<typeof addProjectMemberSchema>;

export const updateProjectMemberRoleSchema = z.object({
  roleId: z.string().trim().min(1, "Role ID is required."),
});

export type UpdateProjectMemberRoleInput = z.infer<
  typeof updateProjectMemberRoleSchema
>;

export const updateProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters long.")
      .max(100, "Project name must not exceed 100 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description must not exceed 1000 characters.")
      .optional(),

    color: z
      .string()
      .trim()
      .regex(hexColorRegex, "Color must be a valid HEX color (e.g. #6366F1).")
      .optional(),

    status: z.enum(["active", "completed", "archived"]).optional(),

    startDate: z
      .string()
      .datetime("Start date must be a valid ISO date.")
      .optional(),

    dueDate: z
      .string()
      .datetime("Due date must be a valid ISO date.")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update.",
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.dueDate) return true;

      return new Date(data.startDate) <= new Date(data.dueDate);
    },
    {
      path: ["dueDate"],
      message: "Due date must be greater than or equal to start date.",
    },
  );

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
