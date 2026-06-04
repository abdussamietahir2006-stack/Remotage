import { authenticate } from '@/lib/backend/middleware/auth';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';

export async function GET(request: Request) {
  try {
    const admin = authenticate(request);
    return ApiResponse({
      statusCode: 200,
      message: 'Token is valid.',
      data: { admin },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 401,
      message: error.message || 'Unauthorized',
    });
  }
}
