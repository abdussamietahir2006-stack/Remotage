import { dbConnect } from '@/lib/db';
import { PasswordReset } from '@/lib/models/PasswordReset.model';
import { ApiResponse } from '@/lib/ApiResponse';
import { ApiError } from '@/lib/ApiError';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    let token = '';
    let email = '';
    try {
      const body = await request.json();
      token = body.token;
      email = body.email;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!token || !email) {
      throw new ApiError(400, 'Token and email are required.');
    }

    const resetRecord = await PasswordReset.findOne({
      token,
      email,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      throw new ApiError(401, 'Invalid or expired reset token.');
    }

    return ApiResponse({
      statusCode: 200,
      message: 'Token is valid.',
      data: { email },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
