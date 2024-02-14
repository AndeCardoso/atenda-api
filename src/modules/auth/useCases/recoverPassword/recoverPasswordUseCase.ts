import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";
import { RecoverPasswordResponseDTO } from "@modules/auth/dtos/recoverPassword/RecoverPasswordResponseDTO";
import { RecoverPasswordRequestDTO } from "@modules/auth/dtos/recoverPassword/RecoverPasswordRequestDTO";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const accessExpireTime = process.env.ACCESS_EXPIRE_TIME;
const saltOrRounds = process.env.CRYPTO_SALT_ROUNDS;

export class RecoverPasswordUseCase {
  async execute({
    email,
    password,
    token,
  }: RecoverPasswordRequestDTO): Promise<RecoverPasswordResponseDTO> {
    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null) => {
      if (err) {
        throw new AppError("Token de segurança inválido");
      }
    });

    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const checkedToken = token === checkUserExistence?.recoverToken;

    if (!checkUserExistence || !checkedToken) {
      throw new AppError("E-mail ou token de segurança inválido", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));

    const result = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        recoverToken: null,
      },
    });

    const accessToken = jwt.sign(
      { userId: checkUserExistence.email },
      secretKey,
      {
        expiresIn: `${accessExpireTime}`,
      }
    );

    if (!result) {
      throw new AppError("Erro no processo de recuperação de senha", 400);
    }

    return {
      token: accessToken,
    };
  }
}
