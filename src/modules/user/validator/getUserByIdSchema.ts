import { checkSchema } from "express-validator";

export const getUserByIdSchema = checkSchema({
  id: {
    notEmpty: true,
    optional: false,
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número Id deve ser maior que zero",
    },
  },
});
