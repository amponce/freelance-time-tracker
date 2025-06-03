import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Screenshot } from '../types';

interface ScreenshotUploaderProps {
  screenshots: Screenshot[];
  onAddScreenshot: (screenshot: Screenshot) => void;
  onRemoveScreenshot: (id: string) => void;
}

const ScreenshotUploader: React.FC<ScreenshotUploaderProps> = ({
  screenshots,
  onAddScreenshot,
  onRemoveScreenshot
}) => {
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const newScreenshot: Screenshot = {
          id: Date.now().toString(),
          dataUrl: event.target.result as string,
          caption: caption || file.name,
          timestamp: new Date()
        };
        onAddScreenshot(newScreenshot);
        setCaption('');
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      console.error('Error reading file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Work Screenshots</h2>
      
      <div className="mb-4">
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
          Screenshot Caption
        </label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe this screenshot"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Screenshot
        </label>
        <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        {isUploading && (
          <p className="mt-2 text-sm text-blue-500">Uploading...</p>
        )}
      </div>
      
      {screenshots.length > 0 && (
        <div>
          <h3 className="text-md font-medium mb-2">Uploaded Screenshots</h3>
          <div className="grid grid-cols-2 gap-4">
            {screenshots.map((screenshot) => (
              <div key={screenshot.id} className="relative group">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-gray-100">
                  <img 
                    src={screenshot.dataUrl} 
                    alt={screenshot.caption}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-xs text-gray-500 truncate">{screenshot.caption}</p>
                  <button
                    onClick={() => onRemoveScreenshot(screenshot.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotUploader;
