import express from "express";

import { getListUsersSchema } from "../validator/getListUsersSchema";
import { getUserByIdSchema } from "../validator/getUserByIdSchema";
import { createUserSchema } from "../validator/createUserSchema";

import { GetListUsersController } from "../useCases/getListUsers/GetListUsersController";
import { GetUserByIdController } from "../useCases/getUserById/GetUserByIdController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";

const userRouter = express.Router();

const getListUsersController = new GetListUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();

userRouter.get("/list", getListUsersSchema, getListUsersController.handle);
userRouter.get("/:id", getUserByIdSchema, getUserByIdController.handle);
userRouter.post("/", createUserSchema, createUserController.handle);

export default userRouter;
