import { NextResponse } from 'next/server';

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
