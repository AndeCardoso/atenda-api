import bcrypt from "bcrypt";
import { prisma } from "@prismaClient/client";
import { badRequest, created } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { CreateCompanyDTO } from "@modules/company/dtos/CreateCompanyDTO";
import { CompanyResponseDTO } from "@modules/company/dtos/CompanyResponseDTO";

const saltOrRounds = process.env.CRYPTO_SALT_ROUNDS;

export class CreateCompanyUseCase {
  async execute({
    companyName,
    companyDocument,
    name,
    email,
    password,
  }: CreateCompanyDTO): Promise<HttpResponse<CompanyResponseDTO>> {
    const checkUserExistence = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (Boolean(checkUserExistence)) {
      return badRequest("E-mail já cadastrado");
    }

    const checkCompanyExistence = await prisma.company.findFirst({
      where: {
        document: companyDocument,
      },
    });

    if (Boolean(checkCompanyExistence)) {
      return badRequest("Documento de empresa já cadastrado");
    }

    const company = await prisma.company.create({
      data: {
        name: companyName,
        document: companyDocument,
      },
    });

    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        admin: true,
        companyId: company.id,
      },
    });

    return created({
      id: user.id,
      companyName: company.name,
      companyDocument: company.document,
      name: user.name,
      email: user.email,
      admin: user.admin,
      created_at: user.created_at,
    });
  }
}
