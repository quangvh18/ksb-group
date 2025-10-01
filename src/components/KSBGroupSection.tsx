'use client';

import { useState, useRef, useEffect } from 'react';

export default function KSBGroupSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Hàm cuộn mượt với easing (cải thiện) + hủy animation cũ nếu đang chạy
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Cuộn 80% chiều rộng
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      const targetScroll =
        direction === 'right'
          ? Math.min(currentScroll + scrollAmount, maxScroll)
          : Math.max(currentScroll - scrollAmount, 0);

      const start = currentScroll;
      const distance = targetScroll - start;
      const duration = 600; // Tăng thời gian lên 600ms cho mượt hơn

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Sử dụng easeOutQuart để mượt mà hơn
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        if (container) {
          container.scrollLeft = start + distance * easeOutQuart;
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        }
      };

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
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

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
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
  return (
    <section className="ksb-summary py-20 bg-gray-50 relative">
      <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
        <div className="mb-6 md:mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
            KSB Group
          </h2>
          <p className="text-muted-foreground text-base text-center">
            Khám phá hệ sinh thái và lĩnh vực hoạt động của KSB Group.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing relative"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollSnapType: 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              willChange: 'scroll-position'
            }}
          >

            <div className="flex space-x-6 py-8 w-max items-center">
              {/* F&B Card */}
              <div className="relative bg-white rounded-[3.5rem_0.75rem_3.5rem_0.75rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="100">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">F&B</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Nhập khẩu & phân phối F&B chất lượng cao. Đối tác quốc tế: Hàn Quốc, Đài Loan, Pháp, Ba Lan, Đức, New Zealand. Dẫn đầu xu hướng ẩm thực.
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

              {/* Hóa - Mỹ phẩm Card */}
              <div className="relative bg-white rounded-[0.75rem_3.5rem_0.75rem_3.5rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="200">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">HÓA - MỸ PHẨM</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Chăm sóc sức khỏe & làm đẹp. Đối tác quốc tế: Biofresh (Bulgaria), Trung Quốc. Cam kết chất lượng bền vững.
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

              {/* Sản xuất - Phân phối Card */}
              <div className="relative bg-white rounded-[3.5rem_0.75rem_3.5rem_0.75rem] shadow-[0_3px_10px_-6px_rgba(0,0,0,0.15),0_1px_4px_-2px_rgba(0,0,0,0.08)] w-[300px] flex-shrink-0 overflow-hidden group snap-start hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.2),0_6px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-delay="300">
                <div
                  className="h-[28rem] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60')]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">SẢN XUẤT</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Sản xuất hiện đại, phân phối thực phẩm phủ toàn quốc. Kiến tạo chuỗi cung ứng hiệu quả, tin cậy.
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
                    <h3 className="text-2xl font-bold text-white mb-2">TIÊU DÙNG</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Hàng tiêu dùng nhập khẩu: Choco Samjin, Boring Oat Milk. Trải nghiệm khác biệt cho người tiêu dùng Việt.
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
                    <h3 className="text-2xl font-bold text-white mb-2">LOGISTICS</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Logistics đồng bộ, tối ưu dòng chảy thương mại. Kết nối giá trị – lan tỏa niềm tin.
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
