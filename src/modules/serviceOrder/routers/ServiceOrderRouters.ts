import express from "express";

import { getServiceOrderListSchema } from "../validator/getServiceOrderListSchema";
import { getServiceOrderByIdSchema } from "../validator/getServiceOrderByIdSchema";
import { createServiceOrderSchema } from "../validator/createServiceOrderSchema";
import { attachSignatureSchema } from "../validator/attachSignatureSchema";

import { GetServiceOrderListController } from "../useCases/getServiceOrderList/GetServiceOrderListController";
import { GetServiceOrderByIdController } from "../useCases/getServiceOrderById/GetServiceOrderByIdController";
import { CreateServiceOrderController } from "../useCases/createServiceOrder/CreateServiceOrderController";
import { UpdateServiceOrderController } from "../useCases/updateServiceOrder/UpdateServiceOrderController";
import { AttachSignatureController } from "../useCases/attachSignature/AttachSignatureController";
import uploadMiddleware from "@middlewares/fileMiddleware";

const serviceOrderRouter = express.Router();

const getServiceOrderListController = new GetServiceOrderListController();
const getServiceOrderByIdController = new GetServiceOrderByIdController();
const createServiceOrderController = new CreateServiceOrderController();
const updateServiceOrderController = new UpdateServiceOrderController();
const attachSignatureController = new AttachSignatureController();

/**
 * @swagger
 * tags:
 *   - name: ServiceOrder
 *     description: Processos de cadastro, listagem e atualização dos ordens de serviço
 */

/**
 * @swagger
 * /serviceOrder/list:
 *   get:
 *     summary: Lista de ordens de serviço
 *     tags: [ServiceOrder]
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
serviceOrderRouter.get(
  "/list",
  getServiceOrderListSchema,
  getServiceOrderListController.handle
);

/**
 * @swagger
 * /serviceOrder/{id}:
 *   get:
 *     summary: Busca de ordem de serviço por Id
 *     tags: [ServiceOrder]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação da ordem de serviço
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
serviceOrderRouter.get(
  "/:id",
  getServiceOrderByIdSchema,
  getServiceOrderByIdController.handle
);

/**
 * @swagger
 * /serviceOrder/{id}:
 *   put:
 *     summary: Atualizar ordem de serviço
 *     tags: [ServiceOrder]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Numero de identificação da ordem de serviço
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
serviceOrderRouter.put(
  "/:id",
  createServiceOrderSchema,
  updateServiceOrderController.handle
);

/**
 * @swagger
 * /serviceOrder/:
 *   post:
 *     summary: Cadastro de ordem de serviço
 *     tags: [ServiceOrder]
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
serviceOrderRouter.post(
  "/",
  createServiceOrderSchema,
  createServiceOrderController.handle
);

/**
 * @swagger
 * /serviceOrder/signature:
 *   post:
 *     summary: Anexo de assinatura do cliente na O.S.
 *     tags: [ServiceOrder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               signatureImage:
 *                 type: string
 *               serviceOrderId:
 *                 type: integer
 *             required:
 *               - signatureImage
 *               - serviceOrderId
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
serviceOrderRouter.post(
  "/signature/:id",
  uploadMiddleware,
  attachSignatureSchema,
  attachSignatureController.handle
);

export default serviceOrderRouter;
