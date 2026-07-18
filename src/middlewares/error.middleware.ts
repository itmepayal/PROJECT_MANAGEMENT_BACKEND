import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, NotFoundError } from "../utils/errors/app.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};
