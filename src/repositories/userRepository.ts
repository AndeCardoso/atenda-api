import User from "../models/User";

const users: User[] = [];

async function getUserById(id: number): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    return resolve(users.find((c) => c.id === id));
  });
}

async function getUserList(pag: number): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const orderedList = users.sort((a, b) => a.name.localeCompare(b.name));

    if (users.length === 0) {
      return resolve([]);
    }

    if (users.length < 20) {
      return resolve(orderedList);
    }

    const indexEnd = pag * 20;
    const indexStart = indexEnd - 20;

    if (indexStart > users.length) {
      return resolve([]);
    }
    const userList = orderedList.slice(indexStart, indexEnd);

    return resolve(userList);
  });
}

async function registerUser(userParams: User): Promise<User> {
  return new Promise((resolve, reject) => {
    if (!userParams.name || !userParams.email || !userParams.password)
      return reject(
        new Error(`Usuário inválido, informe todos os dados obrigatórios`)
          .message
      );

    if (users.some((user) => userParams.email === user.email))
      return reject(new Error(`E-mail já possui cadastro`).message);

    const newUser = new User(
      userParams.name,
      userParams.email,
      userParams.password
    );
    users.push(newUser);

    return resolve(newUser);
  });
}

export default {
  getUserById,
  getUserList,
  registerUser,
};
