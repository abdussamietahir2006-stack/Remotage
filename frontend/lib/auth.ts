import { SignJWT, jwtVerify } from 'jose';
import { ApiError } from '@/lib/response';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'remotage_jwt_secret_key_2024'
);

export interface DecodedAdmin {
  email: string;
  role: string;
}

// ── used in API routes (server) ──────────────────────────────
export async function signToken(payload: DecodedAdmin): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
}

// ── Edge-safe — used in middleware too ──────────────────────
export async function verifyToken(token: string): Promise<DecodedAdmin | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { email: payload.email as string, role: payload.role as string };
  } catch {
    return null;
  }
}

export async function authenticate(request: Request): Promise<DecodedAdmin> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'No token provided.');
  }

  const token = authHeader.split(' ')[1];
  const decoded = await verifyToken(token);
  if (!decoded) throw new ApiError(401, 'Invalid or expired token.');
  return decoded;
}