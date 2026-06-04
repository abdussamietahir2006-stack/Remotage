import { dbConnect } from '@/lib/mongodb';
import { Lead } from '@/models/index';
import { Booking } from '@/models/index';
import { Subscriber } from '@/models/index';
import { authenticate } from '@/lib/auth';
import { ApiResponse } from '@/lib/response';

export async function GET(request: Request) {
  try {
    authenticate(request);
    await dbConnect();

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

    const countByDay = (records: any[], day: Date): number => {
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      return records.filter(r => {
        const d = new Date(r.createdAt);
        return d >= day && d < next;
      }).length;
    };

    const chartData = days.map(({ date, label }) => ({
      label,
      leads:       countByDay(leads, date),
      bookings:    countByDay(bookings, date),
      subscribers: countByDay(subscribers, date),
      isToday:     date.getTime() === today.getTime(),
    }));

    return ApiResponse({
      statusCode: 200,
      message: 'Weekly chart data fetched.',
      data: chartData,
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
