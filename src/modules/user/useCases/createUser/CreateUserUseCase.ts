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
    userId,
  }: CreateUserDTO): Promise<HttpResponse<UserResponseDTO>> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (Boolean(checkUserExistence)) {
      return badRequest("E-mail já cadastrado");
    }

    const admin = await prisma.user.findUnique({
      select: {
        id: true,
        companyId: true,
        updated_at: true,
      },
      where: { id: userId, admin: true },
    });

    if (!admin) {
      return badRequest("Usuário não possui permissão");
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId: admin.companyId,
      },
    });

    return created({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: false,
      updated_at: user.updated_at,
    });
  }
}
