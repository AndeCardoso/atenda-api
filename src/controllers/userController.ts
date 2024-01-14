import { Request, Response, NextFunction, json } from "express";
import userRepository, { TOrderType } from "../repositories/userRepository";
import { validationResult } from "express-validator";
import { IUserModel } from "src/models/User";
import { SequelizeScopeError } from "sequelize";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const user = await userRepository.getUserById(parseInt(id));
  if (user) res.json(user);
  else res.sendStatus(404);
}

async function getUserList(req: Request, res: Response, next: NextFunction) {
  const { page, limit, order } = req.query;

  const users = await userRepository.getUserList({
    page: Number(page),
    limit: Number(limit),
    order: order as TOrderType,
  });

  if (users) {
    res.json(users);
  } else {
    res.sendStatus(404);
  }
}

async function postUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(403).json(errors);
    return;
  }

  try {
    const newUser = req.body as IUserModel;
    const result = await userRepository.registerUser(newUser);
    if (result) res.status(201).json(result);
    else res.status(400);
  } catch (error: any) {
    res.status(403).json({ errorMessage: error.original.detail });
  }
}

export default {
  getUserById,
  getUserList,
  postUser,
};
