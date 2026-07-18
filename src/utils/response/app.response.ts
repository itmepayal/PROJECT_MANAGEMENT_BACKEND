import { Response } from "express";

export type ApiResponse<T = unknown> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
};

export class AppResponse {
  static success<T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    meta?: Record<string, unknown>,
  ) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      meta,
    });
  }
}
