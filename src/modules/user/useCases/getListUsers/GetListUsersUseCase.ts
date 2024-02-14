import { AppError } from "@errors/AppErrors";
import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { IGetListUsersParams } from "./paramsType";

export class GetListUsersUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = "asc",
    column = "name",
  }: IGetListUsersParams): Promise<UserResponseDTO[]> {
    const offset = (page - 1) * limit;

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          updated_at: true,
        },
        orderBy: { [column]: order },
        take: limit,
        skip: offset,
      });

      if (users.length === 0) {
        throw new AppError("Nenhum usuário encontrado", 404);
      }
      return users;
    } catch (error) {
      throw new AppError("Nenhum usuário encontrado", 404);
    }
  }
}
