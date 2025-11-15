export interface UploadedImage {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export interface ImageTransformations {
  resize?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  };
  effects?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
  filters?: Array<'grayscale' | 'sepia' | 'blur' | 'sharpen' | 'vignette'>;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
  removeBackground?: boolean;
  text?: {
    content: string;
    fontSize?: number;
    color?: string;
    position?: 'north' | 'south' | 'east' | 'west' | 'center' | 'north_east' | 'north_west' | 'south_east' | 'south_west';
    fontFamily?: string;
  };
}

export interface TransformRequest {
  publicId: string;
  transformations: ImageTransformations;
}

export interface TransformResponse {
  success: boolean;
  data?: {
    url: string;
    secureUrl: string;
  };
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  data?: UploadedImage;
  error?: string;
}
