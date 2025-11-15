import { Router } from 'express';
import { TransformController } from '../controllers/transform.controller';

const router = Router();

// POST /api/transform
router.post('/', TransformController.transformImage);

// GET /api/images/:publicId
router.get('/images/:publicId', TransformController.getImageDetails);

// DELETE /api/images/:publicId
router.delete('/images/:publicId', TransformController.deleteImage);

export default router;
