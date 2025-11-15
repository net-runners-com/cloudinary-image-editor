import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// POST /api/upload
router.post('/', upload.single('file'), UploadController.uploadImage);

export default router;
