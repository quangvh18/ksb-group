'use client';

import { Target, Heart, Eye } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const MissionVisionValues = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-20 md:py-28 bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-100" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center" data-aos="fade">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#bb252d]/10 to-orange-500/10 p-4" data-aos="fade" data-aos-delay="200">
              <Target className="h-10 w-10 text-[#bb252d]" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl" data-aos="fade" data-aos-delay="300">
              {t('about.mission_values_vision.title')}
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-transparent via-[#bb252d] to-transparent" data-aos="fade" data-aos-delay="400" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 - Mission */}
            <div className="group relative" data-aos="fade" data-aos-delay="100">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[3rem_0rem_3rem_0rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-[#bb252d]/20" style={{boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)'}}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#bb252d]/20 to-orange-500/20">
                    <Target className="h-7 w-7 text-[#bb252d]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{t('about.mission.title')}</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  {t('about.mission.content')}
                </p>
              </div>
            </div>

            {/* Card 2 - Values */}
            <div className="group relative" data-aos="fade" data-aos-delay="200">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[0rem_3rem_0rem_3rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[0rem_3rem_0rem_3rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-[#bb252d]/20" style={{boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)'}}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#bb252d]/20 to-orange-500/20">
                    <Heart className="h-7 w-7 text-[#bb252d]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{t('about.values.title')}</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  {t('about.values.content')}
                </p>
              </div>
            </div>

            {/* Card 3 - Vision */}
            <div className="group relative" data-aos="fade" data-aos-delay="300">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[3rem_0rem_3rem_0rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-[#bb252d]/20" style={{boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)'}}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#bb252d]/20 to-orange-500/20">
                    <Eye className="h-7 w-7 text-[#bb252d]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{t('about.vision.title')}</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  {t('about.vision.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
