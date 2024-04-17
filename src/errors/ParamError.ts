import {
  FieldValidationError,
  Result,
  ValidationError,
} from "express-validator";

export class ParamsError {
  public readonly name: string;
  public readonly stack: {
    param: string;
    message: string;
  }[];

  constructor(stack: Result<FieldValidationError> | Result<ValidationError>) {
    this.name = "ParamsError";
    this.stack = stack.array().map((error) => {
      return { param: error.type, message: error.msg };
    });
  }
}
