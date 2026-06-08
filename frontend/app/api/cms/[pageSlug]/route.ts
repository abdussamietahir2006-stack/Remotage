import { dbConnect } from '@/lib/mongodb';
import { PageContent } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';
import { revalidatePath } from 'next/cache';

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

    // Trigger on-demand revalidation to refresh Next.js static pages instantly
    try {
      const pathMap: Record<string, string> = {
        home: '/',
        about: '/about',
        services: '/services',
        contact: '/contact',
      };

      if (pathMap[pageSlug]) {
        revalidatePath(pathMap[pageSlug]);
      } else if (pageSlug === 'navbar' || pageSlug === 'footer') {
        revalidatePath('/', 'layout');
      }
    } catch (revalError) {
      console.error(`Revalidation failed for page slug ${pageSlug}:`, revalError);
    }

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

