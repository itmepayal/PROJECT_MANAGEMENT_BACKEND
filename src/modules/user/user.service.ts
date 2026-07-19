import User, { IUser } from "../../models/user.model";
import { NotFoundError } from "../../utils/errors/app.error";

export const getCurrentUserService = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  return user;
};
