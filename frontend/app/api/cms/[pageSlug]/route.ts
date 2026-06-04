import { dbConnect } from '@/lib/mongodb';
import { PageContent } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageSlug: string }> | { pageSlug: string } }
) {
  try {
    await dbConnect();
    const resolvedParams = 'then' in params ? await params : params;
    const { pageSlug } = resolvedParams;

    const page = await PageContent.findOne({ pageSlug }).lean();
    return ApiResponse({
      statusCode: 200,
      message: 'Page content fetched.',
      data: page ?? { pageSlug, content: {}, images: {}, sections: [] },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ pageSlug: string }> | { pageSlug: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { pageSlug } = resolvedParams;

    let content, images, sections;
    try {
      const body = await request.json();
      content = body.content;
      images = body.images;
      sections = body.sections;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    const updateData: Record<string, any> = { pageSlug };
    if (content !== undefined) updateData.content = content;
    if (images !== undefined) updateData.images = images;
    if (sections !== undefined) updateData.sections = sections;

    const page = await PageContent.findOneAndUpdate(
      { pageSlug },
      { $set: updateData },
      { new: true, upsert: true }
    ).lean();

    return ApiResponse({
      statusCode: 200,
      message: 'Page content saved successfully.',
      data: page,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
