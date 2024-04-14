import express from "express";

import { getCustomerListSchema } from "../validator/getCustomerListSchema";
import { getCustomerByIdSchema } from "../validator/getCustomerByIdSchema";
import { createCustomerSchema } from "../validator/createCustomerSchema";

import { GetCustomerByIdController } from "../useCases/getCustomerById/GetCustomerByIdController";
import { CreateCustomerController } from "../useCases/createCustomer/CreateCustomerController";
import { GetCustomerListController } from "../useCases/getCustomerList/GetCustomerListController";
import { UpdateCustomerController } from "../useCases/updateCustomer/UpdateCustomerController";

const customerRouter = express.Router();

const getCustomerListController = new GetCustomerListController();
const getCustomerByIdController = new GetCustomerByIdController();
const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Processos de cadastro, listagem e atualização dos clientes
 */

/**
 * @swagger
 * /customer/list:
 *   get:
 *     summary: Lista de clientes
 *     tags: [Customer]
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
 *                   phone:
 *                     type: string
 *                   cpf:
 *                     type: string
 *                   position:
 *                     type: integer
 *                   status:
 *                     type: integer
 *                   address:
 *                     type: object
 *                     properties:
 *                       nickname:
 *                         type: string
 *                       cep:
 *                         type: string
 *                       street:
 *                         type: string
 *                       number:
 *                         type: string
 *                       complement:
 *                         type: string
 *                       district:
 *                         type: string
 *                       state:
 *                         type: string
 *                       city:
 *                         type: string
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
customerRouter.get(
  "/list",
  getCustomerListSchema,
  getCustomerListController.handle
);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Busca de cliente por Id
 *     tags: [Customer]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do cliente
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
 *                 phone:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 position:
 *                   type: integer
 *                 status:
 *                   type: integer
 *                 address:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     cep:
 *                       type: string
 *                     street:
 *                       type: string
 *                     number:
 *                       type: string
 *                     complement:
 *                       type: string
 *                     district:
 *                       type: string
 *                     state:
 *                       type: string
 *                     city:
 *                       type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
customerRouter.get(
  "/:id",
  getCustomerByIdSchema,
  getCustomerByIdController.handle
);

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     tags: [Customer]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do cliente
 *         in: path
 *         required: true
 *         type: number
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               cpf:
 *                 type: string
 *               position:
 *                 type: integer
 *               status:
 *                 type: integer
 *               address:
 *                 type: object
 *                 properties:
 *                   nickname:
 *                     type: string
 *                   cep:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: string
 *                   complement:
 *                     type: string
 *                   district:
 *                     type: string
 *                   state:
 *                     type: string
 *                   city:
 *                     type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
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
 *                 phone:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 position:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 address:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     cep:
 *                       type: string
 *                     street:
 *                       type: string
 *                     number:
 *                       type: string
 *                     complement:
 *                       type: string
 *                     district:
 *                       type: string
 *                     state:
 *                       type: string
 *                     city:
 *                       type: string
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
customerRouter.put(
  "/:id",
  createCustomerSchema,
  updateCustomerController.handle
);

/**
 * @swagger
 * /customer/:
 *   post:
 *     summary: Cadastro de cliente
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               cpf:
 *                 type: string
 *               position:
 *                 type: integer
 *               status:
 *                 type: integer
 *               address:
 *                 type: object
 *                 properties:
 *                   nickname:
 *                     type: string
 *                   cep:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: string
 *                   complement:
 *                     type: string
 *                   district:
 *                     type: string
 *                   state:
 *                     type: string
 *                   city:
 *                     type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *             required:
 *               - name
 *               - phone
 *               - cpf
 *               - position
 *               - email
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
 *                 phone:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 position:
 *                   type: integer
 *                 status:
 *                   type: integer
 *                 address:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     cep:
 *                       type: string
 *                     street:
 *                       type: string
 *                     number:
 *                       type: string
 *                     complement:
 *                       type: string
 *                     district:
 *                       type: string
 *                     state:
 *                       type: string
 *                     city:
 *                       type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
customerRouter.post("/", createCustomerSchema, createCustomerController.handle);

export default customerRouter;
