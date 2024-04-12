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
  ...userSchemaObject,
});
