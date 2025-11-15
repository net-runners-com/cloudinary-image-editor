import { useState, useCallback } from 'react';
import { imageApi } from '../utils/api';
import { ImageData, TransformOptions } from '../types/image.types';
import { useImageContext } from '../contexts/ImageContext';

export const useImageEditor = () => {
  const {
    originalImage,
    setOriginalImage,
    transformedUrl,
    setTransformedUrl,
    transformations,
    setTransformations,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useImageContext();

  const uploadImage = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await imageApi.uploadImage(file);

      if (response.success && response.data) {
        setOriginalImage(response.data);
        setTransformedUrl(response.data.secureUrl);
        setTransformations({});
      } else {
        setError(response.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  }, [setOriginalImage, setTransformedUrl, setTransformations, setIsLoading, setError]);

  const applyTransformations = useCallback(async (newTransformations: TransformOptions) => {
    if (!originalImage) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await imageApi.transformImage(originalImage.publicId, newTransformations);

      if (response.success && response.data) {
        setTransformedUrl(response.data.secureUrl);
        setTransformations(newTransformations);
      } else {
        setError(response.error || 'Transformation failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Transformation failed');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, setTransformedUrl, setTransformations, setIsLoading, setError]);

  const resetImage = useCallback(() => {
    setOriginalImage(null);
    setTransformedUrl(null);
    setTransformations({});
    setError(null);
  }, [setOriginalImage, setTransformedUrl, setTransformations, setError]);

  return {
    originalImage,
    transformedUrl,
    transformations,
    isLoading,
    error,
    uploadImage,
    applyTransformations,
    resetImage,
  };
};
