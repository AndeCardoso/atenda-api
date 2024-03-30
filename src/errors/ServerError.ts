export class ServerError {
  public readonly name: string;
  public readonly message: string;
  public readonly stack: string;

  constructor(stack: string = "", message?: string) {
    this.name = "ServerError";
    this.message = message ?? "Erro interno do servidor";
    this.stack = stack;
  }
}
