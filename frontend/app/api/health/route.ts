import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success:     true,
    message:     'Remotage API is running.',
    environment: (process.env.NODE_ENV || 'development'),
    timestamp:   new Date().toISOString(),
  });
}
