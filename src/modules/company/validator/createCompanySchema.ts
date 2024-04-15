import { userSchemaObject } from "@modules/user/validator/createUserSchema";
import { checkSchema } from "express-validator";

export const createCompanySchema = checkSchema({
  companyName: {
    optional: true,
    trim: true,
    isLength: {
      options: { min: 4, max: 32 },
    },
    errorMessage: "Nome da empresa precisa ter de 4 á 32 caracteres",
  },
  companyDocument: {
    notEmpty: true,
    optional: false,
    isLength: {
      options: { min: 11, max: 14 },
      errorMessage:
        "Documento precisa ter 11 dígitos para CPF ou 14 dígitos para CNPJ",
    },
    errorMessage: "Documento é obrigatório",
  },
  ...userSchemaObject,
});
