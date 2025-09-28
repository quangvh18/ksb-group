'use client';

import Image from 'next/image'
import { useEffect } from 'react';

export default function Careers() {
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
    <div className="pt-[70px]">
      {/* Hero Section */}
      <div className="box-environment position-relative py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px] position-relative">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-7/12 flex justify-center flex-col" data-aos="fade-right" data-aos-duration="1000">
              <h3 className="text-6xl font-bold text-gray-800 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                Văn Hóa KSB<br />
              </h3>
              <p className="text-xl text-gray-700 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                KSB GROUP sáng tạo nét văn hóa nhằm đóng góp vào cuộc sống thêm sức khỏe, niềm vui và tiện lợi. Nếu điều này nói lên đúng những gì bạn đang cần tìm cho công việc của mình, vậy bạn còn chần chừ gì không tham gia cùng chúng tôi? KSB luôn rộng cửa chào đón những tài năng ở mọi nơi.
              </p>
              <a className="text-white text-xl font-bold px-8 py-4 rounded-full inline-block transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 w-fit" 
                 href="#job"
                 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600"
                 style={{
                   background: 'linear-gradient(130deg, rgba(217, 37, 31, 1) 0%, rgba(233, 128, 30, 1) 100%)',
                   boxShadow: '0 10px 25px rgba(217, 37, 31, 0.3)'
                 }}>
                XEM TUYỂN DỤNG →
              </a>
            </div>
            <div className="w-full lg:w-5/12 mt-8 lg:mt-0" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <div className="relative">
                <Image 
                  src="https://cjfoods.com.vn/storage/recruitment/cj-recruitment-banner-586x940-02.jpg" 
                  alt="KSB Group Recruitment" 
                  width={586} 
                  height={940}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Vision Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Kiến tạo hệ sinh thái – Chắp cánh ước mơ lớn</h2>
            <h3 className="text-3xl font-semibold mb-8" style={{color: 'rgba(217, 37, 31, 1)'}} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Tầm nhìn về con người</h3>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
              Tại KSB GROUP, chúng tôi tin rằng con người là tài sản giá trị nhất. Với các giá trị cốt lõi "Tử tế – Sáng tạo – Nhiệt huyết – Ước mơ lớn", chúng tôi xây dựng một môi trường làm việc truyền cảm hứng, nơi mỗi cá nhân đều có cơ hội phát triển tối đa năng lực, đồng thời tạo ra những giá trị tích cực và bền vững cho xã hội.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
              Chúng tôi trân trọng sự đa dạng trong đội ngũ, đề cao tinh thần chủ động và tinh thần doanh chủ, để cùng nhau hiện thực hóa mục tiêu đưa các tinh hoa toàn cầu đến gần hơn với người tiêu dùng Việt.
            </p>
          </div>
        </div>
      </div>

      {/* Work Culture Section */}
      <div className="py-20">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Văn hóa làm việc tại KSB GROUP</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              Tại KSB GROUP, chúng tôi xây dựng một nền văn hóa dựa trên sự truyền cảm hứng, chuyên nghiệp và minh bạch. Trong nội bộ, tinh thần bứt phá và sáng tạo được khuyến khích mạnh mẽ, cùng với môi trường làm việc kỷ luật, hợp tác và hiệu quả.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col">
                <div className="qmenu_icon w-full h-[120px] mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                    <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Với Cổ đông</h3>
                <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Minh bạch, trung thực và luôn hướng đến giá trị phát triển bền vững</p>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col">
                <div className="qmenu_icon w-full h-[120px] mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                    <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Với Khách hàng</h3>
                <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Sản phẩm – dịch vụ chất lượng cao, sáng tạo và phù hợp với nhu cầu thực tiễn</p>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col">
                <div className="qmenu_icon w-full h-[120px] mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                    <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Với Đối tác</h3>
                <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Tinh thần hợp tác, tôn trọng lẫn nhau và cùng tạo giá trị bền vững</p>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col">
                <div className="qmenu_icon w-full h-[120px] mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                    <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Nội bộ</h3>
                <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Tinh thần bứt phá, sáng tạo, kỷ luật, hợp tác và hiệu quả</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="box-time-health-fringe position-relative py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px] position-relative">
          {/* Value 1 - Trung Thực */}
          <div className="block-thf flag-thf-1 mb-16" data-aos="fade-right" data-aos-duration="1000">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                <div className="relative">
                  <div className="bg-thf-1 absolute inset-0 opacity-10">
                    <Image src="https://cjfoods.com.vn/themes/nest/images/bg-3-big.png" alt="" width={400} height={400} className="w-full h-full object-cover" />
                  </div>
                  <div className="img-thf relative z-10">
                    <Image src="https://cjfoods.com.vn/storage/recruitment/trung-thuc-01.png" alt="Trung Thực" width={300} height={300} className="w-full h-auto" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12 flex justify-center flex-col pl-0 lg:pl-8">
                <h3 className="text-6xl font-bold mb-6" style={{color: 'rgba(217, 37, 31, 1)'}}>Trung Thực</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Không dung nạp sự vô hiệu quả; Báo cáo đúng, minh bạch, không có hành vi gian dối, tiêu cực, trái pháp luật
                </p>
              </div>
            </div>
          </div>

          {/* Value 2 - Nhiệt Huyết */}
          <div className="block-thf flag-thf-2 mb-16" data-aos="fade-left" data-aos-duration="1000">
            <div className="flex flex-wrap items-center flex-row-reverse">
              <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                <div className="relative">
                  <div className="bg-thf-2 absolute inset-0 opacity-10">
                    <Image src="https://cjfoods.com.vn/themes/nest/images/bg-2.png" alt="" width={400} height={400} className="w-full h-full object-cover" />
                  </div>
                  <div className="img-thf relative z-10">
                    <Image src="https://cjfoods.com.vn/storage/recruitment/nhiet-huyet-01.png" alt="Nhiệt Huyết" width={300} height={300} className="w-full h-auto" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12 flex justify-center flex-col pr-0 lg:pr-8">
                <h3 className="text-6xl font-bold mb-6" style={{color: 'rgba(233, 128, 30, 1)'}}>Nhiệt Huyết</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Hướng đến vị trí số 1 với quyết tâm và thử thách. Theo đuổi thành tích cao nhất và sự hoàn hảo bằng cách nhìn nhận mọi việc theo một quy trình từ đầu đến cuối
                </p>
              </div>
            </div>
          </div>

          {/* Value 3 - Sáng Tạo */}
          <div className="block-thf flag-thf-3" data-aos="fade-right" data-aos-duration="1000">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                <div className="img-thf">
                  <Image src="https://cjfoods.com.vn/storage/recruitment/sang-tao-01.png" alt="Sáng Tạo" width={300} height={300} className="w-full h-auto" />
                </div>
              </div>
              <div className="w-full lg:w-7/12 flex justify-center flex-col pl-0 lg:pl-8">
                <h3 className="text-6xl font-bold mb-6" style={{color: 'rgba(217, 37, 31, 1)'}}>Sáng Tạo</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Làm việc với tinh thần "có thể thay đổi mọi thứ"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div id="job" className="py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Các vị trí đang tuyển dụng</h2>
            <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Tham gia cùng chúng tôi để kiến tạo giá trị và vươn tầm toàn cầu</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[280px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <div className="qmenu_icon w-full h-[100px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Lễ tân</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">Đón tiếp khách hàng và hỗ trợ các hoạt động văn phòng</p>
              <a href="#contact" className="inline-block text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 bg-gray-800 hover:bg-gray-900 text-sm">
                Ứng tuyển ngay
              </a>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[280px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div className="qmenu_icon w-full h-[100px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10M7 4a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M7 4h10"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Nhân viên Digital Marketing</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">Phát triển và thực hiện các chiến lược marketing số</p>
              <a href="#contact" className="inline-block text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 bg-gray-800 hover:bg-gray-900 text-sm">
                Ứng tuyển ngay
              </a>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[280px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <div className="qmenu_icon w-full h-[100px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Chuyên viên mua hàng</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">Quản lý và thực hiện các hoạt động mua sắm, đàm phán</p>
              <a href="#contact" className="inline-block text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 bg-gray-800 hover:bg-gray-900 text-sm">
                Ứng tuyển ngay
              </a>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[280px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <div className="qmenu_icon w-full h-[100px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Kiểm soát kinh doanh</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">Giám sát và kiểm soát các hoạt động kinh doanh</p>
              <a href="#contact" className="inline-block text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 bg-gray-800 hover:bg-gray-900 text-sm">
                Ứng tuyển ngay
              </a>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[280px] p-6 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
              <div className="qmenu_icon w-full h-[100px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Admin</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">Quản lý và hỗ trợ các hoạt động hành chính</p>
              <a href="#contact" className="inline-block text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out  hover:shadow-2xl transform hover:-translate-y-1 bg-gray-800 hover:bg-gray-900 text-sm">
                Ứng tuyển ngay
              </a>
            </div>
          </div>

          <div id="contact" className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[400px] p-12 text-center shadow-lg hover:shadow-xl  transition-all duration-500 ease-in-out" 
               data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="qmenu_icon w-full h-[120px] mb-8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-500 ease-in-out">
                  <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#9a9a9a] text-[32px] block text-center font-bold mb-8 group-hover:text-black transition-colors duration-300">
                Liên hệ ứng tuyển
              </h3>

              {/* Email Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-white/50 group-hover:shadow-lg transition-all duration-500 ease-in-out">
                <p className="text-lg text-gray-700 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                  Chi tiết vui lòng liên hệ tới địa chỉ email:
                </p>
                <a href="mailto:hr@ksbgroup.vn" 
                   className="inline-flex items-center text-xl font-bold px-8 py-4 rounded-2xl transition-all duration-500 ease-in-out  hover:shadow-xl transform hover:-translate-y-1"
                   style={{
                     background: 'linear-gradient(135deg, rgba(217, 37, 31, 1) 0%, rgba(233, 128, 30, 1) 100%)',
                     color: 'white',
                     boxShadow: '0 10px 25px rgba(217, 37, 31, 0.3)'
                   }}>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  hr@ksbgroup.vn
                </a>
              </div>

              {/* Slogan */}
              <div className="relative">
                <p className="text-[#9a9a9a] text-xl font-bold group-hover:text-black transition-colors duration-300">
                  KSB GROUP – Nơi bạn kiến tạo giá trị, cùng vươn tầm toàn cầu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
