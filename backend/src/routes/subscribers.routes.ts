import { Router } from 'express';
import {
  createSubscriber,
  getSubscribers,
  deleteSubscriber,
  deleteAllSubscribers,
} from '../controllers/subscribers.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/',    createSubscriber);
router.get('/',     authenticate, getSubscribers);
router.delete('/',  authenticate, deleteAllSubscribers);
router.delete('/:id', authenticate, deleteSubscriber);

export default router;