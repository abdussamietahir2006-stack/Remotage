import { dbConnect } from '@/lib/mongodb';
import { Booking } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    let status = '';
    try {
      const body = await request.json();
      status = body.status;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status value.');
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!booking) throw new ApiError(404, 'Booking not found.');

    return ApiResponse({
      statusCode: 200,
      message: 'Booking status updated.',
      data: booking,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
