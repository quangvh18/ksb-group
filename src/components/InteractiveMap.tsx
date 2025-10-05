'use client';

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/map.css";

export default function InteractiveMap() {
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

        <div className="map relative" data-aos="zoom-in" data-aos-delay="200">
          <div className="--img relative">
            <Image 
              src="https://sungroup.com.vn/static/img/img-map.png" 
              alt="Vietnam Map" 
              width={800} 
              height={600}
              className="w-full h-auto"
            />
            
            <div className="marker absolute inset-0">
              {locations.map((location, index) => (
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
                    <Image
                      src={getIconSrc(location.icon)}
                      alt={location.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-125"
                    />
                    <span className="--name absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-md transition-opacity duration-300 whitespace-nowrap">
                      {location.name}
                    </span>
                  </div>
                </div>
              ))}
              {islands.map((island, index) => (
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
                   className="animate-dash"
                 />
                 <path 
                   d="M 74.5 24 Q 77 20 80 22"
                  stroke="url(#gradient1)" 
                  strokeWidth="0.2" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 76.5 21 79 23.4" 
                  stroke="url(#gradient1)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 78 19 83 21" 
                  stroke="url(#gradient2)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 68 18 63 13" 
                  stroke="url(#gradient3)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 71 20 69 21" 
                  stroke="url(#gradient5)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 82 38 90.5 53" 
                  stroke="url(#gradient8)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 84 49 94 75" 
                  stroke="url(#gradient9)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 76 33 79 41" 
                  stroke="url(#gradient11)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 75 55 79 85" 
                  stroke="url(#gradient12)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
                />
                <path 
                  d="M 74.5 24 Q 69 53 65 82" 
                  stroke="url(#gradient13)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.4 0.4"
                  className="animate-dash"
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
      </div>
    </section>
  );
}