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
      
    </section>
  );
}
