import { dbConnect } from '@/lib/mongodb';
import { BlogPost } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';
import { ApiError } from '@/lib/response';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    await dbConnect();
    const resolvedParams = 'then' in params ? await params : params;
    const { slug } = resolvedParams;
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

    const post = await BlogPost.findOne({ slug: cleanSlug }).lean();
    if (!post) {
      throw new ApiError(404, 'Blog post not found.');
    }

    // Check if client is admin
    let isAdmin = false;
    try {
      authenticate(request);
      isAdmin = true;
    } catch {
      isAdmin = false;
    }

    // Public users cannot access draft posts
    if (post.status !== 'published' && !isAdmin) {
      throw new ApiError(403, 'Unauthorized access to draft post.');
    }

    return ApiResponse({
      statusCode: 200,
      message: 'Blog post fetched successfully.',
      data: JSON.parse(JSON.stringify(post)),
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
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { slug } = resolvedParams;
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

    let body;
    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    const post = await BlogPost.findOne({ slug: cleanSlug });
    if (!post) {
      throw new ApiError(404, 'Blog post not found.');
    }

    const {
      title,
      slug: newSlug,
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

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (author !== undefined) post.author = author;
    
    // Status transition rules
    if (status !== undefined) {
      if (status === 'published' && post.status !== 'published') {
        post.publishedAt = new Date();
      }
      post.status = status;
    }
    
    if (metaTitle !== undefined) post.metaTitle = metaTitle;
    if (metaDescription !== undefined) post.metaDescription = metaDescription;
    if (targetKeyword !== undefined) post.targetKeyword = targetKeyword;
    if (tags !== undefined) post.tags = tags;

    // Check slug uniqueness if changed
    if (newSlug !== undefined) {
      const cleanNewSlug = newSlug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();
      if (cleanNewSlug !== cleanSlug) {
        const existing = await BlogPost.findOne({ slug: cleanNewSlug });
        if (existing) {
          throw new ApiError(400, `A blog post with slug "${cleanNewSlug}" already exists.`);
        }
        post.slug = cleanNewSlug;
      }
    }

    await post.save();

    // Revalidate paths to instantly refresh blog post views
    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${post.slug}`);
      revalidatePath('/sitemap.xml');
    } catch (revalError) {
      console.error('Revalidation failed for blog:', revalError);
    }

    return ApiResponse({
      statusCode: 200,
      message: 'Blog post updated successfully.',
      data: JSON.parse(JSON.stringify(post)),
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    authenticate(request);
    await dbConnect();

    const resolvedParams = 'then' in params ? await params : params;
    const { slug } = resolvedParams;
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

    const result = await BlogPost.findOneAndDelete({ slug: cleanSlug });
    if (!result) {
      throw new ApiError(404, 'Blog post not found.');
    }

    // Revalidate paths
    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${slug}`);
      revalidatePath('/sitemap.xml');
    } catch (revalError) {
      console.error('Revalidation failed on delete:', revalError);
    }

    return ApiResponse({
      statusCode: 200,
      message: 'Blog post deleted successfully.',
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
