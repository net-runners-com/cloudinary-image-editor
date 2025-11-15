import axios from 'axios';
import { UploadResponse, TransformRequest, TransformResponse } from '../types/image.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imageAPI = {
  /**
   * Upload image to server
   */
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Transform image
   */
  transformImage: async (request: TransformRequest): Promise<TransformResponse> => {
    const response = await api.post('/transform', request);
    return response.data;
  },

  /**
   * Download image
   */
  downloadImage: async (publicId: string, format: string = 'jpg', quality: number = 90): Promise<Blob> => {
    const response = await api.get('/download', {
      params: { publicId, format, quality },
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Delete image
   */
  deleteImage: async (publicId: string): Promise<void> => {
    await api.delete(`/images/${publicId}`);
  },
};
