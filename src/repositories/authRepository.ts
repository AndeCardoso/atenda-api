import "dotenv/config";
import { Model } from "sequelize";
import { IUserModel, User } from "../models/User";
import { IAuthModel } from "src/models/Auth";

const login = async (
  authParams: IAuthModel
): Promise<Model<IUserModel> | null> => {
  const user = User.findOne<Model<IUserModel>>({
    where: {
      email: authParams.email,
      password: authParams.password,
    },
  });

  if (user) {
    return user;
  }
  return null;
};

export default {
  login,
};
