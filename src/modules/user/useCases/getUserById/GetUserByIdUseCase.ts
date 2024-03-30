import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";
import { contentNotFound, ok } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class GetUserByIdUseCase {
  async execute(id: number): Promise<HttpResponse<UserResponseDTO>> {
    const user = await prisma.user.findUnique({
      select: { id: true, name: true, email: true, updated_at: true },
      where: { id },
    });

    if (!user) {
      return contentNotFound("Usuário");
    }

    return ok(user);
  }
}
