import { Router } from 'express';
import { login, verifyToken } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/login',  login);
router.get('/verify',  authenticate, verifyToken);

export default router;