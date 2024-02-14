import express, { Application, Request, Response, NextFunction } from "express";

import { swaggerOptions } from "./documentation/swaggerOptions";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import userRouter from "./modules/user/routers/UserRouters";
import authRouter from "./modules/auth/routers/AuthRouters";
import { AppError } from "./errors/AppErrors";

export const app: Application = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user/", userRouter);
app.use("/auth/", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Wellcome to server!");
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Erro interno do servidor - ${err.message}`,
    });
  }
);
