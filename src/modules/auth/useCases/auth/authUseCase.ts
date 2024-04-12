import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AuthRequestDTO } from "@modules/auth/dtos/auth/AuthRequestDTO";
import { AuthResponseDTO } from "@modules/auth/dtos/auth/AuthResponseDTO";
import { badRequest, ok } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const accessExpireTime = process.env.ACCESS_EXPIRE_TIME as jwt.Secret;

export class AuthUseCase {
  async execute({
    email,
    password,
  }: AuthRequestDTO): Promise<HttpResponse<AuthResponseDTO>> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return badRequest("E-mail ou senha inválida");
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      return badRequest("E-mail ou senha inválida");
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    };
    const token = jwt.sign({ userPayload }, secretKey, {
      expiresIn: `${accessExpireTime}`,
    });

    const response = {
      token,
    };

    return ok(response);
  }
}
