import cloudinary from '../config/cloudinary.config';
import { TransformRequest } from '../types/api.types';
import { UploadApiResponse } from 'cloudinary';

export class CloudinaryService {
  /**
   * Upload image to Cloudinary
   */
  static async uploadImage(filePath: string): Promise<UploadApiResponse> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'cloudinary-image-editor',
        resource_type: 'image',
      });
      return result;
    } catch (error: any) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }

  /**
   * Generate transformation URL
   */
  static generateTransformUrl(publicId: string, transformations: TransformRequest['transformations']): string {
    const transformArray: any[] = [];

    // Resize transformation
    if (transformations.resize) {
      const resizeTransform: any = {};
      if (transformations.resize.width) resizeTransform.width = transformations.resize.width;
      if (transformations.resize.height) resizeTransform.height = transformations.resize.height;
      if (transformations.resize.crop) resizeTransform.crop = transformations.resize.crop;
      transformArray.push(resizeTransform);
    }

    // Effects transformation
    if (transformations.effects) {
      const effectsArray: string[] = [];
      if (transformations.effects.brightness) {
        effectsArray.push(`brightness:${transformations.effects.brightness}`);
      }
      if (transformations.effects.contrast) {
        effectsArray.push(`contrast:${transformations.effects.contrast}`);
      }
      if (transformations.effects.saturation) {
        effectsArray.push(`saturation:${transformations.effects.saturation}`);
      }
      if (effectsArray.length > 0) {
        transformArray.push({ effect: effectsArray.join(':') });
      }
    }

    // Filters
    if (transformations.filters && transformations.filters.length > 0) {
      transformations.filters.forEach(filter => {
        switch (filter) {
          case 'grayscale':
            transformArray.push({ effect: 'grayscale' });
            break;
          case 'sepia':
            transformArray.push({ effect: 'sepia' });
            break;
          case 'blur':
            transformArray.push({ effect: 'blur:300' });
            break;
          case 'sharpen':
            transformArray.push({ effect: 'sharpen' });
            break;
          case 'vignette':
            transformArray.push({ effect: 'vignette' });
            break;
        }
      });
    }

    // Rotation
    if (transformations.rotate) {
      transformArray.push({ angle: transformations.rotate });
    }

    // Flip
    if (transformations.flip) {
      switch (transformations.flip) {
        case 'horizontal':
          transformArray.push({ angle: 'hflip' });
          break;
        case 'vertical':
          transformArray.push({ angle: 'vflip' });
          break;
        case 'both':
          transformArray.push({ angle: 'hflip' });
          transformArray.push({ angle: 'vflip' });
          break;
      }
    }

    // Background removal
    if (transformations.removeBackground) {
      transformArray.push({ effect: 'background_removal' });
    }

    // Text overlay
    if (transformations.text) {
      const textConfig: any = {
        overlay: {
          font_family: transformations.text.fontFamily || 'Arial',
          font_size: transformations.text.fontSize || 48,
          text: transformations.text.content,
        },
        color: transformations.text.color?.replace('#', '') || 'FFFFFF',
        gravity: transformations.text.position || 'center',
      };
      transformArray.push(textConfig);
    }

    // Generate URL
    const url = cloudinary.url(publicId, {
      transformation: transformArray,
      secure: true,
    });

    return url;
  }

  /**
   * Delete image from Cloudinary
   */
  static async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      throw new Error(`Cloudinary delete failed: ${error.message}`);
    }
  }

  /**
   * Get image details
   */
  static async getImageDetails(publicId: string): Promise<any> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error: any) {
      throw new Error(`Failed to get image details: ${error.message}`);
    }
  }
}
