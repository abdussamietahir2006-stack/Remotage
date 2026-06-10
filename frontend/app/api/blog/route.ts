import { dbConnect } from '@/lib/mongodb';
import { BlogPost } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Check if client is an authenticated admin to return draft posts too
    let isAdmin = false;
    try {
      authenticate(request);
      isAdmin = true;
    } catch {
      isAdmin = false;
    }

    const { searchParams } = new URL(request.url);
    const filterStatus = searchParams.get('status');
    const tag = searchParams.get('tag');

    const query: Record<string, any> = {};

    if (tag) {
      query.tags = tag;
    }

    if (isAdmin) {
      if (filterStatus && filterStatus !== 'all') {
        query.status = filterStatus;
      }
    } else {
      // Public users can only see published posts
      query.status = 'published';
    }

    const posts = await BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    const serializedPosts = JSON.parse(JSON.stringify(posts));

    return ApiResponse({
      statusCode: 200,
      message: 'Blog posts fetched successfully.',
      data: serializedPosts,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}

export async function POST(request: Request) {
  try {
    authenticate(request);
    await dbConnect();

    let body;
    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      author,
      status,
      metaTitle,
      metaDescription,
      targetKeyword,
      tags,
    } = body;

    if (!title || !slug || !content) {
      throw new ApiError(400, 'Missing required fields: title, slug, and content are required.');
    }

    const cleanSlug = slug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

    // Check if slug already exists
    const existing = await BlogPost.findOne({ slug: cleanSlug });
    if (existing) {
      throw new ApiError(400, `A blog post with slug "${cleanSlug}" already exists.`);
    }

    const newPost = await BlogPost.create({
      title,
      slug: cleanSlug,
      content,
      excerpt: excerpt || '',
      coverImage: coverImage || '',
      author: author || 'Remotage Team',
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      targetKeyword: targetKeyword || '',
      tags: Array.isArray(tags) ? tags : [],
    });

    return ApiResponse({
      statusCode: 201,
      message: 'Blog post created successfully.',
      data: JSON.parse(JSON.stringify(newPost)),
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
