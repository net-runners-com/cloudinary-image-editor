import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImageData, TransformOptions } from '../types/image.types';

interface ImageContextType {
  originalImage: ImageData | null;
  setOriginalImage: (image: ImageData | null) => void;
  transformedUrl: string | null;
  setTransformedUrl: (url: string | null) => void;
  transformations: TransformOptions;
  setTransformations: (transforms: TransformOptions) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [transformations, setTransformations] = useState<TransformOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{
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
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
