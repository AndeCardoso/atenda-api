import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema Atenda",
      version: "1.0.0",
      description: "Documentação da API para o Sistema Atenda",
    },
  },
  apis: [
    "./src/modules/company/routers/*.ts",
    "./src/modules/auth/routers/*.ts",
    "./src/modules/user/routers/*.ts",
    "./src/modules/technician/routers/*.ts",
    "./src/modules/customer/routers/*.ts",
  ],
};
