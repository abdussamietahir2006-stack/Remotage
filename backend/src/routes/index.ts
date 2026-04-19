import { Router } from 'express';
import authRoutes       from './auth.routes';
import leadsRoutes      from './leads.routes';
import bookingsRoutes   from './bookings.routes';
import subscribersRoutes from './subscribers.routes';
import cmsRoutes        from './cms.routes';
import dashboardRoutes  from './dashboard.routes';

const router = Router();

router.use('/auth',        authRoutes);
router.use('/leads',       leadsRoutes);
router.use('/bookings',    bookingsRoutes);
router.use('/subscribers', subscribersRoutes);
router.use('/cms',         cmsRoutes);
router.use('/dashboard',   dashboardRoutes);

export default router;