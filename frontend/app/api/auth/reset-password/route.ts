import { dbConnect } from '@/lib/backend/db';
import { Admin } from '@/lib/backend/models/Admin.model';
import { PasswordReset } from '@/lib/backend/models/PasswordReset.model';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';
import { ApiError } from '@/lib/backend/utils/ApiError';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    let token = '';
    let email = '';
    let newPassword = '';
    try {
      const body = await request.json();
      token = body.token;
      email = body.email;
      newPassword = body.newPassword;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!token || !email || !newPassword) {
      throw new ApiError(400, 'Token, email, and new password are required.');
    }

    if (newPassword.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters.');
    }

    const resetRecord = await PasswordReset.findOne({
      token,
      email,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      throw new ApiError(401, 'Invalid or expired reset token.');
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new ApiError(404, 'Admin not found.');
    }

    admin.password = newPassword;
    await admin.save();

    await PasswordReset.deleteOne({ _id: resetRecord._id });

    return ApiResponse({
      statusCode: 200,
      message: 'Password reset successful. Please login with your new password.',
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
