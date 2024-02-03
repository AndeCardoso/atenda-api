import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { AuthRequestDTO } from "@modules/auth/dtos/AuthRequestDTO";
import { AuthResponseDTO } from "@modules/auth/dtos/AuthResponseDTO";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const expireTime = process.env.EXPIRE_TIME as jwt.Secret;

export class AuthUseCase {
  async execute({ email, password }: AuthRequestDTO): Promise<AuthResponseDTO> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!checkUserExistence) {
      throw new AppError("Email or password invalid");
    }

    const userId = email;
    const token = jwt.sign({ userId }, secretKey, {
      expiresIn: `${expireTime}`,
    });

    const response = {
      token,
    };

    return response;
  }
}
