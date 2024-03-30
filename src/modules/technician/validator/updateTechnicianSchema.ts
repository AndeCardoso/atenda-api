import { updateAddressSchema } from "@shared/validator/updateAddressSchema";
import { checkSchema } from "express-validator";

export const updateTechnicianSchema = checkSchema({
  name: {
    notEmpty: true,
    optional: true,
    trim: true,
    isLength: {
      options: { min: 4, max: 32 },
    },
    errorMessage: "Nome é obrigatório",
  },
  cpf: {
    notEmpty: true,
    optional: true,
    errorMessage: "Cpf é obrigatório",
  },
  phone: {
    notEmpty: true,
    optional: true,
    errorMessage: "Telefone é obrigatório",
  },
  position: {
    notEmpty: true,
    optional: true,
    errorMessage: "Cargo é obrigatório",
  },
  ...updateAddressSchema,
});
