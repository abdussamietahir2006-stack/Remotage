import { Request, Response } from 'express';
import { Lead } from '../models/Lead.model';
import { Booking } from '../models/Booking.model';
import { Subscriber } from '../models/Subscriber.model';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalLeads,
    newLeads,
    totalBookings,
    pendingBookings,
    totalSubscribers,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Subscriber.countDocuments(),
  ]);

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Dashboard stats fetched.',
    data: {
      totalLeads,
      newLeads,
      totalBookings,
      pendingBookings,
      totalSubscribers,
      pagesManaged: 4,
    },
  });
});