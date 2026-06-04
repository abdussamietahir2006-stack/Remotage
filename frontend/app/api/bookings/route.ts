import { dbConnect } from '@/lib/mongodb';
import { Booking } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export async function POST(request: Request) {
  try {
    await dbConnect();
    let name = '', email = '', company = '', phone = '', preferredTime = '', timezone = '', notes = '';
    try {
      const body = await request.json();
      name = body.name;
      email = body.email;
      company = body.company;
      phone = body.phone;
      preferredTime = body.preferredTime;
      timezone = body.timezone;
      notes = body.notes;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!name || !email) {
      throw new ApiError(400, 'Name and email are required.');
    }

    const booking = await Booking.create({
      name, email, company, phone, preferredTime, timezone, notes,
    });

    return ApiResponse({
      statusCode: 201,
      message: 'Booking confirmed. We will reach out shortly.',
      data: booking,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}

export async function GET(request: Request) {
  try {
    authenticate(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');

    const filter: Record<string, any> = {};
    if (status && status !== 'all') filter.status = status;

    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return ApiResponse({
      statusCode: 200,
      message: 'Bookings fetched successfully.',
      data: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
