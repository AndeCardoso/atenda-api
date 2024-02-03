import express from "express";
import { authValidatorSchema } from "../validator/authValidatorSchema";
import { AuthController } from "../useCases/auth/authController";

const AuthRouter = express.Router();

const authController = new AuthController();

AuthRouter.post("/", authValidatorSchema, authController.handle);

export default AuthRouter;
