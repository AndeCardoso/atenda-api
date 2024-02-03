import { User } from "@prisma/client";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";

export class CreateUserUseCase {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkUserExistence) {
      throw new AppError("User already exists", 400);
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    return user;
  }
}
