import { ForbiddenError, ServerError,UnauthorizedError } from "@/application/errors";

interface ResponseBody {
  message: string;
  data?: any;
}

export type HttpResponse<T = ResponseBody> = { statusCode: number; data: T };

export type HttpRequest<T = any> = {
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  query?: Record<string, string>;
  userLogged?: { id: string; name: string };
  userId?: string;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({ statusCode: 200, data });
export const badRequest = <T = string>(error: T): HttpResponse<T> => ({
    statusCode: 400,
    data: error,
});
export const unauthorized = (): HttpResponse<UnauthorizedError> => ({
    statusCode: 401,
    data: new UnauthorizedError(),
});
export const forbidden = (error: ForbiddenError): HttpResponse<ForbiddenError> => ({
    statusCode: 403,
    data: new ForbiddenError(error),
});
export const serverError = (error: ServerError): HttpResponse<ServerError> => ({
    statusCode: 500,
    data: new ServerError(error),
});