import { checkSchema } from "express-validator";

export const attachSignatureSchema = checkSchema({
  serviceOrderId: {
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
  signatureImage: {
    notEmpty: true,
    optional: false,
    errorMessage: "A imagem da assinatura é obrigatória",
    isDataURI: true,
  },
});
