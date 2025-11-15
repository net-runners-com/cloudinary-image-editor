import React, { useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { UploadedImage, ImageTransformations } from '../types/image.types';
import { buildCloudinaryUrl } from '../utils/cloudinary';

interface PreviewPanelProps {
  image: UploadedImage | null;
  transformations: ImageTransformations;
  onDownload: () => void;
  isDownloading: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  image,
  transformations,
  onDownload,
  isDownloading,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      const url = buildCloudinaryUrl(image.publicId, transformations);
      setPreviewUrl(url);
    }
  }, [image, transformations]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!image) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No image uploaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Preview Area */}
      <div className="flex-1 bg-gray-50 rounded-lg p-4 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={previewUrl || image.url}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded"
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      {/* Image Info */}
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Format:</span>
            <span className="ml-2 font-medium">{image.format.toUpperCase()}</span>
          </div>
          <div>
            <span className="text-gray-500">Size:</span>
            <span className="ml-2 font-medium">
              {(image.bytes / 1024).toFixed(1)} KB
            </span>
          </div>
          <div>
            <span className="text-gray-500">Dimensions:</span>
            <span className="ml-2 font-medium">
              {image.width} × {image.height}
            </span>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-5 w-5 mr-2" />
            Download Image
          </>
        )}
      </button>
    </div>
  );
};
