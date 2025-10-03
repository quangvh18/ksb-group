'use client';

import PageHeader from "../../../components/PageHeader";
import OrgChart from "../../../components/OrgChart";
import MissionVisionValues from "../../../components/MissionVisionValues";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function OrganizationPage() {
  const { t } = useLanguage();
  
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), href: "/about" },
    { label: t('about.organization.title'), isActive: true }
  ];

  return (
    <div id="wrapper">
      <div className="sub_page intro intro_01">
        <PageHeader 
          title={t('about.organization.title')}
          description={t('about.organization.description')}
          breadcrumbItems={breadcrumbItems}
        />

        {/* Mission, Values & Vision Section */}
        <MissionVisionValues />

        {/* Organization Chart Section */}
        <OrgChart />
      </div>
    </div>
  );
}
