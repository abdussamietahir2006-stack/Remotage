import { dbConnect } from '@/lib/db';
import { Subscriber } from '@/lib/models/Subscriber.model';
import { authenticate } from '@/lib/auth-middleware';
import { ApiResponse } from '@/lib/ApiResponse';
import { ApiError } from '@/lib/ApiError';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) throw new ApiError(404, 'Subscriber not found.');

    return ApiResponse({
      statusCode: 200,
      message: 'Subscriber deleted successfully.',
      data: null,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
