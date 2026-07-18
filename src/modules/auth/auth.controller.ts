import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../../validators/auth.validator";
import { AppResponse } from "../../utils/response/app.response";
import {
  disableTwoFAService,
  enableTwoFAService,
  forgotPasswordService,
  loginService,
  logoutService,
  registerService,
  resendVerifyEmailService,
  resetPasswordService,
  verifyService,
  verifyTwoFactorService,
} from "./auth.service";
import logger from "../../config/logger.config";

export const registerController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerService(validatedData);
    logger.info("User registered successfully");
    AppResponse.success(
      res,
      StatusCodes.CREATED,
      "User registered successfully. Please verify your email.",
      user,
    );
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginService(validatedData);
    if (result.requiresTwoFA) {
      AppResponse.success(
        res,
        StatusCodes.OK,
        "OTP sent to your email.",
        result,
      );
      return;
    }
    const { user, tokens } = result;
    logger.info("User logged in successfully", {
      userId: user._id.toString(),
      email: user.email,
    });
    AppResponse.success(res, StatusCodes.OK, "Login successful.", {
      user,
      accessToken: tokens.accessToken,
    });
  },
);

export const verifyController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = verifyEmailSchema.parse(req.body);
    const user = await verifyService(validatedData);
    logger.info("Email verified successfully");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Email verified successfully.",
      user,
    );
  },
);

export const resendVerifyEmailController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    await resendVerifyEmailService(email);
    logger.info("Verification email resent successfully");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Verification email sent successfully.",
      null,
    );
  },
);

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = emailSchema.parse(req.body);
    await forgotPasswordService(validatedData);
    logger.info("Password reset OTP sent successfully");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "If your email exists, a password reset OTP has been sent.",
      null,
    );
  },
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = resetPasswordSchema.parse(req.body);
    await resetPasswordService(validatedData);
    logger.info("Password reset successfully");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Password reset successfully.",
      null,
    );
  },
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    await logoutService(userId);
    logger.info("User logged out successfully");
    AppResponse.success(res, StatusCodes.OK, "Logout successful.", null);
  },
);

export const enableTwoFAController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const user = await enableTwoFAService(userId);
    logger.info("Two-factor authentication enabled.");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Two-factor authentication enabled successfully.",
      user,
    );
  },
);

export const verifyTwoFAController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = verifyEmailSchema.parse(req.body);
    const { user, tokens } = await verifyTwoFactorService(email, otp);
    logger.info("Two-factor authentication verified.");
    AppResponse.success(res, StatusCodes.OK, "Login successful.", {
      user,
      accessToken: tokens.accessToken,
    });
  },
);

export const disableTwoFAController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const user = await disableTwoFAService(userId);
    logger.info("Two-factor authentication disabled.");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "Two-factor authentication disabled successfully.",
      user,
    );
  },
);
