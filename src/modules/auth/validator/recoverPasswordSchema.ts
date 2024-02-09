import { checkSchema } from "express-validator";

export const recoverPasswordSchema = checkSchema({
  email: {
    notEmpty: true,
    optional: false,
    isEmail: true,
    errorMessage: "E-mail inválido!",
  },
  token: {
    notEmpty: true,
    optional: false,
    isJWT: true,
    errorMessage: "Token de segurança inválido",
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
