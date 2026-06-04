import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export interface DecodedAdmin {
  email: string;
  role: string;
}

export const authenticate = (request: Request): DecodedAdmin => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'No token provided.');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedAdmin;
    return { email: decoded.email, role: decoded.role };
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token.');
  }
};
