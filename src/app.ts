import express, { Application, Request, Response, NextFunction } from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import userRouter from "./routers/userRouters";

export const app: Application = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/user/", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Wellcome to server!");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});
