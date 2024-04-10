import express, { Application, Request, Response, NextFunction } from "express";

import { swaggerOptions } from "./documentation/swaggerOptions";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import userRouter from "./modules/user/routers/UserRouters";
import authRouter from "./modules/auth/routers/AuthRouters";
import technicianRouter from "@modules/technician/routers/TechnicianRouters";
import { tokenValidation } from "@middlewares/authMiddleware";

export const app: Application = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user/", userRouter);
app.use("/auth/", authRouter);

app.use("/technician/", tokenValidation, technicianRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Wellcome to server!");
});
