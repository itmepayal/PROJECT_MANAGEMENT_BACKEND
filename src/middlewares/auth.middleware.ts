import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { verifyAccessToken } from "../utils/helpers/jwt";
import { UnauthorizedError } from "../utils/errors/app.error";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access token is missing.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    logger.error("Authentication failed", error);
    next(new UnauthorizedError("Invalid or expired access token."));
  }
};
