import { dbConnect } from '@/lib/backend/db';
import { Booking } from '@/lib/backend/models/Booking.model';
import { authenticate } from '@/lib/backend/middleware/auth';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';
import { ApiError } from '@/lib/backend/utils/ApiError';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) throw new ApiError(404, 'Booking not found.');

    return ApiResponse({
      statusCode: 200,
      message: 'Booking deleted successfully.',
      data: null,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
