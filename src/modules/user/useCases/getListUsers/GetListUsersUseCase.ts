import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { TUserColumnTypes, userColumnTypesEnum } from "./paramsType";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "@utils/paginationResponseMount";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { badRequest, contentNotFound, ok } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class GetListUsersUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = userColumnTypesEnum.NAME,
    search,
    userId,
  }: IPaginationParams<TUserColumnTypes>): Promise<
    HttpResponse<IPaginationResponse<UserResponseDTO>>
  > {
    const offset = (page - 1) * limit;

    try {
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

      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          admin: true,
          updated_at: true,
        },
        where: {
          companyId: admin?.companyId,
          name: {
            mode: "insensitive",
            contains: search,
          },
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
