export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  id: string;
  email: string;
}
