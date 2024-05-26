import { UnauthorizedError } from "@errors/UnauthorizedError";
import { HttpResponse } from "@shared/protocols/http";
import { ServerError } from "@errors/ServerError";
import { ContentNotFound } from "@errors/ContentNotFound";
import { BadRequestError } from "@errors/BadRequestError";

export const ok = (data: unknown): HttpResponse<any> => ({
  statusCode: 200,
  body: data,
});

export const created = (data: unknown): HttpResponse<any> => ({
  statusCode: 201,
  body: data,
});

export const contentNotFound = (dataName: string): HttpResponse<any> => ({
  statusCode: 204,
  body: new ContentNotFound(dataName),
});

export const badRequest = (message: string): HttpResponse<any> => ({
  statusCode: 400,
  body: new BadRequestError(message),
});

export const unauthorized = (message: string): HttpResponse<any> => ({
  statusCode: 401,
  body: new UnauthorizedError(message),
});

export const forbidden = (message: string): HttpResponse<any> => ({
  statusCode: 403,
  body: new UnauthorizedError(message),
});

export const serverError = (error: any): HttpResponse<any> => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
