import { Router } from 'express';
import uploadRoutes from './upload.routes';
import transformRoutes from './transform.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Cloudinary Image Editor API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
router.use('/upload', uploadRoutes);
router.use('/transform', transformRoutes);
router.use('/images', transformRoutes); // For GET and DELETE operations

export default router;
