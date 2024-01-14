import { Model } from "sequelize";
import { IUserModel, User } from "../models/User";

export type TOrderType = "ASC" | "DESC";

interface IUserPost {
  page: number;
  limit: number;
  order: TOrderType;
}

const getUserById = async (
  id: number
): Promise<Model<IUserModel, IUserModel> | null> => {
  const user = await User.findByPk<Model<IUserModel>>(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserList = async ({
  page = 1,
  limit = 20,
  order = "ASC",
}: IUserPost): Promise<Model<IUserModel>[]> => {
  const offset = (page - 1) * limit;
  const users = await User.findAll({
    offset,
    limit,
    order: [["name", order]],
  });
  return users;
};

const registerUser = async (
  userParams: IUserModel
): Promise<Model<IUserModel>> => {
  const result = await User.create<Model<IUserModel>>({
    name: userParams.name,
    email: userParams.email,
    password: userParams.password,
  });
  return result;
};

export default {
  getUserById,
  getUserList,
  registerUser,
};
