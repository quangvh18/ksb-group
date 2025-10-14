'use client';

import { useEffect, useRef, useState } from 'react';

export default function Banner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detect network connection speed
    interface NetworkInformation {
      effectiveType?: string;
      saveData?: boolean;
    }
    
    const nav = navigator as typeof navigator & {
      connection?: NetworkInformation;
      mozConnection?: NetworkInformation;
      webkitConnection?: NetworkInformation;
    };
    
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (connection) {
      const slowConnectionTypes = ['slow-2g', '2g', '3g'];
      setIsSlowConnection(
        slowConnectionTypes.includes(connection.effectiveType || '') || 
        connection.saveData === true
      );
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true);
          }
        });
      },
      { 
        rootMargin: '100px',
        threshold: 0.1 
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      const video = videoRef.current;
      
      // Load video
      video.load();
      
      // Auto play when ready
      const handleCanPlay = () => {
        video.play().catch(() => {
          // Auto-play was prevented
        });
      };

      video.addEventListener('canplay', handleCanPlay);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [shouldLoadVideo]);

  // Determine preload strategy
  const getPreloadStrategy = () => {
    if (isSlowConnection) return 'none';
    if (isMobile) return 'metadata';
    return 'metadata'; // Changed from 'auto' to save bandwidth
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900"
    >
      {shouldLoadVideo ? (
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted 
          loop 
          playsInline
          preload={getPreloadStrategy()}
          controls={false}
          poster="/images/home-page/home.webp"
          style={{ zIndex: 0 }}
          onError={(e) => {
            console.error('Video failed to load:', e);
          }}
        >
          <source src="/videos/homepage-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(/images/home-page/home.webp)',
            zIndex: 0 
          }}
        />
      )}
    </section>
  );
}
