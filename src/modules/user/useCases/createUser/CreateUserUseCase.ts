import bcrypt from "bcrypt";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";

const saltOrRounds = process.env.CRYPTO_SALT_ROUNDS;

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<UserResponseDTO> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (Boolean(checkUserExistence)) {
      throw new AppError("E-mail já cadastrado", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      updated_at: user.updated_at,
    };
  }
}
