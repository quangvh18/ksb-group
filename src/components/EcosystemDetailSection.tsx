'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

const EcosystemDetailSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('cosmetics');

  const tabs = [
    { id: 'cosmetics', label: t('ecosystem.services.cosmetics.title') },
    { id: 'food', label: t('ecosystem.services.food.title') },

  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cosmetics':
        return (
          <div className="space-y-8">
            {/* Main Description */}
            <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('ecosystem.services.cosmetics.subtitle')}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{t('ecosystem.services.cosmetics.description')}</p>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
                  <Image
                    src="/images/ecosystem-page/biofest3.webp"
                    alt="Biofresh Cosmetics"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4acb7]/10 to-transparent rounded-[3rem_0rem_3rem_0rem] z-20"></div>
                </div>
              </div>
            </div>

            {/* Biofresh Section */}
            <div className="bg-white rounded-[0rem_3rem_0rem_3rem] p-8 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
              <h4 className="text-xl font-bold text-gray-800 mb-4">{t('ecosystem.services.cosmetics.biofresh.title')}</h4>
              <p className="text-base text-gray-700 leading-relaxed mb-6">{t('ecosystem.services.cosmetics.biofresh.description')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Image
                    src="/images/ecosystem-page/biofest.webp"
                    alt="Biofresh Store"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/images/ecosystem-page/biofest_new.webp"
                    alt="Biofresh Products"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('ecosystem.services.cosmetics.products.title')}</h4>
                  <p className="text-base text-gray-700 leading-relaxed">{t('ecosystem.services.cosmetics.products.description')}</p>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-2xl transform translate-x-8 translate-y-8 z-0"></div>
                  <Image
                    src="/images/ecosystem-page/biofest2.webp"
                    alt="Rose of Bulgaria Products"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4acb7]/10 to-transparent rounded-2xl z-20"></div>
                </div>
              </div>
            </div>

          </div>
        );

      case 'food':
        return (
          <div className="space-y-8">
            {/* Main Description */}
            <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('ecosystem.services.food.subtitle')}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{t('ecosystem.services.food.description')}</p>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
                  <Image
                    src="/images/ecosystem-page/sua-hat.webp"
                    alt="Food Production"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4acb7]/10 to-transparent rounded-[3rem_0rem_3rem_0rem] z-20"></div>
                </div>
              </div>
            </div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TTP */}
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.ttp.title')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.ttp.description')}</p>
                <div className="mt-4">
                  <Image
                    src="/images/ecosystem-page/21.webp"
                    alt="Choco Samjin Products"
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>

              {/* Ecobin */}
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.ecobin.title')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.ecobin.description')}</p>
                <div className="mt-4">
                  <Image
                    src="/images/ecosystem-page/22.webp"
                    alt="Ecobin Products"
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>

              {/* Bach Moc An */}
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.bachmocan.title')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.bachmocan.description')}</p>
                <div className="mt-4">
                  <Image
                    src="/images/ecosystem-page/bach-moc-an.webp"
                    alt="Bach Moc An Products"
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>

              {/* KangNam */}
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.kangnam.title')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.kangnam.description')}</p>
                <div className="mt-4">
                  <Image
                    src="/images/ecosystem-page/24.webp"
                    alt="KangNam Products"
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Navigation Tabs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('ecosystem.detail.navigation.title')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-[#bb252d] text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default EcosystemDetailSection;