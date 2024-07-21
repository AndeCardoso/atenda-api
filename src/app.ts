import express, { Application, Request, Response, NextFunction } from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { globalRouter } from "./routes";

export const app: Application = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", globalRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json("Rota não encontrada");
});
