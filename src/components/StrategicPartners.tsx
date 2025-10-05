'use client';

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function StrategicPartners() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16" data-aos="fade-up">
      <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black mb-6">
            {t('partners.strategic.title')}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('partners.strategic.subtitle')}
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="100">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/2-01.webp" alt="Thương hiệu 1" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 1</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="200">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/4.webp" alt="Thương hiệu 2" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 2</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="300">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/5-01.webp" alt="Thương hiệu 3" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 3</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="400">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/6-01.webp" alt="Thương hiệu 4" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 4</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="500">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/7-01.webp" alt="Thương hiệu 5" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 5</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="600">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/8.webp" alt="Thương hiệu 6" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 6</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="700">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/9-011.webp" alt="Thương hiệu 7" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 7</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="800">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/dongnam1.webp" alt="Thương hiệu 8" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 8</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="900">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/9-01.webp" alt="Thương hiệu 9" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 9</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="1000">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/1-01.webp" alt="Thương hiệu 10" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 10</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
