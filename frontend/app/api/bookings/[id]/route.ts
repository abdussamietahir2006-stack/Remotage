import { dbConnect } from '@/lib/db';
import { Booking } from '@/lib/models/Booking.model';
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
