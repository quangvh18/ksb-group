'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function KSBGroupSection() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [, setShowLeftArrow] = useState(true);
  const [, setShowRightArrow] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const animationRef = useRef<number | null>(null);
  const savedScrollPosition = useRef<number>(0);


  // Xử lý drag to scroll (cải thiện)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      setIsMouseDown(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeftPos(scrollContainerRef.current.scrollLeft);
      scrollContainerRef.current.style.scrollBehavior = 'auto'; // Tắt smooth khi drag
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Giảm hệ số xuống 1.5 cho mượt hơn
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  // Lưu vị trí scroll hiện tại
  const saveScrollPosition = () => {
    if (scrollContainerRef.current) {
      savedScrollPosition.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Khôi phục vị trí scroll đã lưu
  const restoreScrollPosition = () => {
    if (scrollContainerRef.current && savedScrollPosition.current > 0) {
      scrollContainerRef.current.scrollLeft = savedScrollPosition.current;
    }
  };

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Lưu vị trí scroll khi user scroll thủ công
      savedScrollPosition.current = scrollLeft;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener('scroll', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  // Lưu vị trí scroll khi resize và khôi phục sau khi layout ổn định
  useEffect(() => {
    const handleResize = () => {
      saveScrollPosition();
      // Khôi phục vị trí sau một chút delay để đảm bảo layout đã ổn định
      setTimeout(() => {
        restoreScrollPosition();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section className="ksb-summary py-12 sm:py-16 md:py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-muted-foreground mb-3 sm:mb-4 md:mb-6 leading-tight">
            {t('ksbgroup.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('ksbgroup.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing relative touch-pan-x"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              willChange: 'transform',
              scrollBehavior: 'smooth'
            }}
          >

            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 py-6 sm:py-8 lg:py-12 w-max items-center">
              {/* F&B Card */}
              <div className="relative bg-white rounded-[2rem_0.5rem_2rem_0.5rem] sm:rounded-[3rem_0.75rem_3rem_0.75rem] lg:rounded-[3.5rem_0.75rem_3.5rem_0.75rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[280px] sm:w-[300px] lg:w-[320px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="100">
                <div
                  className="h-[24rem] sm:h-[26rem] lg:h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">{t('ksbgroup.fnb.title')}</h3>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                      {t('ksbgroup.fnb.desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hóa - Mỹ phẩm Card */}
              <div className="relative bg-white rounded-[0.5rem_2rem_0.5rem_2rem] sm:rounded-[0.75rem_3rem_0.75rem_3rem] lg:rounded-[0.75rem_3.5rem_0.75rem_3.5rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[280px] sm:w-[300px] lg:w-[320px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="200">
                <div
                  className="h-[24rem] sm:h-[26rem] lg:h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">{t('ksbgroup.cosmetics.title')}</h3>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                      {t('ksbgroup.cosmetics.desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sản xuất - Phân phối Card */}
              <div className="relative bg-white rounded-[3.5rem_0.75rem_3.5rem_0.75rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="300">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{t('ksbgroup.food.title')}</h3>
                    <p className="text-white text-sm leading-relaxed">
                      {t('ksbgroup.food.desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hàng tiêu dùng Card */}
              <div className="relative bg-white rounded-[0.75rem_3.5rem_0.75rem_3.5rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="400">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{t('ksbgroup.consumer.title')}</h3>
                    <p className="text-white text-sm leading-relaxed">
                      {t('ksbgroup.consumer.desc')}
                    </p>
                  </div>
                </div>
              </div>


              {/* Công nghệ & Đổi mới Card */}
              <div className="relative bg-white rounded-[0.75rem_3.5rem_0.75rem_3.5rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="600">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{t('ksbgroup.technology.title')}</h3>
                    <p className="text-white text-sm leading-relaxed">
                      {t('ksbgroup.technology.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>
    </section>
  );
}
