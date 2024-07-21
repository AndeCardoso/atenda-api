import { Schema } from "express-validator";

export const createAddressSchema: Schema = {
  nickname: {
    optional: true,
  },
  cep: {
    notEmpty: true,
    optional: false,
    errorMessage: "Cep é obrigatório",
  },
  street: {
    notEmpty: true,
    optional: false,
    errorMessage: "Rua é obrigatório",
  },
  number: {
    notEmpty: true,
    optional: false,
    errorMessage: "Número é obrigatório",
  },
  complement: {
    optional: true,
  },
  district: {
    notEmpty: true,
    optional: false,
    errorMessage: "Bairro é obrigatório",
  },
  state: {
    notEmpty: true,
    optional: false,
    errorMessage: "Estado é obrigatório",
  },
  city: {
    notEmpty: true,
    optional: false,
    errorMessage: "Cidade é obrigatório",
  },
};
