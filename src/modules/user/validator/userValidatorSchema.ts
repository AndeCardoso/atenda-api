import { checkSchema } from "express-validator";

export const userValidatorSchema = checkSchema({
  token: {
    optional: true,
  },
  name: {
    notEmpty: true,
    optional: false,
    trim: true,
    isLength: {
      options: { min: 4, max: 32 },
    },
    errorMessage: "Nome precisa ter de 4 á 32 caracteres!",
  },
  email: {
    notEmpty: true,
    optional: false,
    isEmail: true,
    errorMessage: "E-mail inválido!",
  },
  password: {
    notEmpty: true,
    optional: false,
    isLength: {
      options: { min: 6, max: 10 },
    },
    errorMessage: "Senha precisa ter de 6 á 10 caracteres!",
  },
});
