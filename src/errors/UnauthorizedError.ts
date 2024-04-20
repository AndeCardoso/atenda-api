export class UnauthorizedError {
  public readonly name: string;
  public readonly message: string;

  constructor(message: string = "Acesso não autorizado") {
    this.name = "Unauthorized";
    this.message = message;
  }
}
