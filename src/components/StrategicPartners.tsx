'use client';

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function StrategicPartners() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16" data-aos="fade-up">
      <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black mb-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            {t('partners.strategic.title')}
          </h2>
          <p className="text-base text-gray-700 leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            {t('partners.strategic.subtitle')}
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center justify-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/apart.webp" alt="Apart" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Apart</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/dongnam-medics.webp" alt="Dongnam Medics" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Dongnam Medics</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/fucsia.webp" alt="Tulipán Negro" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Tulipán Negro</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/queen-bin.webp" alt="Queen Bin" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Queen Bin</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/sahmyhook-food.webp" alt="Sahmyhook Foods" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Sahmyhook Foods</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="600">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/samjin-corporation.webp" alt="Samjin Corporation" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Samjin Corporation</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="700">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/seoul_food.webp" alt="Seoul Food" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Seoul Food</div>
            </a>
          </div>
          <div className="item text-center flex flex-col items-center justify-center" data-aos="fade-up" data-aos-duration="600" data-aos-delay="800">
            <a href="#" className="block hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
              <Image src="/images/parters/taewoong-food.webp" alt="Taewoong Food" width={160} height={160} className="w-32 h-32 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Taewoong Food</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
