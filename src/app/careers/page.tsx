'use client';

import Image from 'next/image'
import { useEffect } from 'react';
import PageHeader from "../../components/PageHeader";
import JobListings from "../../components/JobListings";

export default function Careers() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", isActive: true }
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
        title="Tuyển dụng"
        description="KSB GROUP sáng tạo nét văn hóa nhằm đóng góp vào cuộc sống thêm sức khỏe, niềm vui và tiện lợi. Nếu điều này nói lên đúng những gì bạn đang cần tìm cho công việc của mình, vậy bạn còn chần chừ gì không tham gia cùng chúng tôi?"
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
                Văn Hóa KSB
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                KSB GROUP sáng tạo nét văn hóa nhằm đóng góp vào cuộc sống thêm sức khỏe, niềm vui và tiện lợi. Nếu điều này nói lên đúng những gì bạn đang cần tìm cho công việc của mình, vậy bạn còn chần chừ gì không tham gia cùng chúng tôi?
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                KSB luôn rộng cửa chào đón những tài năng ở mọi nơi. Chúng tôi tin rằng mỗi cá nhân đều có thể đóng góp giá trị độc đáo cho sự phát triển của tập đoàn.
              </p>
              
              <a className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#c9184a] hover:bg-[#a0153a] text-white font-semibold shadow transition-colors duration-300" 
                 href="#job"
                 data-aos="fade-up" data-aos-delay="400">
                  XEM TUYỂN DỤNG 
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
                  <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight mb-6 group-hover:text-[#c9184a] transition-colors duration-300">
              Tầm nhìn về con người
              </h2>
            
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Tại KSB GROUP, chúng tôi tin rằng con người là tài sản giá trị nhất. Với các giá trị cốt lõi &ldquo;Tử tế – Sáng tạo – Nhiệt huyết – Ước mơ lớn&rdquo;, chúng tôi xây dựng một môi trường làm việc truyền cảm hứng.
            </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#c9184a] group-hover:text-[#a0153a] transition-colors duration-300">
                    Kiến tạo hệ sinh thái
                </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                    Chúng tôi xây dựng một môi trường làm việc truyền cảm hứng, nơi mỗi cá nhân đều có cơ hội phát triển tối đa năng lực, đồng thời tạo ra những giá trị tích cực và bền vững cho xã hội.
                  </p>
                </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#c9184a] group-hover:text-[#a0153a] transition-colors duration-300">
                    Chắp cánh ước mơ lớn
                  </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                  Chúng tôi trân trọng sự đa dạng trong đội ngũ, đề cao tinh thần chủ động và tinh thần doanh chủ, để cùng nhau hiện thực hóa mục tiêu đưa các tinh hoa toàn cầu đến gần hơn với người tiêu dùng Việt.
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
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade-up" data-aos-delay="100">
              Văn hóa làm việc tại KSB GROUP
            </h2>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Tại KSB GROUP, chúng tôi xây dựng một nền văn hóa dựa trên sự truyền cảm hứng, chuyên nghiệp và minh bạch. Trong nội bộ, tinh thần bứt phá và sáng tạo được khuyến khích mạnh mẽ, cùng với môi trường làm việc kỷ luật, hợp tác và hiệu quả.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Culture Card 1 - Với Cổ đông */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white group-hover:bg-[#c9184a] rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#c9184a] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 text-black group-hover:text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-[#c9184a] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    Với Cổ đông
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center transition-all duration-300">
                    Minh bạch và bền vững
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#c9184a] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    Minh bạch, trung thực và luôn hướng đến giá trị phát triển bền vững
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 2 - Với Khách hàng */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-white group-hover:bg-[#c9184a] rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#c9184a] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 text-black group-hover:text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-[#c9184a] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    Với Khách hàng
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center transition-all duration-300">
                    Chất lượng và sáng tạo
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#c9184a] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    Sản phẩm – dịch vụ chất lượng cao, sáng tạo và phù hợp với nhu cầu thực tiễn
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 3 - Với Đối tác */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-white group-hover:bg-[#c9184a] rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#c9184a] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 text-black group-hover:text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-[#c9184a] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    Với Đối tác
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center transition-all duration-300">
                    Hợp tác và tôn trọng
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#c9184a] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    Tinh thần hợp tác, tôn trọng lẫn nhau và cùng tạo giá trị bền vững
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Card 4 - Nội bộ */}
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="400">
              <div className="bg-white group-hover:bg-[#c9184a] rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full"></div>
                
                <div className="px-6 pt-6 pb-0 bg-white group-hover:bg-[#c9184a] text-gray-800 group-hover:text-white border-b border-gray-200 group-hover:border-white/20 flex-shrink-0 h-[160px] flex flex-col justify-center relative transition-all duration-300">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 text-black group-hover:text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-[#c9184a] group-hover:text-white text-center transition-all duration-300 group-hover:scale-110">
                    Nội bộ
                  </h3>
                  <h5 className="text-sm font-medium text-black group-hover:text-white leading-relaxed h-[60px] flex items-center transition-all duration-300">
                    Bứt phá và sáng tạo
                  </h5>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white group-hover:bg-[#c9184a] transition-all duration-300">
                  <p className="text-sm leading-relaxed text-black group-hover:text-white text-left transition-all duration-300">
                    Tinh thần bứt phá, sáng tạo, kỷ luật, hợp tác và hiệu quả
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
            <div className="absolute top-4 right-4 w-16 h-16 bg-[#c9184a]/5 rounded-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:bg-[#c9184a]/10"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#c9184a]/5 rounded-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:bg-[#c9184a]/10"></div>
            
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="qmenu_icon w-full h-[120px] mb-8 flex items-center justify-center">
                <div 
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f0ffbe] to-[#e8f5e8] flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-6 will-change-transform"
                  style={{
                    boxShadow: '0 4px 15px rgba(11, 87, 57, 0.1)'
                  }}
                >
                  <svg className="w-16 h-16 text-[#0b5739] transition-all duration-500 ease-out group-hover:text-[#c9184a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-black text-[32px] block text-center font-bold mb-8 transition-all duration-500 ease-out group-hover:text-[#c9184a]">
                Liên hệ ứng tuyển
              </h3>

              {/* Email Section */}
              <div 
                className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 transition-all duration-700 ease-out group-hover:bg-white/95"
              >
                <p id="email-contact" className="text-lg text-gray-700 mb-6 group-hover:text-gray-800 transition-colors duration-500 ease-out">
                  Chi tiết vui lòng liên hệ tới địa chỉ email:
                </p>
                <a 
                  href="mailto:hr@ksbgroup.vn" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#c9184a] hover:bg-[#a0153a] text-white font-semibold shadow transition-colors duration-300"
                >
                    hr@ksbgroup.vn
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
