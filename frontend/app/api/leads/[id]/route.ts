import { dbConnect } from '@/lib/mongodb';
import { Lead } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { id } = resolvedParams;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) throw new ApiError(404, 'Lead not found.');

    return ApiResponse({
      statusCode: 200,
      message: 'Lead deleted successfully.',
      data: null,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
