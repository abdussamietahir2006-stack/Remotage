import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }

  if (
    email !== env.ADMIN_EMAIL ||
    password !== env.ADMIN_PASSWORD
  ) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = jwt.sign(
    { email: env.ADMIN_EMAIL, role: 'admin' },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
  );

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Login successful.',
    data: {
      token,
      admin: { email: env.ADMIN_EMAIL, role: 'admin' },
    },
  });
});

export const verifyToken = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Token is valid.',
    data: { admin: req.admin },
  });
});