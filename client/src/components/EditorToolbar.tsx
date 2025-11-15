import React from 'react';
import { ImageTransformations } from '../types/image.types';
import { Crop, Wand2, RotateCw, Eraser, Type } from 'lucide-react';

interface EditorToolbarProps {
  transformations: ImageTransformations;
  onTransformationChange: (transformations: ImageTransformations) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  transformations,
  onTransformationChange,
}) => {
  const [activeTab, setActiveTab] = React.useState<'resize' | 'effects' | 'filters' | 'rotate' | 'bg-remove'>('resize');

  const handleResizeChange = (key: string, value: any) => {
    onTransformationChange({
      ...transformations,
      resize: {
        ...transformations.resize,
        [key]: value,
      },
    });
  };

  const handleEffectChange = (key: string, value: number) => {
    onTransformationChange({
      ...transformations,
      effects: {
        ...transformations.effects,
        [key]: value,
      },
    });
  };

  const handleFilterToggle = (filter: 'grayscale' | 'sepia' | 'blur' | 'sharpen' | 'vignette') => {
    const currentFilters = transformations.filters || [];
    const newFilters = currentFilters.includes(filter)
      ? currentFilters.filter(f => f !== filter)
      : [...currentFilters, filter];
    
    onTransformationChange({
      ...transformations,
      filters: newFilters,
    });
  };

  const handleRotate = (angle: number) => {
    onTransformationChange({
      ...transformations,
      rotate: angle,
    });
  };

  const handleBackgroundRemove = (remove: boolean) => {
    onTransformationChange({
      ...transformations,
      removeBackground: remove,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('resize')}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'resize' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Crop className="h-4 w-4 mr-2" />
          Resize
        </button>
        <button
          onClick={() => setActiveTab('effects')}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'effects' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Effects
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'filters' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Filters
        </button>
        <button
          onClick={() => setActiveTab('rotate')}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'rotate' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          Rotate
        </button>
        <button
          onClick={() => setActiveTab('bg-remove')}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'bg-remove' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Eraser className="h-4 w-4 mr-2" />
          BG Remove
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'resize' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="number"
                value={transformations.resize?.width || ''}
                onChange={(e) => handleResizeChange('width', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="number"
                value={transformations.resize?.height || ''}
                onChange={(e) => handleResizeChange('height', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Mode</label>
              <select
                value={transformations.resize?.crop || 'fill'}
                onChange={(e) => handleResizeChange('crop', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fill">Fill</option>
                <option value="fit">Fit</option>
                <option value="scale">Scale</option>
                <option value="crop">Crop</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness: {transformations.effects?.brightness || 0}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={transformations.effects?.brightness || 0}
                onChange={(e) => handleEffectChange('brightness', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contrast: {transformations.effects?.contrast || 0}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={transformations.effects?.contrast || 0}
                onChange={(e) => handleEffectChange('contrast', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saturation: {transformations.effects?.saturation || 0}
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={transformations.effects?.saturation || 0}
                onChange={(e) => handleEffectChange('saturation', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="grid grid-cols-2 gap-3">
            {(['grayscale', 'sepia', 'blur', 'sharpen', 'vignette'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterToggle(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  transformations.filters?.includes(filter)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="grid grid-cols-2 gap-3">
            {[0, 90, 180, 270].map((angle) => (
              <button
                key={angle}
                onClick={() => handleRotate(angle)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  transformations.rotate === angle
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {angle}°
              </button>
            ))}
          </div>
        )}

        {activeTab === 'bg-remove' && (
          <div>
            <button
              onClick={() => handleBackgroundRemove(!transformations.removeBackground)}
              className={`w-full px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                transformations.removeBackground
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {transformations.removeBackground ? 'Background Removed' : 'Remove Background'}
            </button>
            <p className="mt-2 text-xs text-gray-500 text-center">
              AI-powered background removal
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
