import { Request, Response } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';
import { TransformRequest, TransformResponse } from '../types/api.types';

export class TransformController {
  /**
   * Transform image with specified options
   */
  static async transformImage(req: Request<{}, {}, TransformRequest>, res: Response<TransformResponse>): Promise<void> {
    try {
      const { publicId, transformations } = req.body;

      if (!publicId) {
        res.status(400).json({
          success: false,
          error: 'publicId is required',
        });
        return;
      }

      if (!transformations) {
        res.status(400).json({
          success: false,
          error: 'transformations are required',
        });
        return;
      }

      // Generate transformation URL
      const transformedUrl = CloudinaryService.generateTransformUrl(publicId, transformations);

      res.status(200).json({
        success: true,
        data: {
          url: transformedUrl,
          secureUrl: transformedUrl,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Transformation failed',
      });
    }
  }

  /**
   * Delete image from Cloudinary
   */
  static async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        res.status(400).json({
          success: false,
          error: 'publicId is required',
        });
        return;
      }

      await CloudinaryService.deleteImage(publicId);

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Delete failed',
      });
    }
  }

  /**
   * Get image details
   */
  static async getImageDetails(req: Request, res: Response): Promise<void> {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        res.status(400).json({
          success: false,
          error: 'publicId is required',
        });
        return;
      }

      const details = await CloudinaryService.getImageDetails(publicId);

      res.status(200).json({
        success: true,
        data: details,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to get image details',
      });
    }
  }
}
