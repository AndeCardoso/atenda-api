import express from "express";

import { getListUsersSchema } from "../validator/getListUsersSchema";
import { getUserByIdSchema } from "../validator/getUserByIdSchema";
import { createUserSchema } from "../validator/createUserSchema";

import { GetListUsersController } from "../useCases/getListUsers/GetListUsersController";
import { GetUserByIdController } from "../useCases/getUserById/GetUserByIdController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { tokenValidation } from "@middlewares/authMiddleware";

const userRouter = express.Router();

const getListUsersController = new GetListUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Processos de cadastro e listagem e busca de usuários
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Lista de usuários
 *     tags: [User]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Numero de paginas
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: Numero de itens por pagina
 *         in: query
 *         required: false
 *         type: number
 *       - name: order
 *         description: Ordenação
 *         in: query
 *         required: false
 *         type: ['asc', 'desc']
 *       - name: column
 *         description: Dado que será ordenado
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
userRouter.get(
  "/list",
  tokenValidation,
  getListUsersSchema,
  getListUsersController.handle
);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca de usuário por Id
 *     tags: [User]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do usuário
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
userRouter.get(
  "/:id",
  tokenValidation,
  getUserByIdSchema,
  getUserByIdController.handle
);

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
userRouter.post("/", createUserSchema, createUserController.handle);

export default userRouter;
