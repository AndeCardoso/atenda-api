import { AppError } from "@errors/AppErrors";
import { prisma } from "@prismaClient/client";
import {
  UserListResponseDTO,
  UserResponseDTO,
} from "@modules/user/dtos/UserResponseDTO";
import { IGetListUsersParams, columnTypesEnum, orderEnum } from "./paramsType";
import { paginantionResponseMount } from "src/utils/paginantionResponseMount";

export class GetListUsersUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = columnTypesEnum.NAME,
  }: IGetListUsersParams): Promise<UserListResponseDTO> {
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

      const totalUsers = await prisma.user.count();

      if (users.length === 0) {
        throw new AppError("Nenhum usuário encontrado", 404);
      }

      return paginantionResponseMount<UserResponseDTO>({
        data: users,
        page,
        limit,
        totalItems: totalUsers,
      });
    } catch (error) {
      throw new AppError("Nenhum usuário encontrado", 404);
    }
  }
}
