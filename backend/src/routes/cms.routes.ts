import { Router } from 'express';
import {
  getPageContent,
  updatePageContent,
  uploadImage,
} from '../controllers/cms.controller';
import { authenticate } from '../middleware/auth.middleware';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload  = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

// ⚠️ upload route MUST come before /:pageSlug or Express swallows it
router.post('/upload/image', authenticate, upload.single('image'), uploadImage);

router.get('/:pageSlug',  getPageContent);
router.put('/:pageSlug',  authenticate, updatePageContent);

export default router;