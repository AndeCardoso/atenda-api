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

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Processos de autenticação
 */

/**
 * @swagger
 * /auth/:
 *   post:
 *     description: Autenticação de acesso
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
AuthRouter.post("/", authSchema, authController.handle);

/**
 * @swagger
 * /recover:
 *   post:
 *     description: Pedido para recuperação de senha.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
AuthRouter.post(
  "/recover",
  sendRecoverTokenSchema,
  sendRecoverTokenController.handle
);

/**
 * @swagger
 * /recover:
 *   put:
 *     description: Atualização de senha para recuperação de conta.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               token:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
AuthRouter.put(
  "/recover",
  recoverPasswordSchema,
  recoverPasswordController.handle
);

export default AuthRouter;
