import { Request, Response } from 'express';
import { PageContent } from '../models/PageContent.model';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key:    env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const getPageContent = asyncHandler(async (req: Request, res: Response) => {
  const { pageSlug } = req.params;
  const page = await PageContent.findOne({ pageSlug }).lean();
  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Page content fetched.',
    data: page ?? { pageSlug, content: {}, images: {}, sections: [] },
  });
});

export const updatePageContent = asyncHandler(async (req: Request, res: Response) => {
  const { pageSlug } = req.params;
  const { content, images, sections } = req.body;

  const updateData: Record<string, unknown> = { pageSlug };
  if (content  !== undefined) updateData.content  = content;
  if (images   !== undefined) updateData.images   = images;
  if (sections !== undefined) updateData.sections = sections;

  const page = await PageContent.findOneAndUpdate(
    { pageSlug },
    { $set: updateData },
    { new: true, upsert: true }
  ).lean();

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Page content saved successfully.',
    data: page,
  });
});

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    return ApiResponse({ res, statusCode: 400, message: 'No image file provided.' });
  }

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
      stream.end(req.file!.buffer);
    }
  );

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Image uploaded successfully.',
    data: { url: result.secure_url, publicId: result.public_id },
  });
});