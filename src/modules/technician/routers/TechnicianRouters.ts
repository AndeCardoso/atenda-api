import express from "express";

import { getTechnicianListSchema } from "../validator/getTechnicianListSchema";
import { getTechnicianByIdSchema } from "../validator/getTechnicianByIdSchema";
import { createTechnicianSchema } from "../validator/createTechnicianSchema";
import { updateTechnicianSchema } from "../validator/updateTechnicianSchema";

import { GetTechnicianListController } from "../useCases/getTechnicianList/GetTechnicianListController";
import { GetTechnicianByIdController } from "../useCases/getTechnicianById/GetTechnicianByIdController";
import { CreateTechnicianController } from "../useCases/createTechnician/CreateTechnicianController";
import { UpdateTechnicianController } from "../useCases/updateTechnician/UpdateTechnicianController";

const technicianRouter = express.Router();

const getTechnicianListController = new GetTechnicianListController();
const getTechnicianByIdController = new GetTechnicianByIdController();
const createTechnicianController = new CreateTechnicianController();
const updateTechnicianController = new UpdateTechnicianController();

/**
 * @swagger
 * tags:
 *   - name: Technician
 *     description: Processos de cadastro, listagem e atualização dos técnicos
 */

/**
 * @swagger
 * /technician/list:
 *   get:
 *     summary: Lista de técnicos
 *     tags: [Technician]
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
technicianRouter.get(
  "/list",
  getTechnicianListSchema,
  getTechnicianListController.handle
);

/**
 * @swagger
 * /technician/{id}:
 *   get:
 *     summary: Busca de técnico por Id
 *     tags: [Technician]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do técnico
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
technicianRouter.get(
  "/:id",
  getTechnicianByIdSchema,
  getTechnicianByIdController.handle
);

/**
 * @swagger
 * /technician/{id}:
 *   put:
 *     summary: Atualizar técnico
 *     tags: [Technician]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação do técnico
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
technicianRouter.put(
  "/:id",
  updateTechnicianSchema,
  updateTechnicianController.handle
);

/**
 * @swagger
 * /technician/:
 *   post:
 *     summary: Cadastro de técnico
 *     tags: [Technician]
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
technicianRouter.post(
  "/",
  createTechnicianSchema,
  createTechnicianController.handle
);

export default technicianRouter;
