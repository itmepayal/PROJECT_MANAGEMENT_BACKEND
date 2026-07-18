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
    .max(12, "Password must not exceed 12 characters."),
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
