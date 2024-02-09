import { checkSchema } from "express-validator";

export const sendRecoverTokenSchema = checkSchema({
  email: {
    notEmpty: true,
    optional: false,
    isEmail: true,
    errorMessage: "E-mail inválido!",
  },
});
