'use client';

import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

type DetailSection = {
  id: string;
  title: string;
  description: string;
  companies: Array<{
    title: string;
    description: string;
  }>;
};

export default function EcosystemDetailSection() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('cosmetics');

  const sections: DetailSection[] = [
    {
      id: 'cosmetics',
      title: t('ecosystem.services.cosmetics.title'),
      description: t('ecosystem.services.cosmetics.description'),
      companies: [
        {
          title: t('ecosystem.services.cosmetics.biofresh.title'),
          description: t('ecosystem.services.cosmetics.biofresh.desc'),
        },
        {
          title: t('ecosystem.services.cosmetics.products.title'),
          description: t('ecosystem.services.cosmetics.products.desc'),
        },
      ],
    },
    {
      id: 'food',
      title: t('ecosystem.services.food.title'),
      description: t('ecosystem.services.food.description'),
      companies: [
        {
          title: t('ecosystem.services.food.ttp.title'),
          description: t('ecosystem.services.food.ttp.desc'),
        },
        {
          title: t('ecosystem.services.food.ecobin.title'),
          description: t('ecosystem.services.food.ecobin.desc'),
        },
        {
          title: t('ecosystem.services.food.bma.title'),
          description: t('ecosystem.services.food.bma.desc'),
        },
        {
          title: t('ecosystem.services.food.kangnam.title'),
          description: t('ecosystem.services.food.kangnam.desc'),
        },
      ],
    },
    {
      id: 'frozen',
      title: t('ecosystem.services.frozen.title'),
      description: t('ecosystem.services.frozen.description'),
      companies: [
        {
          title: t('ecosystem.services.frozen.summary'),
          description: t('ecosystem.services.frozen.details'),
        },
      ],
    },
  ];

  const currentSection = sections.find(section => section.id === activeSection);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animation="slide-up" delay={0}>
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-muted-foreground mb-3 sm:mb-4 md:mb-6 text-center leading-tight">
                {t('ecosystem.services.title')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
                {t('ecosystem.services.description')}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Navigation */}
            <ScrollAnimation animation="slide-up" delay={100} className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-[2rem_0rem_2rem_0rem] sm:rounded-[3rem_0rem_3rem_0rem] lg:rounded-[4rem_0rem_4rem_0rem] shadow-xl p-4 sm:p-6 lg:p-8 lg:sticky lg:top-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9184a]/20 to-[#a0153a]/20 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#c9184a] to-[#a0153a] rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    {t('ecosystem.detail.navigation.title')}
                  </h3>
                  <nav className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 sm:px-4 lg:px-6 py-3 sm:py-4 rounded-[0.5rem_0rem_0.5rem_0rem] sm:rounded-[1rem_0rem_1rem_0rem] transition-all duration-300 transform hover:scale-105 touch-manipulation ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-[#c9184a]/10 to-[#a0153a]/10 text-[#c9184a] border-l-4 border-[#c9184a] shadow-md'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm'
                        }`}
                      >
                        <div className="font-medium text-sm sm:text-base">{section.title}</div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </ScrollAnimation>

            {/* Content */}
            <ScrollAnimation animation="slide-up" delay={200} className="lg:col-span-2 order-1 lg:order-2">
              {currentSection && (
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Main Card */}
                  <div className="bg-white rounded-[2rem_0rem_2rem_0rem] sm:rounded-[3rem_0rem_3rem_0rem] lg:rounded-[4rem_0rem_4rem_0rem] shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9184a]/20 to-[#a0153a]/20 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#c9184a] to-[#a0153a] rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        {currentSection.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-[0.5rem_0rem_0.5rem_0rem] sm:rounded-[1rem_0rem_1rem_0rem] border-l-4 border-[#c9184a]">
                        {currentSection.description}
                      </p>
                    </div>
                  </div>

                  {/* Company Cards */}
                  <div className="grid gap-4 sm:gap-6">
                    {currentSection.companies.map((company, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-[1rem_0rem_1rem_0rem] sm:rounded-[2rem_0rem_2rem_0rem] shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9184a] to-[#a0153a]"></div>
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#c9184a] to-[#a0153a] rounded-[0.25rem_0rem_0.25rem_0rem] sm:rounded-[0.5rem_0rem_0.5rem_0rem] flex items-center justify-center">
                              <span className="text-white font-bold text-sm sm:text-lg">{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                              {company.title}
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-[#c9184a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </h4>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              {company.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
