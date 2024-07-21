import {
  FieldValidationError,
  ValidationError,
  Result,
} from "express-validator";

type TStackError = {
  param: string;
  message: string;
};

export class ParamsError {
  public readonly name: string;
  public readonly stack: TStackError[];

  constructor(stack: Result<FieldValidationError>) {
    this.name = "ParamsError";
    this.stack = stack.array().map((error) => {
      return { param: error.path, message: error.msg };
    });
  }
}
