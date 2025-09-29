'use client';

import { useEffect } from 'react';

export default function PartnersPage() {
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
      {/* Hero Section with Partner Logos */}
      <div className="relative py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-6xl font-bold text-gray-800 mb-6">Đối tác</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              KSB GROUP tự hào là đối tác chiến lược của nhiều thương hiệu uy tín đến từ Hàn Quốc, châu Âu và các quốc gia phát triển khác.
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">LOTTE</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Dongnam Medicsco</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Melland</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Samjin</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Sahmyook</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Taeyoung</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Xylitol Mint</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">Queen Bin</div>
            </div>
            
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[150px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-600 group-hover:text-[#0b5739] transition-colors duration-300">CROWN</div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Partners Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Các đối tác chiến lược</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">LOTTE</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Tập đoàn đa quốc gia lớn của Hàn Quốc, hoạt động trong lĩnh vực thực phẩm, bán lẻ, và giải trí.</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Dongnam Medicsco</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Chuyên cung cấp dược phẩm và thiết bị y tế chất lượng cao.</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Melland</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Thương hiệu kẹo nổi tiếng với các dòng sản phẩm chiết xuất từ thảo mộc, nhân sâm.</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Samjin</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Nhà sản xuất bánh kẹo hàng đầu tại Hàn Quốc, nổi bật với công nghệ chế biến hiện đại.</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Sahmyook</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Thương hiệu nổi tiếng với các dòng thực phẩm chay và thức uống lên men từ đậu nành.</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Taeyoung</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Doanh nghiệp có tiếng trong lĩnh vực chế biến thực phẩm và gia vị tại Hàn Quốc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner with KSB Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Tại sao nên đầu tư và hợp tác cùng KSB Group?</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Growth Stats */}
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <div className="qmenu_icon w-full h-[100px] mb-6 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[24px] block text-center font-bold mb-4 group-hover:text-black transition-colors duration-300">Tăng trưởng ổn định, bền vững</h3>
              <div className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-[#0b5739] mb-1">2022: 604 tỷ VNĐ</div>
                  <div className="text-lg font-semibold text-[#0b5739] mb-1">2023: 710 tỷ VNĐ (+17,5%)</div>
                  <div className="text-lg font-semibold text-[#0b5739]">2024: 850 tỷ VNĐ (+19,7%)</div>
                </div>
              </div>
            </div>

            {/* Operational Scale */}
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div className="qmenu_icon w-full h-[100px] mb-6 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[24px] block text-center font-bold mb-4 group-hover:text-black transition-colors duration-300">Quy mô vận hành toàn diện</h3>
              <div className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                <div className="space-y-2">
                  <div>• 3 chi nhánh tại Hà Nội, Hải Dương và TP. Hồ Chí Minh</div>
                  <div>• 12.000m² kho hàng tiêu chuẩn</div>
                  <div>• 15 phương tiện vận tải</div>
                  <div>• 85 nhà phân phối cấp 1</div>
                  <div>• Phủ kín 63 tỉnh thành</div>
                </div>
              </div>
            </div>

            {/* Multi-industry Ecosystem */}
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <div className="qmenu_icon w-full h-[100px] mb-6 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[24px] block text-center font-bold mb-4 group-hover:text-black transition-colors duration-300">Hệ sinh thái đa ngành</h3>
              <div className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                <div className="space-y-2">
                  <div>• F&B: Bonchon, Trung Nguyên Legend Cafe</div>
                  <div>• Mỹ phẩm: Biofresh</div>
                  <div>• Thực phẩm: Choco Samjin, Ecobin</div>
                  <div>• Bách Mộc An, KangNam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Opportunities Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Cơ hội hợp tác</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              KSB GROUP sẵn sàng đồng hành cùng các đối tác trong và ngoài nước để kiến tạo hệ sinh thái phát triển bền vững và mở rộng quy mô toàn diện.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Nhà sản xuất & thương hiệu toàn cầu</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Muốn phát triển tại thị trường Việt Nam</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[0px_50px_0px_50px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Doanh nghiệp nội địa</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Mong muốn đồng hành về sản phẩm, công nghệ, chuỗi cung ứng</p>
            </div>

            <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[200px] p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
              <div className="qmenu_icon w-full h-[80px] mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-12 h-12 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mb-3 group-hover:text-black transition-colors duration-300">Đối tác nhượng quyền</h3>
              <p className="text-[#9a9a9a] text-sm group-hover:text-gray-700 transition-colors duration-300 flex-grow">Trong các lĩnh vực F&B, mỹ phẩm, tiêu dùng nhanh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          <div className="qmenu_card icon_card group block bg-white border border-gray-200 rounded-[50px_0px_50px_0px] min-h-[400px] p-12 text-center shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out" 
               data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="qmenu_icon w-full h-[120px] mb-8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                  <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#9a9a9a] text-[32px] block text-center font-bold mb-8 group-hover:text-black transition-colors duration-300">
                Liên Hệ Hợp Tác
              </h3>

              {/* Contact Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/50 transition-all duration-500 ease-in-out">
                <div className="text-lg text-gray-700 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                  <div className="mb-4">
                    <strong>Phòng Phát triển Đối tác – KSB GROUP</strong>
                  </div>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <div className="flex items-start">
                      <span className="mr-3">📍</span>
                      <span>Căn V10-A01, khu đô thị mới An Hưng, phố Nguyễn Thanh Bình, Phường La Khê, Quận Hà Đông, Thành phố Hà Nội, Việt Nam</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3">📞</span>
                      <span>Hotline: 19001181</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3">📧</span>
                      <span>Email: info@ksbgroup.vn</span>
                    </div>
                  </div>
                </div>
                <a href="mailto:info@ksbgroup.vn" 
                   className="inline-flex items-center text-xl font-bold px-8 py-4 rounded-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
                   style={{
                     background: 'linear-gradient(135deg, rgba(217, 37, 31, 1) 0%, rgba(233, 128, 30, 1) 100%)',
                     color: 'white',
                     boxShadow: '0 10px 25px rgba(217, 37, 31, 0.3)'
                   }}>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Liên hệ ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
