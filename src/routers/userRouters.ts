import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", userController.getUser);

userRouter.get("/list/:pag", userController.getUserList);

userRouter.post("/", userController.postUser);

export default userRouter;
