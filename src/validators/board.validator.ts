import { z } from "zod";

export const createBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Board name is required.")
    .max(100, "Board name must not exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters.")
    .optional()
    .default(""),

  type: z.enum(["kanban", "scrum"]).optional().default("kanban"),

  columns: z
    .array(z.string().trim().min(1, "Column name cannot be empty."))
    .min(1, "At least one column is required.")
    .optional()
    .default(["Backlog", "Todo", "In Progress", "Review", "Done"]),
});

export type CreateBoardSchemaType = z.infer<typeof createBoardSchema>;

export const updateBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Board name is required.")
    .max(100, "Board name must not exceed 100 characters.")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),

  type: z.enum(["kanban", "scrum"]).optional(),

  columns: z
    .array(z.string().trim().min(1, "Column name cannot be empty."))
    .min(1, "At least one column is required.")
    .optional(),
});

export type UpdateBoardSchemaType = z.infer<typeof updateBoardSchema>;
