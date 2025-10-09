'use client';

import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import MissionVisionValues from "../../components/MissionVisionValues";
import OrgChart from "../../components/OrgChart";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect } from "react";

export default function AboutPageClient() {
  const { t } = useLanguage();
  
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), isActive: true }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Remove the # symbol
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100); // Small delay to ensure page is loaded
      }
    };

    // Handle initial hash
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="sub_page intro intro_01">
        <PageHeader 
          title={t('about.title')}
          description={t('about.description')}
          breadcrumbItems={breadcrumbItems}
          bannerImage="/images/about-page/banner.webp"
        />


        {/* About Section */}
        <div id="about-section">
          {/* Vietnamese Introduction Section */}
          <div className="bg-white py-16" data-aos="fade">
            <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
              <div className="text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade" data-aos-delay="100">
                  {t('about.intro.title')}
                </h2>
                
                <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade" data-aos-delay="200">
                  {t('about.intro.content')}
                </p>
              </div>
            </div>
          </div>

          {/* Company Introduction Section */}
          <div className="bg-gray-50 py-16" data-aos="fade">
            <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Company Image with Shadow Effect - Left Side */}
                <div className="relative order-2 lg:order-1" data-aos="fade" data-aos-delay="200">
                  {/* Shadow div with same size and leaf style */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
                  
                  {/* Company image with right and bottom offset */}
                  <Image 
                    src="https://www.sahmyook.co.kr/theme/syfood/img/intro/intro_01.jpg" 
                    alt="KSB Group Factory"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer relative z-10"
                  />
                  
                  {/* Pink tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4acb7]/10 to-transparent rounded-[3rem_0rem_3rem_0rem] z-20"></div>
                </div>
                
                {/* Text Content - Right Side */}
                <div className="space-y-8 order-1 lg:order-2">
                  <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade" data-aos-delay="200">
                    {t('about.company.content1')}
                  </p>
                  
                  <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade" data-aos-delay="300">
                    {t('about.company.content2')}
                  </p>
                  
                  <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade" data-aos-delay="400">
                    {t('about.company.content3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Values & Vision Section */}
        <div id="mission-values-vision-section">
          <MissionVisionValues />
        </div>

        {/* Organization Chart Section */}
        <div id="organization-section">
          <OrgChart />
        </div>
      </div>
    </div>
  );
}
