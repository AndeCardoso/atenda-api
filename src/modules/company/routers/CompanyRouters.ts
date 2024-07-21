import express from "express";

import { createCompanySchema } from "../validator/createCompanySchema";

import { CreateCompanyController } from "../useCases/createCompany/CreateCompanyController";

const companyRouter = express.Router();

const createCompanyController = new CreateCompanyController();

/**
 * @swagger
 * tags:
 *   - name: Company
 *     description: Processos de cadastro de empresa
 */

/**
 * @swagger
 * /company/:
 *   post:
 *     summary: Cadastro de empresa
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
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
 *                 companyName:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 */
companyRouter.post("/", createCompanySchema, createCompanyController.handle);

export default companyRouter;
