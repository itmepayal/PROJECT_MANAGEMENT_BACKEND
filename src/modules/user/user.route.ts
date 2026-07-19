import express from "express";
import * as userController from "./user.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const userRouter = express.Router();

// Private
userRouter.get("/me", authenticate, userController.getCurrentUserController);

export default userRouter;
