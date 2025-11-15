import { ImageTransformations } from '../types/image.types';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Build Cloudinary transformation URL
 */
export const buildCloudinaryUrl = (
  publicId: string,
  transformations: ImageTransformations = {}
): string => {
  if (!CLOUD_NAME) {
    console.error('VITE_CLOUDINARY_CLOUD_NAME is not defined');
    return '';
  }

  const transformParts: string[] = [];

  // Resize transformation
  if (transformations.resize) {
    const resizeParts: string[] = [];
    if (transformations.resize.width) resizeParts.push(`w_${transformations.resize.width}`);
    if (transformations.resize.height) resizeParts.push(`h_${transformations.resize.height}`);
    if (transformations.resize.crop) resizeParts.push(`c_${transformations.resize.crop}`);
    if (resizeParts.length > 0) transformParts.push(resizeParts.join(','));
  }

  // Effects
  if (transformations.effects) {
    if (transformations.effects.brightness) {
      transformParts.push(`e_brightness:${transformations.effects.brightness}`);
    }
    if (transformations.effects.contrast) {
      transformParts.push(`e_contrast:${transformations.effects.contrast}`);
    }
    if (transformations.effects.saturation) {
      transformParts.push(`e_saturation:${transformations.effects.saturation}`);
    }
  }

  // Filters
  if (transformations.filters && transformations.filters.length > 0) {
    transformations.filters.forEach((filter) => {
      switch (filter) {
        case 'grayscale':
          transformParts.push('e_grayscale');
          break;
        case 'sepia':
          transformParts.push('e_sepia');
          break;
        case 'blur':
          transformParts.push('e_blur:300');
          break;
        case 'sharpen':
          transformParts.push('e_sharpen');
          break;
        case 'vignette':
          transformParts.push('e_vignette');
          break;
      }
    });
  }

  // Rotation
  if (transformations.rotate) {
    transformParts.push(`a_${transformations.rotate}`);
  }

  // Flip
  if (transformations.flip) {
    switch (transformations.flip) {
      case 'horizontal':
        transformParts.push('a_hflip');
        break;
      case 'vertical':
        transformParts.push('a_vflip');
        break;
      case 'both':
        transformParts.push('a_hflip,a_vflip');
        break;
    }
  }

  // Background removal
  if (transformations.removeBackground) {
    transformParts.push('e_background_removal');
  }

  // Text overlay
  if (transformations.text) {
    const textParts: string[] = [];
    const text = encodeURIComponent(transformations.text.content);
    const fontSize = transformations.text.fontSize || 48;
    const color = (transformations.text.color || '#FFFFFF').replace('#', '');
    const fontFamily = transformations.text.fontFamily || 'Arial';
    const position = transformations.text.position || 'center';

    textParts.push(`l_text:${fontFamily}_${fontSize}:${text}`);
    textParts.push(`co_rgb:${color}`);
    textParts.push(`g_${position}`);
    
    transformParts.push(textParts.join(','));
  }

  // Build final URL
  const transformString = transformParts.length > 0 ? `/${transformParts.join('/')}/` : '/';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload${transformString}${publicId}`;
};

/**
 * Download file from URL
 */
export const downloadFileFromUrl = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
