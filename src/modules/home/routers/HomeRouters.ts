import express from "express";

import { AdvertiseController } from "../useCases/advertise/advertiseController";
import { EquipmentQueueController } from "../useCases/equipmentQueue/equipmentQueueController";
import { ServiceOrderOpenedController } from "../useCases/soList/serviceOrderOpenedController";
import { ServiceOrderDatasController } from "../useCases/soDatas/serviceOrderDatasController";

const homeRouter = express.Router();

const advertiseController = new AdvertiseController();
const serviceOrderDatasController = new ServiceOrderDatasController();
const equipmentQueueController = new EquipmentQueueController();
const serviceOrderOpenedController = new ServiceOrderOpenedController();

/**
 * @swagger
 * tags:
 *   - name: Home
 *     description: Dados à serem mostrados na tela principal
 */

/**
 * @swagger
 * /so-datas/:
 *   get:
 *     summary: Dados cruciais referentes as ordens de serviço
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 openedSo:
 *                   type: integer
 *                 executingSo:
 *                   type: integer
 *                 concludedSo:
 *                   type: integer
 *                 withdrawnSo:
 *                   type: integer
 */
homeRouter.get("/so-datas", serviceOrderDatasController.handle);

/**
 * @swagger
 * /advertise/:
 *   get:
 *     summary: Propagandas ou notificações sobre o sistema
 *     tags: [Home]
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
 *                 banner:
 *                   type: string
 */
homeRouter.get("/advertise", advertiseController.handle);

/**
 * @swagger
 * /so-list/:
 *   get:
 *     summary: Lista das ordens de serviço em aberto e em execução
 *     tags: [Home]
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
 *                 opened_at:
 *                   type: string
 *                 status:
 *                   type: string
 *                 customer:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 equipment:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     model:
 *                       type: string
 *                     brand:
 *                       type: string
 */
homeRouter.get("/so-list", serviceOrderOpenedController.handle);

/**
 * @swagger
 * /so-list/:
 *   get:
 *     summary: Lista dos equipamentos em fila e na bancada
 *     tags: [Home]
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
 *                 customerId:
 *                   type: integer
 *                 nickname:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 model:
 *                   type: string
 *                 voltage:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
homeRouter.get("/equipment-queue", equipmentQueueController.handle);

export default homeRouter;
