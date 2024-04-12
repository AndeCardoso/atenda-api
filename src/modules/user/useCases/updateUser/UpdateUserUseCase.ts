import bcrypt from "bcrypt";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { contentNotFound, ok } from "@helper/http/httpHelper";
import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";

const saltOrRounds = process.env.CRYPTO_SALT_ROUNDS;

export class UpdateUserUseCase {
  async execute(
    id: number,
    userId: number,
    data: CreateUserDTO
  ): Promise<HttpResponse<UserResponseDTO>> {
    const admin = await prisma.user.findFirst({
      where: {
        id: userId,
        admin: true,
      },
    });

    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(saltOrRounds)
    );

    const user = await prisma.user.update({
      where: { companyId: admin?.companyId, id },
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return contentNotFound("Usuário");
    }

    return ok(user);
  }
}
