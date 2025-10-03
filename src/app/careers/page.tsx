'use client';

import Image from 'next/image'
import { useEffect } from 'react';
import PageHeader from "../../components/PageHeader";
import JobListings from "../../components/JobListings";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Careers() {
  const { t } = useLanguage();
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.careers'), isActive: true }
  ];
  useEffect(() => {
    // Custom smooth scroll with easing
    const smoothScrollTo = (targetId: string) => {
      const target = document.querySelector(targetId);
      if (target) {
        const startPosition = window.pageYOffset;
        const targetPosition = (target as HTMLElement).offsetTop - 80; // Account for fixed header
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 second
        let start: number | null = null;

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutCubic(progress);
          
          window.scrollTo(0, startPosition + distance * ease);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };

    // Add click handlers for smooth scroll
    const applyLinks = document.querySelectorAll('a[href^="#"]');
    applyLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          smoothScrollTo(targetId);
        }
      });
    });

    return () => {
      applyLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div>
      <PageHeader 
        title={t('careers.title')}
        description={t('careers.description')}
        breadcrumbItems={breadcrumbItems}
      />
      
      {/* Company Introduction Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Company Image with Shadow Effect - Left Side */}
            <div className="relative order-2 lg:order-1" data-aos="fade-right" data-aos-delay="200">
              {/* Shadow div with same size and leaf style */}
              <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
              
              {/* Company image with right and bottom offset */}
              <Image 
                src="https://cjfoods.com.vn/storage/recruitment/cj-recruitment-banner-586x940-02.jpg" 
                alt="KSB Group Recruitment"
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
                {t('careers.banner.title')}
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                {t('careers.banner.subtitle')}
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                {t('careers.banner.description')}
              </p>
              
              <a className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#bb252d] hover:bg-[#8b1e24] text-white font-semibold shadow transition-colors duration-300" 
                 href="#job"
                 data-aos="fade-up" data-aos-delay="400">
                  {t('careers.viewJobs')} 
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Company Vision Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl relative">
              {/* Leaf shadow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-[3rem_0rem_3rem_0rem] transform translate-x-2 translate-y-2 z-0"></div>
              
              {/* Main card */}
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer group relative z-10 overflow-hidden p-8" data-aos="zoom-in" data-aos-delay="100">
                {/* Leaf shape decoration */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-bl-full"></div>
                
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#bb252d] leading-tight mb-6 group-hover:text-[#8b1e24] transition-colors duration-300">
                    {t('careers.vision.title')}
                  </h2>
            
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    {t('careers.vision.subtitle')}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#bb252d] group-hover:text-[#8b1e24] transition-colors duration-300">
                        {t('careers.vision.ecosystem.title')}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t('careers.vision.ecosystem.content')}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#bb252d] group-hover:text-[#8b1e24] transition-colors duration-300">
                        {t('careers.vision.dreams.title')}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t('careers.vision.dreams.content')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Culture Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight" data-aos="fade-up" data-aos-delay="100">
              {t('careers.culture.title')}
            </h2>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {t('careers.culture.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Culture Card 1 - Với Cổ đông */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white group-hover:bg-[#bb252d] rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#bb252d] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  
                  <h3 className="text-xl font-bold mb-3 text-[#bb252d] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    {t('careers.values.shareholders.title')}
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center justify-center transition-all duration-300">
                    {t('careers.values.shareholders.subtitle')}
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#bb252d] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    {t('careers.values.shareholders.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 2 - Với Khách hàng */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-white group-hover:bg-[#bb252d] rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#bb252d] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  
                  <h3 className="text-xl font-bold mb-3 text-[#bb252d] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    {t('careers.values.customers.title')}
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center justify-center transition-all duration-300">
                    {t('careers.values.customers.subtitle')}
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#bb252d] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    {t('careers.values.customers.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 3 - Với Đối tác */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-white group-hover:bg-[#bb252d] rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#bb252d] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  
                  <h3 className="text-xl font-bold mb-3 text-[#bb252d] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    {t('careers.values.partners.title')}
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center justify-center transition-all duration-300">
                    {t('careers.values.partners.subtitle')}
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#bb252d] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    {t('careers.values.partners.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 4 - Nội bộ */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="400">
              <div className="bg-white group-hover:bg-[#bb252d] rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#bb252d] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  
                  <h3 className="text-xl font-bold mb-3 text-[#bb252d] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    {t('careers.values.internal.title')}
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center justify-center transition-all duration-300">
                    {t('careers.values.internal.subtitle')}
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#bb252d] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    {t('careers.values.internal.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Job Openings Section */}
      <div id="job" data-aos="fade-up">
        <JobListings />
          </div>

      {/* Contact Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div 
            id="contact" 
            className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[400px] p-12 text-center shadow-lg transition-all duration-700 ease-out cursor-pointer relative overflow-hidden will-change-transform" 
            style={{
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1), 0 4px 15px -2px rgba(0,0,0,0.05)',
              transform: 'translateY(0) translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
            data-aos="fade-up" 
            data-aos-duration="1000" 
            data-aos-delay="600"
          >
            
            {/* Single shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
            
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-[#bb252d]/5 rounded-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:bg-[#bb252d]/10"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#bb252d]/5 rounded-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:bg-[#bb252d]/10"></div>
            
            <div className="relative z-10 text-center">

              {/* Title */}
              <h3 className="text-black text-2xl block text-center font-bold mb-3 transition-all duration-500 ease-out group-hover:text-[#bb252d]">
                {t('careers.applyNow')}
              </h3>

              {/* Contact Info */}
              <div 
                className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 transition-all duration-700 ease-out group-hover:bg-white/95"
              >
                <div className="text-sm text-gray-700 mb-3 group-hover:text-gray-800 transition-colors duration-500 ease-out">
                  <div className="text-center space-y-2">
                    <div className="font-bold text-base text-black">
                      {t('careers.contact.subtitle')}
                    </div>
                    <div className="font-bold text-base text-black">
                      {t('careers.company.name')}
                    </div>
                    <div className="text-sm text-gray-700 mt-4 leading-relaxed">
                      {t('careers.contact.address')}
                    </div>
                    <div className="text-sm text-gray-700">
                      {t('careers.contact.email')}
                    </div>
                  </div>
                </div>
                
                {/* Apply Button */}
                <a
                  href="mailto:hr@ksbgroup.vn"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#bb252d] hover:bg-[#8b1e24] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-base mt-4 transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {t('careers.sendApplication')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <style jsx>{`
        .qmenu_card:hover {
          transform: translateY(-8px) translateZ(0);
          box-shadow: 0 20px 50px -10px rgba(0,0,0,0.2), 0 8px 30px -5px rgba(0,0,0,0.1);
        }
        
        .email-button:hover {
          transform: translateY(-2px) translateZ(0);
          box-shadow: 0 12px 30px rgba(217, 37, 31, 0.35);
        }
      `}</style>
    </div>
  );
}
