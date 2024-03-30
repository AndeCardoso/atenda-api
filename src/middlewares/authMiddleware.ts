import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Não esta logado" });
  }

  const decoded = jwt.verify(
    token,
    secretKey,
    (err: jwt.VerifyErrors | null) => {
      if (err) {
        return res.status(401).send({ detail: "Token inválido" });
      }
    }
  );

  req.user = decoded;

  next();
};
