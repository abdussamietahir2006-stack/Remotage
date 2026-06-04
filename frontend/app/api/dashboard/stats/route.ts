import { dbConnect } from '@/lib/backend/db';
import { Lead } from '@/lib/backend/models/Lead.model';
import { Booking } from '@/lib/backend/models/Booking.model';
import { Subscriber } from '@/lib/backend/models/Subscriber.model';
import { authenticate } from '@/lib/backend/middleware/auth';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';

export async function GET(request: Request) {
  try {
    authenticate(request);
    await dbConnect();

    const [totalLeads, newLeads, totalBookings, pendingBookings, totalSubscribers] =
      await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ status: 'new' }),
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'pending' }),
        Subscriber.countDocuments(),
      ]);

    return ApiResponse({
      statusCode: 200,
      message: 'Dashboard stats fetched.',
      data: {
        totalLeads,
        newLeads,
        totalBookings,
        pendingBookings,
        totalSubscribers,
        pagesManaged: 4,
      },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
