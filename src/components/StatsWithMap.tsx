'use client';

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/map.css";

export default function StatsWithMap() {
  const { t } = useLanguage();

  const locations = [
    { name: "DA NANG", top: "54%", left: "74.5%", icon: "default" },
    { name: "SA PA", top: "14.5%", left: "58.5%", icon: "default" },
    { name: "QUANG NINH", top: "22%", left: "71%", icon: "default" },
    { name: "HA NOI", top: "25%", left: "65.5%", icon: "star" },
    { name: "PHU QUOC", top: "84%", left: "59.7%", icon: "default" },
    { name: "HAI PHONG", top: "23.5%", left: "69%", icon: "default" },
    { name: "HAI DUONG", top: "25%", left: "68%", icon: "default" },
    { name: "PHU THO", top: "22.5%", left: "62%", icon: "default" },
    { name: "KHANH HOA", top: "76%", left: "77%", icon: "default" },
    { name: "VUNG TAU", top: "86%", left: "68%", icon: "default" },
    { name: "QUANG TRI", top: "42%", left: "68%", icon: "default" }
  ];

  const islands = [
    { name: "QD.Hoang Sa", bottom: "38%", right: "7%" },
    { name: "QD.Truong Sa", right: "5%", bottom: "10%" }
  ];

  const getIconSrc = (iconType: string) => {
    switch (iconType) {
      case "cabin":
        return "https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/asset/SunGroup/map-icon/icon-cabin.svg";
      case "star":
        return "https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/asset/SunGroup/map-icon/icon-star.svg";
      case "default":
      default:
        return "/images/icon-map.svg";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4" data-aos="fade-up" data-aos-delay="100">
            {t('map.title')}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {t('map.description')}
          </p>
        </div>
      </div>

      <div className="w-full relative">
        {/* Map - Full width */}
        <div className="w-full map relative" data-aos="zoom-in" data-aos-delay="200">
          <div className="--img relative w-full">
            <Image 
              src="/images/home-page/img-map.webp" 
              alt="Vietnam Map" 
              width={1200} 
              height={800}
              className="w-full h-auto"
            />
            
            <div className="marker absolute inset-0">
              {locations.map((location) => (
                <div
                  key={location.name}
                  className="--item absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    top: location.top,
                    left: location.left
                  }}
                  data-icon={location.icon}
                  data-name={location.name}
                >
                    <div className="relative">
                      <div className="w-6 h-6 bg-[#bb252d] rounded-full border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="--name absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-md transition-opacity duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
                        {location.name}
                      </span>
                    </div>
                </div>
              ))}
              {islands.map((island) => (
                <div
                  key={island.name}
                  className="--item island absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    bottom: island.bottom,
                    right: island.right
                  }}
                >
                  <span className="--name px-3 py-1 bg-blue-600 text-white text-xs rounded-md opacity-100 whitespace-nowrap">
                    {island.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="line absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                <path 
                  d="M 74.5 24 Q 78 39 89.5 52" 
                  stroke="url(#gradient1)" 
                  strokeWidth="0.2" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 77 20 80 22"
                  stroke="url(#gradient1)" 
                  strokeWidth="0.2" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 76.5 21 79 23.4" 
                  stroke="url(#gradient1)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 78 19 83 21" 
                  stroke="url(#gradient2)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 68 18 63 13" 
                  stroke="url(#gradient3)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 71 20 69 21" 
                  stroke="url(#gradient5)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 84 49 94 75" 
                  stroke="url(#gradient9)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 76 33 79 41" 
                  stroke="url(#gradient11)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 75 55 79 85" 
                  stroke="url(#gradient12)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                <path 
                  d="M 74.5 24 Q 69 53 65 82" 
                  stroke="url(#gradient13)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                />
                
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient11" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient12" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                  <linearGradient id="gradient13" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#FFB366" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Statistics and Distribution Cards - Overlay left - Only on desktop */}
        <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full flex items-center z-10">
          <div className="w-full h-full px-8 py-8 overflow-visible flex flex-col justify-center">
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Statistics */}
                <div className="space-y-8">
                  {/* First Stat */}
                  <div className="space-y-3">
                    <div className="text-6xl lg:text-8xl font-black text-[#bb252d] leading-none">
                      500
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl lg:text-4xl font-bold text-muted-foreground">
                        {t('stats.employees')}
                      </p>
                      <p className="text-xl text-muted-foreground/70">
                        {t('stats.coverage')}
                      </p>
                    </div>
                  </div>

                  {/* Second Stat */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-6xl lg:text-8xl font-black text-[#bb252d] leading-none">
                      100
                    </span>
                    <span className="text-4xl lg:text-5xl font-bold text-[#bb252d]">
                      {t('stats.million')}
                    </span>
                    <span className="text-3xl lg:text-4xl font-bold text-muted-foreground whitespace-nowrap">
                      {t('stats.population')}
                    </span>
                  </div>
                </div>

                {/* Distribution Cards */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                    {t('stats.distribution.title')}
                  </h3>
                  {[
                    { id: "mt", label: t('stats.distribution.mt') },
                    { id: "gt", label: t('stats.distribution.gt') },
                    { id: "showroom", label: t('stats.distribution.showroom') },
                    { id: "chuyen-biet", label: t('stats.distribution.specialty') },
                    { id: "b2b", label: t('stats.distribution.b2b') },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="group px-6 py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur rounded-[3rem_0rem_3rem_0rem] relative overflow-hidden"
                    >
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-bl-full"></div>
                      
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-muted-foreground group-hover:text-[#bb252d] transition-colors">
                          {item.label}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}