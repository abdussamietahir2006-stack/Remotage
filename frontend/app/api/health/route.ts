import { NextResponse } from 'next/server';
import { env } from '@/lib/env-config';

export async function GET() {
  return NextResponse.json({
    success:     true,
    message:     'Remotage API is running.',
    environment: env.NODE_ENV,
    timestamp:   new Date().toISOString(),
  });
}
