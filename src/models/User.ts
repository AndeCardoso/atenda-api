export default class User {
  id: number;
  name: string;
  password: string;
  email: string;
  token?: string;

  private static nextId = 1;

  constructor(name: string, email: string, password: string, token?: string) {
    this.id = User.nextId++;
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
