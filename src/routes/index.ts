import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { tokenValidation } from "@middlewares/authMiddleware";
import companyRouter from "@modules/company/routers/CompanyRouters";
import authRouter from "@modules/auth/routers/AuthRouters";
import homeRouter from "@modules/home/routers/HomeRouters";
import userRouter from "@modules/user/routers/UserRouters";
import technicianRouter from "@modules/technician/routers/TechnicianRouters";
import customerRouter from "@modules/customer/routers/CustomerRouters";
import equipmentRouter from "@modules/equipment/routers/EquipmentRouters";
import serviceOrderRouter from "@modules/serviceOrder/routers/ServiceOrderRouters";

import { swaggerOptions } from "@documentation/swaggerOptions";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const globalRouter = express.Router();

globalRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
globalRouter.use("/company/", companyRouter);
globalRouter.use("/auth/", authRouter);

globalRouter.use("/home/", tokenValidation, homeRouter);
globalRouter.use("/user/", tokenValidation, userRouter);
globalRouter.use("/technician/", tokenValidation, technicianRouter);
globalRouter.use("/customer/", tokenValidation, customerRouter);
globalRouter.use("/equipment/", tokenValidation, equipmentRouter);
globalRouter.use("/service-order/", tokenValidation, serviceOrderRouter);
