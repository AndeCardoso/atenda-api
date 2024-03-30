export class UnauthorizedError {
  public readonly name: string;
  public readonly message: string;

  constructor() {
    this.name = "Unauthorized";
    this.message = "Acesso não autorizado";
  }
}
