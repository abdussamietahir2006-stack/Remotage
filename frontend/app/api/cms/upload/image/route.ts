import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/lib/backend/config/env';
import { authenticate } from '@/lib/backend/middleware/auth';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';
import { ApiError } from '@/lib/backend/utils/ApiError';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key:    env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    authenticate(request);

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      throw new ApiError(400, 'No image file provided.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'remotage',
            resource_type: 'image',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error('Upload failed'));
            else resolve(result as { secure_url: string; public_id: string });
          }
        );
        stream.end(buffer);
      }
    );

    return ApiResponse({
      statusCode: 200,
      message: 'Image uploaded successfully.',
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
