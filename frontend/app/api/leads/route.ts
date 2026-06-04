import { dbConnect } from '@/lib/db';
import { Lead } from '@/lib/models/Lead.model';
import { authenticate } from '@/lib/auth-middleware';
import { ApiResponse } from '@/lib/ApiResponse';
import { ApiError } from '@/lib/ApiError';

export async function POST(request: Request) {
  try {
    await dbConnect();
    let name = '', email = '', message = '', company = '', phone = '', source = '';
    try {
      const body = await request.json();
      name = body.name;
      email = body.email;
      message = body.message;
      company = body.company;
      phone = body.phone;
      source = body.source;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required.');
    }

    const lead = await Lead.create({ name, email, message, company, phone, source });

    return ApiResponse({
      statusCode: 201,
      message: 'Message received. We will get back to you within 24 hours.',
      data: lead,
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
    const search = searchParams.get('search');

    const filter: Record<string, any> = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return ApiResponse({
      statusCode: 200,
      message: 'Leads fetched successfully.',
      data: leads,
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
