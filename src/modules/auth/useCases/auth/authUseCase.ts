import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { AuthRequestDTO } from "@modules/auth/dtos/auth/AuthRequestDTO";
import { AuthResponseDTO } from "@modules/auth/dtos/auth/AuthResponseDTO";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const accessExpireTime = process.env.ACCESS_EXPIRE_TIME as jwt.Secret;

export class AuthUseCase {
  async execute({ email, password }: AuthRequestDTO): Promise<AuthResponseDTO> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválida", 400);
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      throw new AppError("E-mail ou senha inválida", 400);
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
