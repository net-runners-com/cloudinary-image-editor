import axios from 'axios';
import { UploadResponse, TransformResponse, TransformOptions } from '../types/image.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imageApi = {
  /**
   * Upload image to server
   */
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadResponse>(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Transform image with given options
   */
  transformImage: async (publicId: string, transformations: TransformOptions): Promise<TransformResponse> => {
    const response = await api.post<TransformResponse>('/transform', {
      publicId,
      transformations,
    });

    return response.data;
  },

  /**
   * Delete image from Cloudinary
   */
  deleteImage: async (publicId: string): Promise<void> => {
    await api.delete(`/images/${publicId}`);
  },

  /**
   * Get image details
   */
  getImageDetails: async (publicId: string): Promise<any> => {
    const response = await api.get(`/images/${publicId}`);
    return response.data;
  },
};

export default api;
