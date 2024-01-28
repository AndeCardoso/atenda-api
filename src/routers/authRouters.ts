import express from "express";
import authController from "../controllers/authController";
import { authValidatorSchema } from "../validators/authValidator";

const authRouter = express.Router();

authRouter.post("/", authValidatorSchema, authController.login);

export default authRouter;
