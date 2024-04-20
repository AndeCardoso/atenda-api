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

  constructor(stack: Result<ValidationError | FieldValidationError>) {
    this.name = "ParamsError";
    this.stack = stack.array().map((error) => {
      return { param: error.type, message: error.msg };
    });
  }
}
