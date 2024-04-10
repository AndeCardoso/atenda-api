import express, { Application, Request, Response, NextFunction } from "express";

import { swaggerOptions } from "./documentation/swaggerOptions";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import companyRouter from "@modules/company/routers/CompanyRouters";
import authRouter from "./modules/auth/routers/AuthRouters";
import { tokenValidation } from "@middlewares/authMiddleware";
import userRouter from "./modules/user/routers/UserRouters";
import technicianRouter from "@modules/technician/routers/TechnicianRouters";

export const app: Application = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/company/", companyRouter);
app.use("/auth/", authRouter);

app.use("/user/", tokenValidation, userRouter);
app.use("/technician/", tokenValidation, technicianRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Atenda server");
});
