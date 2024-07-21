export class ContentNotFound {
  public readonly name: string;
  public readonly message: string;

  constructor(dataName?: string) {
    this.name = "ContentNotFound";
    this.message = `${dataName ?? "Dados"} não encontrados`;
  }
}
