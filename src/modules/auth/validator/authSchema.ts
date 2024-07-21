import { checkSchema } from "express-validator";

export const authSchema = checkSchema({
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
