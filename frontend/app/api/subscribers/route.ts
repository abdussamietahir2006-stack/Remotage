import { dbConnect } from '@/lib/db';
import { Subscriber } from '@/lib/models/Subscriber.model';
import { authenticate } from '@/lib/auth-middleware';
import { ApiResponse } from '@/lib/ApiResponse';
import { ApiError } from '@/lib/ApiError';

export async function POST(request: Request) {
  try {
    await dbConnect();
    let email = '';
    try {
      const body = await request.json();
      email = body.email;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!email) {
      throw new ApiError(400, 'Email is required.');
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return ApiResponse({
        statusCode: 200,
        message: 'You are already subscribed.',
        data: null,
      });
    }

    const subscriber = await Subscriber.create({ email });

    return ApiResponse({
      statusCode: 201,
      message: 'Subscribed successfully.',
      data: subscriber,
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
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const total = await Subscriber.countDocuments();
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return ApiResponse({
      statusCode: 200,
      message: 'Subscribers fetched successfully.',
      data: subscribers,
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

export async function DELETE(request: Request) {
  try {
    authenticate(request);
    await dbConnect();

    await Subscriber.deleteMany({});

    return ApiResponse({
      statusCode: 200,
      message: 'All subscribers deleted.',
      data: null,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
