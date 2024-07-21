import { createAddressSchema } from "@shared/validator/createAddressSchema";
import { checkSchema } from "express-validator";

export const createTechnicianSchema = checkSchema({
  name: {
    notEmpty: true,
    optional: false,
    trim: true,
    isLength: {
      options: { min: 4, max: 32 },
    },
    errorMessage: "Nome precisa ter de 4 á 32 caracteres!",
  },
  cpf: {
    notEmpty: true,
    optional: false,
    errorMessage: "Cpf é obrigatorio",
  },
  phone: {
    notEmpty: true,
    optional: false,
    errorMessage: "Telefone inválido!",
  },
  position: {
    notEmpty: true,
    optional: false,
    errorMessage: "Telefone inválido!",
  },
  ...createAddressSchema,
});
