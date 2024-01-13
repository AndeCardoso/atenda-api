import { Request, Response, NextFunction, json } from "express";
import userRepository from "../repositories/userRepository";
import User from "../models/User";
import { validationResult } from "express-validator";

async function getUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const user = await userRepository.getUserById(parseInt(id));
  if (user) res.json(user);
  else res.sendStatus(404);
}

async function getUserList(req: Request, res: Response, next: NextFunction) {
  const { page } = req.params;
  const users = await userRepository.getUserList(Number(page));
  res.json(users);
}

async function postUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(403).json(errors);
    return;
  }

  try {
    const newUser = req.body as User;
    const result = await userRepository.registerUser(newUser);
    if (result) res.status(201).json(result);
    else res.status(400);
  } catch (error) {
    res.status(403).json({ errorMessage: error });
  }
}

export default {
  getUser,
  getUserList,
  postUser,
};
