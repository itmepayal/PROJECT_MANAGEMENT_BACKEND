import jwt, { SignOptions } from "jsonwebtoken";
import { serverConfig } from "../../config";
import { JWTPayload } from "../../types";

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, serverConfig.JWT_ACCESS_SECRET, {
    expiresIn: serverConfig.JWT_ACCESS_EXPIRE,
  } as SignOptions);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, serverConfig.JWT_REFRESH_SECRET, {
    expiresIn: serverConfig.JWT_REFRESH_EXPIRE,
  } as SignOptions);
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, serverConfig.JWT_ACCESS_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, serverConfig.JWT_REFRESH_SECRET) as JWTPayload;
};
