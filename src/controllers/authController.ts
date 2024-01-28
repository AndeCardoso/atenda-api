import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import authRepository from "../repositories/authRepository";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const expireTime = process.env.EXPIRE_TIME as jwt.Secret;

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors);
    return;
  }

  const { email, password } = req.body;
  const user = await authRepository.login({ email, password });

  try {
    if (user) {
      const userId = email;
      const token = jwt.sign({ userId }, secretKey, {
        expiresIn: `${expireTime}`,
      });
      res.json({ accessToken: token });
      return;
    } else {
      res.status(401).send({ detail: "E-mail ou senha incorretos" });
      return;
    }
  } catch (error: any) {
    console.log(error);
    res.status(403);
    return;
  }
};

const recover = async (req: Request, res: Response, next: NextFunction) => {};

export default {
  login,
  recover,
};
