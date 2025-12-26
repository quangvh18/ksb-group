'use client';

import PageHeader from "../../../components/PageHeader";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function FoodPage() {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.ecosystem'), href: "/ecosystem" },
    { label: t('ecosystem.services.food.title'), isActive: true }
  ];

  return (
    <div>
      <PageHeader
        title={t('ecosystem.services.food.title')}
        description={t('ecosystem.services.food.subtitle')}
        breadcrumbItems={breadcrumbItems}
        bannerImage="/images/ecosystem-page/banner2.webp"
      />
      <main>
        {/* Food Production Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
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
                    <img
                      src="/images/ecosystem-page/sua-hat.webp"
                      alt="Food Production"
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
                    <img
                      src="/images/ecosystem-page/21.webp"
                      alt="Choco Samjin Products"
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>

                {/* Ecobin */}
                <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.ecobin.title')}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.ecobin.description')}</p>
                  <div className="mt-4">
                    <img
                      src="/images/ecosystem-page/22.webp"
                      alt="Ecobin Products"
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>

                {/* Bach Moc An */}
                <div className="bg-white rounded-[0rem_3rem_0rem_3rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.bachmocan.title')}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.bachmocan.description')}</p>
                  <div className="mt-4">
                    <img
                      src="/images/ecosystem-page/bach-moc-an.webp"
                      alt="Bach Moc An Products"
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>

                {/* KangNam */}
                <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-6 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{t('ecosystem.services.food.kangnam.title')}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{t('ecosystem.services.food.kangnam.description')}</p>
                  <div className="mt-4">
                    <img
                      src="/images/ecosystem-page/24.webp"
                      alt="KangNam Products"
                      className="w-full h-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
