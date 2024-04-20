import { Result } from "express-validator";

type TValidationError = {
  path: string;
  msg: string;
};

type TStackError = {
  param: string;
  message: string;
};

export class ParamsError {
  public readonly name: string;
  public readonly stack: TStackError[];

  constructor(stack: Result<TValidationError>) {
    this.name = "ParamsError";
    this.stack = stack.array().map((error) => {
      return { param: error.path, message: error.msg };
    });
  }
}
