import { Request, Response } from 'express';
import { Subscriber } from '../models/Subscriber.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const createSubscriber = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required.');
  }

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    return ApiResponse({
      res,
      statusCode: 200,
      message: 'You are already subscribed.',
      data: null,
    });
  }

  const subscriber = await Subscriber.create({ email });

  return ApiResponse({
    res,
    statusCode: 201,
    message: 'Subscribed successfully.',
    data: subscriber,
  });
});

export const getSubscribers = asyncHandler(async (req: Request, res: Response) => {
  const page  = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;

  const total       = await Subscriber.countDocuments();
  const subscribers = await Subscriber.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return ApiResponse({
    res,
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
});

export const deleteSubscriber = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findByIdAndDelete(id);
  if (!subscriber) throw new ApiError(404, 'Subscriber not found.');

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Subscriber deleted successfully.',
    data: null,
  });
});

export const deleteAllSubscribers = asyncHandler(async (_req: Request, res: Response) => {
  await Subscriber.deleteMany({});

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'All subscribers deleted.',
    data: null,
  });
});