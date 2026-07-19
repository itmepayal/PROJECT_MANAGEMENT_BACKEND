import { OAuth2Client } from "google-auth-library";
import { serverConfig } from "../../config";
import { UnauthorizedError } from "../errors/app.error";

const googleClient = new OAuth2Client(serverConfig.GOOGLE_CLIENT_ID);

export interface GoogleUserPayload {
  email: string;
  name: string;
  picture?: string;
  googleId: string;
  emailVerified: boolean;
}

export const verifyGoogleToken = async (
  idToken: string,
): Promise<GoogleUserPayload> => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: serverConfig.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload?.email || !payload.sub) {
    throw new UnauthorizedError("Invalid Google token.");
  }

  return {
    email: payload.email,
    name: payload.name ?? payload.email.split("@")[0],
    picture: payload.picture,
    googleId: payload.sub,
    emailVerified: payload.email_verified ?? false,
  };
};
