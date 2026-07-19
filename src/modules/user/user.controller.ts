import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { AppResponse } from "../../utils/response/app.response";
import logger from "../../config/logger.config";
import { getCurrentUserService } from "./user.service";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const user = await getCurrentUserService(userId);
    logger.info("Current user fetched successfully");
    AppResponse.success(
      res,
      StatusCodes.OK,
      "User fetched successfully.",
      user,
    );
  },
);
