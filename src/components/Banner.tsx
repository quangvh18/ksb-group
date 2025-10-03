'use client';

import { useEffect, useRef } from 'react';

export default function Banner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      
      video.play().catch(() => {
      });
    } else {
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        controls={false}
        style={{ zIndex: 0 }}
        onError={(e) => {
          console.error('Video failed to load:', e);
        }}
      >
        <source src="/videos/homepage-video.mp4" type="video/mp4" />
      </video>
      
      {/* SEO-friendly content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            KSB Group
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 opacity-90">
            Hệ sinh thái kinh doanh bền vững
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững
          </p>
        </div>
      </div>
    </section>
  );
}
