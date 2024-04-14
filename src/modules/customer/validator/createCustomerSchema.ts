import { createAddressSchema } from "@shared/validator/createAddressSchema";
import { checkSchema, validationResult } from "express-validator";

export const createCustomerSchema = checkSchema({
  name: {
    notEmpty: true,
    optional: false,
    trim: true,
    isLength: {
      options: { min: 4, max: 32 },
    },
    errorMessage: "Nome precisa ter de 4 á 32 caracteres",
  },
  document: {
    notEmpty: true,
    optional: false,
    errorMessage: "Documento é obrigatório",
  },
  phone: {
    notEmpty: true,
    optional: false,
    isMobilePhone: true,
    errorMessage: "Telefone é obrigatório",
  },
  secondPhone: {
    optional: true,
  },
  email: {
    notEmpty: true,
    optional: false,
    isEmail: true,
    errorMessage: "E-mail é obrigatório",
  },
  status: {
    notEmpty: true,
    optional: false,
    errorMessage: "Status é obrigatório",
  },
  addresses: {
    notEmpty: true,
    optional: false,
    isArray: true,
    customSanitizer: {
      options: (value) => {
        return Array.isArray(value) ? value : [];
      },
    },
    custom: {
      options: (value) => {
        if (!Array.isArray(value)) {
          throw new Error("Endereços deve ser um array");
        }
        const validationResult = value.map((address) =>
          checkSchema(createAddressSchema).run(address)
        );
        return Promise.all(validationResult);
      },
    },
  },
});
