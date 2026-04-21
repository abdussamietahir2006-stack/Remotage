import { Router } from 'express';
import {
  login,
  verifyToken,
  requestPasswordReset,
  validateResetToken,
  resetPassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/verify', authenticate, verifyToken);
router.post('/forgot-password', requestPasswordReset);
router.post('/validate-reset-token', validateResetToken);
router.post('/reset-password', resetPassword);

export default router;