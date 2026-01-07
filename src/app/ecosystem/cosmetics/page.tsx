'use client';

import PageHeader from "../../../components/PageHeader";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function CosmeticsPage() {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.ecosystem'), href: "/ecosystem" },
    { label: t('ecosystem.services.cosmetics.title'), isActive: true }
  ];

  return (
    <div>
      <PageHeader
        title={t('ecosystem.services.cosmetics.title')}
        description={t('ecosystem.services.cosmetics.subtitle')}
        breadcrumbItems={breadcrumbItems}
        bannerImage="/images/ecosystem-page/he-sinh-thai-banner.webp"
      />
      <main>
        {/* Cosmetics Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
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
                    <img
                      src="/images/ecosystem-page/biofest3.webp"
                      alt="Biofresh Cosmetics"
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
                    <img
                      src="/images/ecosystem-page/File_408.webp"
                      alt="Biofresh Store"
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="relative">
                    <img
                      src="/images/ecosystem-page/biofest_new.webp"
                      alt="Biofresh Products"
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg border border-[#bb252d]/20" style={{ boxShadow: '0 10px 25px -5px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.1)' }}>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{t('ecosystem.services.cosmetics.products.title')}</h4>
                <p className="text-base text-gray-700 leading-relaxed mb-6">{t('ecosystem.services.cosmetics.products.description')}</p>
                <div className="relative">
                  <img
                    src="/images/ecosystem-page/biofest2.webp"
                    alt="Rose of Bulgaria Products"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
