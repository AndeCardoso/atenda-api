import express from "express";
import userController from "../controllers/userController";
import { userValidatorSchema } from "../validators/userValidator";

const userRouter = express.Router();

userRouter.get("/:id", userController.getUser);
userRouter.get("/list/:page", userController.getUserList);
userRouter.post("/", userValidatorSchema, userController.postUser);

export default userRouter;
