import { Request, Response, NextFunction, json } from "express";
import userRepository, { TOrderType } from "../repositories/userRepository";
import { validationResult } from "express-validator";
import { IUserModel } from "src/models/User";

async function getUserById(req: Request, res: Response) {
  const id = req.params.id;
  const user = await userRepository.getUserById(parseInt(id));
  if (user) res.json(user);
  else res.status(404);
}

async function getUserList(req: Request, res: Response) {
  const { page, limit, order } = req.query;

  const users = await userRepository.getUserList({
    page: Number(page),
    limit: Number(limit),
    order: order as TOrderType,
  });

  if (users) {
    res.json(users);
  } else {
    res.status(404);
  }
}

async function postUser(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  try {
    const newUser = req.body as IUserModel;
    const result = await userRepository.registerUser(newUser);
    if (result) res.status(201).json(result);
    else res.status(400);
  } catch (error: any) {
    res.status(400).json({ errorMessage: error.original.detail });
  }
}

export default {
  getUserById,
  getUserList,
  postUser,
};
