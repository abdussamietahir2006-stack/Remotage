import { dbConnect } from '@/lib/backend/db';
import { Lead } from '@/lib/backend/models/Lead.model';
import { authenticate } from '@/lib/backend/middleware/auth';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';
import { ApiError } from '@/lib/backend/utils/ApiError';

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

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status value.');
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!lead) throw new ApiError(404, 'Lead not found.');

    return ApiResponse({
      statusCode: 200,
      message: 'Lead status updated.',
      data: lead,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
