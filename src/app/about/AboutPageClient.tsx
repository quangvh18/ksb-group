'use client';

import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import OrgChart from "../../components/OrgChart";
import { useLanguage } from "../../contexts/LanguageContext";

interface ValueCard {
  title: string;
  subtitle: string;
  content: string[];
  titleColor: "green" | "blue";
}

export default function AboutPageClient() {
  const { t } = useLanguage();
  
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), isActive: true }
  ];

  // Generate values data based on current language
  const valuesData: ValueCard[] = [
    {
      title: t('about.mission.title'),
      subtitle: t('about.mission.subtitle'),
      content: [t('about.mission.content')],
      titleColor: "green"
    },
    {
      title: t('about.values.title'),
      subtitle: t('about.values.subtitle'),
      content: [t('about.values.content')],
      titleColor: "blue"
    },
    {
      title: t('about.vision.title'),
      subtitle: t('about.vision.subtitle'),
      content: [t('about.vision.content')],
      titleColor: "blue"
    },
    {
      title: t('about.ecosystem.title'),
      subtitle: t('about.ecosystem.subtitle'),
      content: [t('about.ecosystem.content')],
      titleColor: "green"
    }
  ];

  return (
    <div id="wrapper">
      <div className="sub_page intro intro_01">
        <PageHeader 
          title={t('about.title')}
          description={t('about.description')}
          breadcrumbItems={breadcrumbItems}
        />

        {/* Vietnamese Introduction Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade-up" data-aos-delay="100">
                {t('about.intro.title')}
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                {t('about.intro.content')}
              </p>
            </div>
          </div>
        </div>

        {/* Company Introduction Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Company Image with Shadow Effect - Left Side */}
              <div className="relative order-2 lg:order-1" data-aos="zoom-in" data-aos-delay="200">
                {/* Shadow div with same size and leaf style */}
                <div className="absolute top-0 left-0 w-full h-full bg-[#e5989b] rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
                
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
                <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade-up" data-aos-delay="100">
                  {t('about.company.title')}
                </h2>
                
                <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                  {t('about.company.content1')}
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                  {t('about.company.content2')}
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                  {t('about.company.content3')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {valuesData.map((item, index) => {
                const colors = [
                  { bg: 'bg-white', border: 'border-gray-200', icon: 'text-black' },
                  { bg: 'bg-white', border: 'border-gray-200', icon: 'text-black' },
                  { bg: 'bg-white', border: 'border-gray-200', icon: 'text-black' },
                  { bg: 'bg-white', border: 'border-gray-200', icon: 'text-black' }
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div key={index} className="w-full flex" data-aos="zoom-in" data-aos-delay={index * 150}>
                    <div className={`${colorScheme.bg} rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group`}>
                      {/* Decorative corner */}
                      <div className={`absolute top-0 right-0 w-16 h-16 ${colorScheme.bg} opacity-20 rounded-bl-full`}></div>
                      
                      <div className={`px-6 pt-6 pb-0 bg-white text-gray-800 border-b ${colorScheme.border} flex-shrink-0 h-[160px] flex flex-col justify-center relative`}>
                        
                        <h3 className="text-xl font-bold mb-3 text-[#c9184a] text-center transition-all duration-300 group-hover:text-[#a0153a] group-hover:scale-110">
                          {item.title}
                        </h3>
                        <h5 className="text-sm font-medium text-black leading-relaxed h-[60px] flex items-center transition-all duration-300 group-hover:text-gray-700">
                          {item.subtitle}
                        </h5>
                      </div>
                      <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white">
                        {item.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-sm leading-relaxed text-black text-left transition-all duration-300 group-hover:text-gray-800">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Organization Chart Section */}
        <OrgChart />
      </div>
    </div>
  );
}
