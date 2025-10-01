'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

type ServiceItem = {
  title: string;
  summary: string;
  bullets: string[];
  image: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: 'Thực phẩm',
    summary:
      'Hệ sinh thái toàn diện từ nhập khẩu độc quyền, sản xuất nội địa đến phân phối hàng tiêu dùng cao cấp.',
    bullets: [
      'Nhập khẩu độc quyền và phân phối các thương hiệu quốc tế như Choco Samjin (Hàn Quốc), sữa yến mạch Boring (New Zealand).',
      'Sản xuất nội địa thực phẩm chất lượng cao qua các công ty thành viên: Thiên Thuận Phát, Ecobin, Bách Mộc An và KangNam.',
      'Hệ thống phân phối rộng khắp, đảm bảo nguồn gốc xuất xứ và tiêu chuẩn vệ sinh an toàn thực phẩm.',
    ],
    image:
      'https://images.unsplash.com/photo-1726160183083-de85fe0879d4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Hóa - Mỹ phẩm nhập khẩu',
    summary:
      'Phát triển và phân phối các thương hiệu mỹ phẩm thiên nhiên cao cấp từ châu Âu.',
    bullets: [
      'Biofresh – thương hiệu mỹ phẩm thiên nhiên đến từ Bulgaria với dấu ấn khác biệt trên thị trường Việt Nam.',
      'Sản phẩm chăm sóc da, chăm sóc cá nhân từ nguyên liệu thiên nhiên, an toàn và hiệu quả.',
      'Phân phối đa kênh: hệ thống bán lẻ, siêu thị và thương mại điện tử.',
    ],
    image:
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Đồ uống',
    summary:
      'Nhập khẩu và phân phối các dòng đồ uống cao cấp từ các thương hiệu quốc tế uy tín.',
    bullets: [
      'Đa dạng sản phẩm: nước giải khát, nước trái cây, sữa hạt, cà phê và trà cao cấp.',
      'Nguồn cung ổn định từ các đối tác quốc tế, cập nhật xu hướng đồ uống mới.',
      'Hệ thống phân phối chuyên nghiệp, đảm bảo chất lượng từ kho đến người tiêu dùng.',
    ],
    image:
      'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const rotationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const ROTATION_MS = 10000;

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    setCurrentImageIndex(index);
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
    }
    rotationIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % SERVICES.length;
        setCurrentImageIndex(next);
        return next;
      });
    }, ROTATION_MS);
  };

  const topPercent = currentImageIndex === 0 ? 24 : currentImageIndex === 1 ? 50 : 76;

  // Start rotation only when section is in viewport; reset to first item on start
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const startRotation = () => {
      // reset to first
      setActiveIndex(0);
      setCurrentImageIndex(0);
      if (rotationIntervalRef.current) clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % SERVICES.length;
          setCurrentImageIndex(next);
          return next;
        });
      }, ROTATION_MS);
    };

    const stopRotation = () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startRotation();
          } else {
            stopRotation();
          }
        });
      },
      { root: null, threshold: 0.3 }
    );

    io.observe(node);

    return () => {
      io.disconnect();
      stopRotation();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animation="slide-up" delay={0}>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-10 text-center">
              Dịch vụ của chúng tôi
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" delay={100}>
            <div className="w-full flex flex-col lg:flex-row justify-between gap-9 pb-[80px]">
              <ScrollAnimation animation="slide-up" delay={100} className="w-full lg:w-1/2">
                <div className="relative flex flex-col gap-8 justify-between w-full pl-4 lg:pl-10 h-[600px] xl:h-[700px]">

                  {SERVICES.map((service, index) => {
                    const isActive = activeIndex === index;
                    const neutralText = index === 0 || index === 2;
                    return (
                      <div
                        key={service.title}
                        className={`w-full relative flex flex-col gap-3 lg:gap-5 transition-all cursor-pointer pl-3 lg:pl-4 ${neutralText ? 'text-gray-500' : ''
                          } ${index === 0 ? 'justify-start' : index === 1 ? '' : 'justify-end'} ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                          } ${isActive ? 'text-black' : ''}`}
                        onClick={() => handleActivate(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleActivate(index);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div
                          className={`absolute left-0 top-0 h-full w-[2px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'bg-black' : 'bg-gray-200'
                            }`}
                        ></div>
                        <h3 className={`text-xl mb-0 ${isActive ? 'font-semibold text-black' : 'font-semibold'}`}>{service.title}</h3>
                        <div className="flex flex-col gap-3 text-sm lg:text-base">
                          <span className={isActive ? 'text-black font-normal' : ''}>{service.summary}</span>
                          <div className={`flex flex-col gap-2 mt-2 ${isActive ? '' : 'hidden'}`}>
                            {service.bullets.map((b, i) => (
                              <div key={i} className={`flex gap-2 items-start ${isActive ? 'font-normal text-black' : ''}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  className="shrink-0 mt-[2px]"
                                >
                                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                  <path stroke="#fff" strokeWidth="1.5" d="M4 7.222 6.857 10 12 5"></path>
                                </svg>
                                {b}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-up" delay={200} className="w-full lg:w-1/2">
                <div className="group w-full h-[600px] xl:h-[700px] relative rounded-[8rem_0rem_8rem_0rem] overflow-hidden bg-[#0B0F1A]">
                  {useFallback && (
                    <div className="absolute inset-0">
                      <div
                        className="absolute -left-20 -top-20 w-[60%] h-[60%] rounded-full blur-3xl opacity-50"
                        style={{ background: 'linear-gradient(135deg,#FDE68A,#F59E0B)' }}
                      ></div>
                      <div
                        className="absolute -right-24 -bottom-24 w-[65%] h-[65%] rounded-full blur-3xl opacity-50"
                        style={{ background: 'linear-gradient(135deg,#93C5FD,#2563EB)' }}
                      ></div>
                    </div>
                  )}
                  {SERVICES.map((s, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={s.image}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className={`object-cover w-full h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 ${i === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
                        } group-hover:scale-[1.04]`}
                      src={s.image}
                      style={{ position: 'absolute', inset: 0, color: 'transparent' }}
                      draggable={false}
                      onError={() => setUseFallback(true)}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}


