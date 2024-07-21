import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { badRequest, contentNotFound, ok } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class GetUserByIdUseCase {
  async execute(
    id: number,
    userId: number
  ): Promise<HttpResponse<UserResponseDTO>> {
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

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        admin: true,
        updated_at: true,
      },
      where: { id, companyId: admin?.companyId },
    });

    if (!user) {
      return contentNotFound("Usuário");
    }

    return ok(user);
  }
}
