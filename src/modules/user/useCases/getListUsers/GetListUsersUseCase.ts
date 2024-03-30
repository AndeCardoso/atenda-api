import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { TUserColumnTypes, userColumnTypesEnum } from "./paramsType";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "src/utils/paginationResponseMount";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { contentNotFound, ok } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class GetListUsersUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = userColumnTypesEnum.NAME,
  }: IPaginationParams<TUserColumnTypes>): Promise<
    HttpResponse<IPaginationResponse<UserResponseDTO>>
  > {
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
        return contentNotFound("Usuário");
      }

      return ok(
        paginationResponseMount<UserResponseDTO>({
          data: users,
          page,
          limit,
          totalItems: totalUsers,
        })
      );
    } catch (error) {
      return contentNotFound("Usuário");
    }
  }
}
