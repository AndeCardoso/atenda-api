import express from "express";

import { AdvertiseController } from "../useCases/advertise/advertiseController";

const homeRouter = express.Router();

const advertiseController = new AdvertiseController();

/**
 * @swagger
 * tags:
 *   - name: Home
 *     description: Dados à serem mostrados na tela principal
 */

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

export default homeRouter;
