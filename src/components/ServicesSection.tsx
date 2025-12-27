'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

type ServiceItem = {
  title: string;
  summary: string;
  bullets: string[];
  image: string;
};

// Services data will be generated dynamically based on language

export default function ServicesSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const rotationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const ROTATION_MS = 5000;

  // Generate services data based on current language - recalculate when language changes
  const SERVICES: ServiceItem[] = useMemo(() => [
    {
      title: t('services.cosmetics.title'),
      summary: t('services.cosmetics.summary'),
      bullets: [
        t('services.cosmetics.bullet1'),
        t('services.cosmetics.bullet2'),
        t('services.cosmetics.bullet3'),
      ],
      image: '/images/home-page/my-pham.webp',
    },
    {
      title: t('services.candy.title'),
      summary: t('services.candy.summary'),
      bullets: [
        t('services.candy.bullet1'),
        t('services.candy.bullet2'),
        t('services.candy.bullet3'),
      ],
      image: '/images/home-page/keo.webp?v=2',
    },
    {
      title: t('services.import.title'),
      summary: t('services.import.summary'),
      bullets: [
        t('services.import.bullet1'),
        t('services.import.bullet2'),
        t('services.import.bullet3'),
      ],
      image: '/images/home-page/nhap-khau.jpg',
    },
  ], [t]);

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


  // Reset active index when language changes to force re-render
  useEffect(() => {
    setActiveIndex(0);
    setCurrentImageIndex(0);
  }, [language]);

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
  }, [SERVICES.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animation="slide-up" delay={0}>
            <div className="mb-6 md:mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
                {t('services.title')}
              </h2>
              <p className="text-muted-foreground text-base text-center">
                {t('services.description')}
              </p>
            </div>
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
                        key={`${service.title}-${language}`}
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
                    <Image
                      key={`${s.title}-${i}-${language}`}
                      alt={s.title}
                      fill
                      className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 ${i === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
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


