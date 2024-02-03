import express from "express";

import { GetListUsersController } from "../useCases/getListUsers/GetListUsersController";
import { GetUserByIdController } from "../useCases/getUserById/GetUserByIdController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { userValidatorSchema } from "../validator/userValidatorSchema";

const userRouter = express.Router();

const getListUsersController = new GetListUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();

userRouter.get("/list", getListUsersController.handle);
userRouter.get("/:id", getUserByIdController.handle);
userRouter.post("/", userValidatorSchema, createUserController.handle);

export default userRouter;
