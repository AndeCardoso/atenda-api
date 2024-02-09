import express from "express";

import { authSchema } from "../validator/authSchema";
import { sendRecoverTokenSchema } from "../validator/sendRecoverTokenSchema";
import { recoverPasswordSchema } from "../validator/recoverPasswordSchema";

import { AuthController } from "../useCases/auth/authController";
import { SendRecoverTokenController } from "../useCases/sendRecoverToken/sendRecoverTokenController";
import { RecoverPasswordController } from "../useCases/recoverPassword/recoverPasswordController";

const AuthRouter = express.Router();

const authController = new AuthController();
const sendRecoverTokenController = new SendRecoverTokenController();
const recoverPasswordController = new RecoverPasswordController();

AuthRouter.post("/", authSchema, authController.handle);
AuthRouter.post(
  "/recover",
  sendRecoverTokenSchema,
  sendRecoverTokenController.handle
);
AuthRouter.put(
  "/recover",
  recoverPasswordSchema,
  recoverPasswordController.handle
);

export default AuthRouter;
