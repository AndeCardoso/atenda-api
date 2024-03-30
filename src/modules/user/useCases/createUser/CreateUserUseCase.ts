import bcrypt from "bcrypt";
import { prisma } from "@prismaClient/client";
import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { badRequest, created } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

const saltOrRounds = process.env.CRYPTO_SALT_ROUNDS;

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<HttpResponse<UserResponseDTO>> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (Boolean(checkUserExistence)) {
      return badRequest("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return created({
      id: user.id,
      name: user.name,
      email: user.email,
      updated_at: user.updated_at,
    });
  }
}
