import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PreviewPanel } from './components/PreviewPanel';
import { EditorToolbar } from './components/EditorToolbar';
import { UploadedImage, ImageTransformations } from './types/image.types';
import { imageAPI } from './utils/api';
import { buildCloudinaryUrl } from './utils/cloudinary';

function App() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [transformations, setTransformations] = useState<ImageTransformations>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const handleImageUploaded = (image: UploadedImage) => {
    setUploadedImage(image);
    setTransformations({}); // Reset transformations
  };

  const handleDownload = async () => {
    if (!uploadedImage) return;

    setIsDownloading(true);
    try {
      // Generate transformed URL for download
      const transformedUrl = buildCloudinaryUrl(uploadedImage.publicId, transformations);
      
      // Download the image
      const link = document.createElement('a');
      link.href = transformedUrl;
      link.download = `edited-${uploadedImage.publicId.split('/').pop()}.${uploadedImage.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CloudEdit</h1>
              <p className="text-sm text-gray-500">Powerful image editing with Cloudinary</p>
            </div>
            {uploadedImage && (
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setTransformations({});
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
              >
                Upload New Image
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!uploadedImage ? (
          <div className="max-w-2xl mx-auto">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Toolbar */}
            <div className="lg:col-span-1">
              <EditorToolbar
                transformations={transformations}
                onTransformationChange={setTransformations}
              />
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
              <PreviewPanel
                image={uploadedImage}
                transformations={transformations}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Made with ❤️ by netrunners | Powered by Cloudinary
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
