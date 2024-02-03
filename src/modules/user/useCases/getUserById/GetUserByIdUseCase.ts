import { AppError } from "@errors/AppErrors";
import { prisma } from "@prismaClient/client";
import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";

export class GetUserByIdUseCase {
  async execute(id: number): Promise<UserResponseDTO> {
    const user = await prisma.user.findUnique({
      select: { id: true, name: true, email: true, updated_at: true },
      where: { id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
