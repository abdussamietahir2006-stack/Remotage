import { dbConnect } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    let email = '';
    let password = '';
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required.');
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    const token = jwt.sign(
      { email: admin.email, role: admin.role },
      (process.env.JWT_SECRET || 'remotage_jwt_secret_key_2024'),
      { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') } as jwt.SignOptions
    );

    return ApiResponse({
      statusCode: 200,
      message: 'Login successful.',
      data: {
        token,
        admin: { email: admin.email, role: admin.role },
      },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
