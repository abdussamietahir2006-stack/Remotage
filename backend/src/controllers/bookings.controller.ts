import { Request, Response } from 'express';
import { Booking } from '../models/Booking.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, company, phone, preferredTime, timezone, notes } = req.body;

  if (!name || !email) {
    throw new ApiError(400, 'Name and email are required.');
  }

  const booking = await Booking.create({
    name, email, company, phone, preferredTime, timezone, notes,
  });

  return ApiResponse({
    res,
    statusCode: 201,
    message: 'Booking confirmed. We will reach out shortly.',
    data: booking,
  });
});

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
  const page   = parseInt(req.query.page as string) || 1;
  const limit  = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as string;

  const filter: Record<string, unknown> = {};
  if (status && status !== 'all') filter.status = status;

  const total    = await Booking.countDocuments(filter);
  const bookings = await Booking.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Bookings fetched successfully.',
    data: bookings,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status value.');
  }

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean();

  if (!booking) throw new ApiError(404, 'Booking not found.');

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Booking status updated.',
    data: booking,
  });
});

export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new ApiError(404, 'Booking not found.');

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Booking deleted successfully.',
    data: null,
  });
});