import { Router } from 'express';
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from '../controllers/leads.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/',               createLead);
router.get('/',                authenticate, getLeads);
router.patch('/:id/status',    authenticate, updateLeadStatus);
router.delete('/:id',          authenticate, deleteLead);

export default router;