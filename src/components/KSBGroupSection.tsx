'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function KSBGroupSection() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const animationRef = useRef<number | null>(null);
  const isScrollingRef = useRef<boolean>(false);
  const savedScrollPosition = useRef<number>(0);

  // Hàm cuộn mượt với easing tối ưu và debounce
  const handleScroll = (direction: 'left' | 'right') => {
    // Ngăn chặn click liên tục khi đang scroll
    if (isScrollingRef.current) return;
    
    if (scrollContainerRef.current) {
      isScrollingRef.current = true;
      const container = scrollContainerRef.current;
      const cardWidth = 320; // Width của mỗi card + gap
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      const targetScroll =
        direction === 'right'
          ? Math.min(currentScroll + cardWidth, maxScroll)
          : Math.max(currentScroll - cardWidth, 0);

      const start = currentScroll;
      const distance = targetScroll - start;
      const duration = 350; // Tối ưu thời gian

      // Hủy animation cũ nếu có
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Sử dụng easeInCubic - bắt đầu chậm rồi tăng tốc dần
        const easeInCubic = Math.pow(progress, 3);

        if (container) {
          container.scrollLeft = start + distance * easeInCubic;
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          animationRef.current = null;
          isScrollingRef.current = false; // Cho phép scroll tiếp
        }
      };

      animationRef.current = requestAnimationFrame(step);
    }
  };

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
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                    <button className="w-8 h-8 sm:w-10 sm:h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors touch-manipulation">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
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
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                    <button className="w-8 h-8 sm:w-10 sm:h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors touch-manipulation">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
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
                  <div className="absolute bottom-6 left-6">
                    <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
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
                  <div className="absolute bottom-6 left-6">
                    <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Thêm các card mới để có thể cuộn */}
              {/* Logistics & Vận chuyển Card */}
              <div className="relative bg-white rounded-[3.5rem_0.75rem_3.5rem_0.75rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="500">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1541417904950-b855846fe074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{t('ksbgroup.logistics.title')}</h3>
                    <p className="text-white text-sm leading-relaxed">
                      {t('ksbgroup.logistics.desc')}
                    </p>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
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
                    <h3 className="text-2xl font-bold text-white mb-2">CÔNG NGHỆ</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Ứng dụng công nghệ, mở rộng hệ sinh thái. Nâng tầm trải nghiệm, dẫn dắt chuyển đổi số.
                    </p>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Arrows overlay, cố định theo viewport của vùng cuộn */}
          <button
            onClick={() => handleScroll('left')}
            disabled={!showLeftArrow}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${!showLeftArrow ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:opacity-100 hover:scale-105'
              }`}
            style={{ backgroundColor: '#d2d2d7a3' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-12 h-12 text-[#636363]">
              <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z" fill="currentColor"></path>
            </svg>
          </button>

          <button
            onClick={() => handleScroll('right')}
            disabled={!showRightArrow}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${!showRightArrow ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:opacity-100 hover:scale-105'
              }`}
            style={{ backgroundColor: '#d2d2d7a3' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-12 h-12 text-[#636363]">
              <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
