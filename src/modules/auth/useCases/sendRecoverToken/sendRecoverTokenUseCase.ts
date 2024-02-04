import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "@prismaClient/client";
import { AppError } from "@errors/AppErrors";

import { SendRecoverTokenRequestDTO } from "@modules/auth/dtos/sendRecoverToken/SendRecoverTokenRequestDTO";
import { SendRecoverTokenResponseDTO } from "@modules/auth/dtos/sendRecoverToken/SendRecoverTokenResponseDTO";

import { sendEmail } from "@services/Nodemailer";
import { mailConfig } from "@services/Nodemailer/config";
import { recoverTemplateFile } from "@services/Nodemailer/templates/recoverMail";

const secretKey = process.env.SECRET_KEY_JWT as jwt.Secret;
const recoverExpireTime = process.env.RECOVER_EXPIRE_TIME;
const emailUser = process.env.EMAIL_USER;

export class SendRecoverTokenUseCase {
  async execute({
    email,
  }: SendRecoverTokenRequestDTO): Promise<SendRecoverTokenResponseDTO> {
    const checkUserExistence = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUserExistence) {
      throw new AppError("E-mail inválido");
    }

    const recoverToken = jwt.sign({ id: checkUserExistence.id }, secretKey, {
      expiresIn: `${recoverExpireTime}`,
    });

    const result = await prisma.user.update({
      where: {
        email,
      },
      data: {
        recoverToken,
      },
    });

    if (!result) {
      throw new AppError("Erro no processo de recuperação de senha");
    }

    try {
      await sendEmail(
        mailConfig({
          destination: email,
          from: emailUser || "recover@atenda.com",
          subject: "Recuperação de senha - Sistema Atenda",
          template: recoverTemplateFile,
        })
      );
    } catch (error) {
      throw new AppError("Erro no processo de recuperação de senha");
    }

    return {
      message:
        "Token de segurança foi enviado ao e-mail informado, verifique sua caixa de entrada e spam",
    };
  }
}
