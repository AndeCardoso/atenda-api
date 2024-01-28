import Sequelize from "sequelize";
import { sequelize } from "../db";

export interface IUserModel {
  id?: number;
  name: string;
  password: string;
  email: string;
  recoverToken?: string;
}

export const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recoverToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
