import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Não esta logado" });
    }

    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null) => {
      if (err) {
        return res.status(401).json({ detail: "Token inválido" });
      }
    });

    const { userPayload } = jwt.decode(token) as {
      userPayload: { id: number; email: string };
    };

    req.headers["user"] = JSON.stringify(userPayload);

    next();
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return res.status(500).json(error);
  }
};
