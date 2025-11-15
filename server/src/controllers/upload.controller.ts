import { Request, Response } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';
import { UploadResponse } from '../types/api.types';
import fs from 'fs';

export class UploadController {
  /**
   * Handle image upload
   */
  static async uploadImage(req: Request, res: Response<UploadResponse>): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'No file uploaded',
        });
        return;
      }

      // Upload to Cloudinary
      const result = await CloudinaryService.uploadImage(req.file.path);

      // Delete temporary file
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        data: {
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        },
      });
    } catch (error: any) {
      // Clean up file if exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: error.message || 'Upload failed',
      });
    }
  }
}
