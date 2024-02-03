import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { AuthRequestDTO } from "@modules/auth/dtos/auth/AuthRequestDTO";
import { AuthResponseDTO } from "@modules/auth/dtos/auth/AuthResponseDTO";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const accessExpireTime = process.env.ACCESS_EXPIRE_TIME as jwt.Secret;

export class AuthUseCase {
  async execute({ email, password }: AuthRequestDTO): Promise<AuthResponseDTO> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!checkUserExistence) {
      throw new AppError("E-mail ou senha inválida");
    }

    const userId = email;
    const token = jwt.sign({ userId }, secretKey, {
      expiresIn: `${accessExpireTime}`,
    });

    const response = {
      token,
    };

    return response;
  }
}
