import { NextResponse } from 'next/server';

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

interface ApiResponseProps {
  statusCode:   number;
  message:      string;
  data?:        any;
  meta?:        any;
}

export const ApiResponse = ({
  statusCode,
  message,
  data = null,
  meta,
}: ApiResponseProps) => {
  return NextResponse.json(
    {
      success: statusCode >= 200 && statusCode < 300,
      message,
      data,
      ...(meta && { meta }),
    },
    { status: statusCode }
  );
};

export const ok  = <T>(data: T, msg = 'Success', status = 200) =>
  NextResponse.json({ success: true,  message: msg,  data }, { status });

export const err = (msg: string, status = 400) =>
  NextResponse.json({ success: false, message: msg, data: null }, { status });
