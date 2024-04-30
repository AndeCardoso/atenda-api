import express from "express";

import { getEquipmentListSchema } from "../validator/getEquipmentListSchema";
import { getEquipmentByIdSchema } from "../validator/getEquipmentByIdSchema";
import { createEquipmentSchema } from "../validator/createEquipmentSchema";

import { GetEquipmentByIdController } from "../useCases/getEquipmentById/GetEquipmentByIdController";
import { CreateEquipmentController } from "../useCases/createEquipment/CreateEquipmentController";
import { GetEquipmentListController } from "../useCases/getEquipmentList/GetEquipmentListController";
import { UpdateEquipmentController } from "../useCases/updateEquipment/UpdateEquipmentController";
import { updateEquipmentSchema } from "../validator/updateEquipmentSchema";

const equipmentRouter = express.Router();

const getEquipmentListController = new GetEquipmentListController();
const getEquipmentByIdController = new GetEquipmentByIdController();
const createEquipmentController = new CreateEquipmentController();
const updateEquipmentController = new UpdateEquipmentController();

/**
 * @swagger
 * tags:
 *   - name: Equipment
 *     description: Processos de cadastro, listagem e atualização dos equipamentos
 */

/**
 * @swagger
 * /equipment/list:
 *   get:
 *     summary: Lista de equipamentos do cliente
 *     tags: [Equipment]
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
equipmentRouter.get(
  "/list",
  getEquipmentListSchema,
  getEquipmentListController.handle
);

/**
 * @swagger
 * /equipment/{id}:
 *   get:
 *     summary: Busca de equipamento por Id
 *     tags: [Equipment]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do equipamento
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
equipmentRouter.get(
  "/:id",
  getEquipmentByIdSchema,
  getEquipmentByIdController.handle
);

/**
 * @swagger
 * /equipment/{id}:
 *   put:
 *     summary: Atualizar equipamento
 *     tags: [Equipment]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do equipamento
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
equipmentRouter.put(
  "/:id",
  updateEquipmentSchema,
  updateEquipmentController.handle
);

/**
 * @swagger
 * /equipment/:
 *   post:
 *     summary: Cadastro de equipamento
 *     tags: [Equipment]
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
equipmentRouter.post(
  "/",
  createEquipmentSchema,
  createEquipmentController.handle
);

export default equipmentRouter;
