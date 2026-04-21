import { Request, Response } from 'express';
import { Lead } from '../models/Lead.model';
import { Booking } from '../models/Booking.model';
import { Subscriber } from '../models/Subscriber.model';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalLeads, newLeads, totalBookings, pendingBookings, totalSubscribers] =
    await Promise.all([
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

export const getWeeklyChart = asyncHandler(async (_req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build 7 days: 6 days before today + today
  const days: { date: Date; label: string }[] = [];
  for (let i = -6; i <= 0; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    days.push({ date: d, label });
  }

  const startDate = days[0].date;
  const endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999);

  const [leads, bookings, subscribers] = await Promise.all([
    Lead.find({ createdAt: { $gte: startDate, $lte: endDate } })
      .select('createdAt')
      .lean(),
    Booking.find({ createdAt: { $gte: startDate, $lte: endDate } })
      .select('createdAt')
      .lean(),
    Subscriber.find({ createdAt: { $gte: startDate, $lte: endDate } })
      .select('createdAt')
      .lean(),
  ]);

  const countByDay = (records: { createdAt: Date }[], day: Date): number => {
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    return records.filter(r => {
      const d = new Date(r.createdAt);
      return d >= day && d < next;
    }).length;
  };

  const chartData = days.map(({ date, label }) => ({
    label,
    leads:       countByDay(leads       as { createdAt: Date }[], date),
    bookings:    countByDay(bookings    as { createdAt: Date }[], date),
    subscribers: countByDay(subscribers as { createdAt: Date }[], date),
    isToday:     date.getTime() === today.getTime(),
  }));

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Weekly chart data fetched.',
    data: chartData,
  });
});