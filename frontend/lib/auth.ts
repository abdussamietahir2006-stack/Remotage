import jwt from 'jsonwebtoken';
import { ApiError } from '@/lib/response';

const SECRET = process.env.JWT_SECRET || 'remotage_jwt_secret_key_2024';

export interface DecodedAdmin {
  email: string;
  role: string;
}

export function signToken(payload: DecodedAdmin) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): DecodedAdmin | null {
  try {
    return jwt.verify(token, SECRET) as DecodedAdmin;
  } catch {
    return null;
  }
}

export function authenticate(request: Request): DecodedAdmin {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'No token provided.');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET) as DecodedAdmin;
    return { email: decoded.email, role: decoded.role };
  } catch {
    throw new ApiError(401, 'Invalid or expired token.');
  }
}
