import { Response } from 'express';

interface ApiResponseOptions<T> {
  res:        Response;
  statusCode: number;
  message:    string;
  data?:      T;
  meta?:      Record<string, unknown>;
}

export const ApiResponse = <T>({
  res,
  statusCode,
  message,
  data,
  meta,
}: ApiResponseOptions<T>): Response => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data:    data ?? null,
    meta:    meta ?? null,
  });
};