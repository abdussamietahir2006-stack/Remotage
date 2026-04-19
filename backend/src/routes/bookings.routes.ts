import { Router } from 'express';
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookings.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/',            createBooking);
router.get('/',             authenticate, getBookings);
router.patch('/:id/status', authenticate, updateBookingStatus);
router.delete('/:id',       authenticate, deleteBooking);

export default router;