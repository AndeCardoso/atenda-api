import { checkSchema } from "express-validator";

export const updateEquipmentSchema = checkSchema({
  nickname: {
    optional: true,
  },
  brand: {
    notEmpty: true,
    optional: false,
    errorMessage: "Marca é obrigatório",
  },
  model: {
    notEmpty: true,
    optional: false,
    errorMessage: "Modelo é obrigatório",
  },
  description: {
    optional: true,
  },
  serialNumber: {
    optional: true,
  },
  voltage: {
    optional: true,
  },
  color: {
    optional: true,
  },
  accessories: {
    optional: true,
  },
  status: {
    notEmpty: true,
    optional: false,
    errorMessage: "Status é obrigatório",
    isInt: {
      errorMessage: "Deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número deve ser maior que zero",
    },
  },
});
