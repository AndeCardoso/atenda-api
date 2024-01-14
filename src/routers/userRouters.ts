import express from "express";
import userController from "../controllers/userController";
import { userValidatorSchema } from "../validators/userValidator";

const userRouter = express.Router();

userRouter.get("/list", userController.getUserList);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userValidatorSchema, userController.postUser);

export default userRouter;
