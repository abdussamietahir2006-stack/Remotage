import { Router } from 'express';
import { getDashboardStats, getWeeklyChart } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats',        authenticate, getDashboardStats);
router.get('/weekly-chart', authenticate, getWeeklyChart);

export default router;