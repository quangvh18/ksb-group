'use client';

import { useState } from 'react';

interface PartnerLogoProps {
  src: string;
  alt: string;
  fallback?: string;
}

export default function PartnerLogo({ src, alt, fallback }: PartnerLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.log('Image failed to load:', src);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 text-xs font-medium mb-1">
            {alt}
          </div>
          <div className="text-gray-300 text-[10px]">
            Logo đối tác
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-20 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
          <div className="text-gray-400 text-xs">Đang tải...</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ maxWidth: '120px', maxHeight: '80px' }}
      />
    </div>
  );
}
