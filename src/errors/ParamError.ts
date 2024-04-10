import { FieldValidationError, Result } from "express-validator";

export class ParamsError {
  public readonly name: string;
  public readonly stack: {
    param: string;
    message: string;
  }[];

  constructor(stack: Result<FieldValidationError>) {
    this.name = "ParamsError";
    this.stack = stack.array().map((error) => {
      return { param: error.path, message: error.msg };
    });
  }
}
