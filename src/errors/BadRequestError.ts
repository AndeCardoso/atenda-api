export class BadRequestError {
  public readonly name: string;
  public readonly message: string;

  constructor(message: string) {
    this.name = "BadRequest";
    this.message = message;
  }
}
