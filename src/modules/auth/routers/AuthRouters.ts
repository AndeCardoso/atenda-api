import express from "express";
import { authValidatorSchema } from "../validator/authValidatorSchema";
import { AuthController } from "../useCases/auth/authController";
import { SendRecoverTokenController } from "../useCases/sendRecoverToken/sendRecoverTokenController";
import { RecoverPasswordController } from "../useCases/recoverPassword/recoverPasswordController";

const AuthRouter = express.Router();

const authController = new AuthController();
const recoverPasswordController = new RecoverPasswordController();
const sendRecoverTokenController = new SendRecoverTokenController();

AuthRouter.post("/", authValidatorSchema, authController.handle);
AuthRouter.post("/recover", sendRecoverTokenController.handle);
AuthRouter.put("/recover", recoverPasswordController.handle);

export default AuthRouter;
