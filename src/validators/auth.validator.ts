import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

export type EmailSchemaType = z.infer<typeof emailSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(15, "Name must not exceed 15 characters."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(12, "Password must not exceed 12 characters."),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(128, "Password is too long."),

  remember: z.boolean().optional().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  otp: z
    .string()
    .trim()
    .min(4, "OTP must be at least 4 digits.")
    .max(6, "OTP must not exceed 6 digits."),
});

export type VerifySchemaType = z.infer<typeof verifyEmailSchema>;

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  otp: z
    .string()
    .trim()
    .min(4, "OTP must be at least 4 digits.")
    .max(6, "OTP must not exceed 6 digits."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(12, "Password must not exceed 12 characters."),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required."),
});

export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long.")
      .max(32, "New password must not exceed 32 characters."),
  })
  .refine(
    ({ currentPassword, newPassword }) => currentPassword !== newPassword,
    {
      message: "New password must be different from the current password.",
      path: ["newPassword"],
    },
  );

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const changeProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name must not exceed 50 characters.")
    .optional(),
});

export type ChangeProfileInput = z.infer<typeof changeProfileSchema>;
