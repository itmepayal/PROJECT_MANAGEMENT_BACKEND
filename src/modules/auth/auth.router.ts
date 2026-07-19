import express from "express";
import * as authController from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const authRouter = express.Router();

// Public
authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.post("/login/google", authController.googleLoginController);
authRouter.post("/verify-email", authController.verifyController);
authRouter.post(
  "/resend-verification-email",
  authController.resendVerifyEmailController,
);
authRouter.post("/forgot-password", authController.forgotPasswordController);
authRouter.post("/reset-password", authController.resetPasswordController);
authRouter.post("/2fa/verify", authController.verifyTwoFAController);
authRouter.post("/refresh-token", authController.refreshTokenController);

// Private
authRouter.post("/logout", authenticate, authController.logoutController);
authRouter.patch(
  "/2fa/enable",
  authenticate,
  authController.enableTwoFAController,
);
authRouter.patch(
  "/2fa/disable",
  authenticate,
  authController.disableTwoFAController,
);

export default authRouter;
