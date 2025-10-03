'use client';

import PageHeader from "../../components/PageHeader";
import EcosystemServicesSection from "../../components/EcosystemServicesSection";
import EcosystemDetailSection from "../../components/EcosystemDetailSection";
import KSBGroupSection from "../../components/KSBGroupSection";
import { useLanguage } from "../../contexts/LanguageContext";

export default function EcosystemPage() {
  const { t } = useLanguage();
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.ecosystem'), isActive: true }
  ];

  return (
    <div>
      <PageHeader 
        title={t('ecosystem.title')}
        description={t('ecosystem.description')}
        breadcrumbItems={breadcrumbItems}
      />
      <main>
        <KSBGroupSection />
        <EcosystemDetailSection />
      </main>
    </div>
  );
}
