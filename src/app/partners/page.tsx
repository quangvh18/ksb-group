'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageHeader from "../../components/PageHeader";
import PartnerLogo from "../../components/PartnerLogo";

// Define partner data structure
interface Partner {
  name: string;
  image: string;
  description: string;
}

interface IndustryPartners {
  name: string;
  alias: string;
  icon: string;
  partners: Partner[];
}

export default function PartnersPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Đối tác", isActive: true }
  ];

  // Interactive partners data
  const industryPartnersData: IndustryPartners[] = [
    {
      name: "Tăng trưởng ổn định, bền vững",
      alias: "growth",
      icon: "growth",
      partners: [
        { name: "Doanh thu 2022", image: "/images/2022.png", description: "604 tỷ VNĐ - Nền tảng vững chắc, khởi đầu cho hành trình phát triển bền vững" },
        { name: "Doanh thu 2023", image: "/images/2023.png", description: "710 tỷ VNĐ (+17,5%) - Tăng trưởng ấn tượng, khẳng định vị thế trong thị trường" },
        { name: "Doanh thu 2024", image: "/images/2024.png", description: "850 tỷ VNĐ (+19,7%) - Duy trì tốc độ phát triển mạnh mẽ qua từng năm" }
      ]
    },
    {
      name: "Quy mô vận hành toàn diện",
      alias: "operations",
      icon: "operations",
      partners: [
        { name: "Hệ thống chi nhánh", image: "/images/branches.png", description: "3 chi nhánh chiến lược tại Hà Nội, Hải Dương và TP. Hồ Chí Minh" },
        { name: "Cơ sở hạ tầng logistics", image: "/images/infrastructure.png", description: "12.000m² kho hàng tiêu chuẩn, 15 phương tiện vận tải chủ động giao hàng toàn quốc" },
        { name: "Mạng lưới phân phối", image: "/images/distribution.png", description: "85 nhà phân phối cấp 1 trải dài 63 tỉnh thành, phủ kín hệ thống siêu thị lớn và chuỗi cửa hàng tiện lợi" }
      ]
    },
    {
      name: "Hệ sinh thái đa ngành, đa thương hiệu",
      alias: "ecosystem",
      icon: "ecosystem",
      partners: [
        { name: "F&B", image: "/images/fnb.png", description: "Bonchon, Trung Nguyên Legend Cafe - Thương hiệu F&B hàng đầu, tạo trải nghiệm ẩm thực đẳng cấp" },
        { name: "Mỹ phẩm & chăm sóc cá nhân", image: "/images/cosmetics.png", description: "Biofresh và các dòng mỹ phẩm nhập khẩu cao cấp từ châu Âu, đáp ứng nhu cầu làm đẹp hiện đại" },
        { name: "Sản xuất - phân phối thực phẩm", image: "/images/food.png", description: "Choco Samjin, Ecobin, Bách Mộc An, KangNam - Mô hình đa ngành tối ưu nguồn lực, chủ động chuỗi cung ứng" }
      ]
    }
  ];

  const [activeIndustry, setActiveIndustry] = useState(industryPartnersData[0].name);
  const [partners, setPartners] = useState(industryPartnersData[0].partners);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(true);

  const triggerFadeIn = (newPartners: Partner[]) => {
    setIsFading(false);
    setTimeout(() => {
      setPartners(newPartners);
      setIsFading(true);
    }, 10);
  };

  const handleClickIndustry = (item: IndustryPartners) => {
    triggerFadeIn(item.partners);
    setActiveIndustry(item.name);
  };

  // Function to render professional icons
  const renderIcon = (iconType: string, isActive: boolean) => {
    const iconClass = `w-6 h-6 transition-all duration-300 ${
      isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'
    }`;

    switch (iconType) {
      case 'growth':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        );
      case 'operations':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        );
      case 'ecosystem':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

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
        title="Đối tác"
        description="KSB GROUP tự hào là đối tác chiến lược của nhiều thương hiệu uy tín đến từ Hàn Quốc, châu Âu và các quốc gia phát triển khác."
        breadcrumbItems={breadcrumbItems}
      />
      
      {/* Company Introduction Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Company Image with Shadow Effect - Left Side */}
            <div className="relative order-2 lg:order-1" data-aos="zoom-in" data-aos-delay="200">
              {/* Shadow div with same size and leaf style */}
              <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
              
              {/* Company image with right and bottom offset */}
              <Image 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop" 
                alt="KSB Group Partners"
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
                Đối tác chiến lược toàn cầu
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="150">
                KSB GROUP tự hào là đối tác chiến lược của nhiều thương hiệu uy tín đến từ Hàn Quốc, châu Âu và các quốc gia phát triển khác. Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Partners by Industry Section */}
      <div className="bg-gray-50 py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4">
              Tại sao nên hợp tác cùng KSB Group?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Khám phá sức mạnh và tiềm năng phát triển vượt trội của KSB Group qua các chỉ số ấn tượng
            </p>
          </div>

          {/* Interactive Section */}
          <div className="relative flex-1 w-full overflow-hidden min-h-[600px] rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)]">
            {/* Multiple background images */}
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem_0rem_3rem_0rem]"
            />
            {/* Additional decorative images */}
            <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop"
                alt="Partnership"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute bottom-4 left-4 w-24 h-24 opacity-15">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&auto=format&fit=crop"
                alt="Business"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute top-1/2 left-8 w-20 h-20 opacity-10 transform -translate-y-1/2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                alt="Teamwork"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Lighter overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 rounded-[3rem_0rem_3rem_0rem]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/25 rounded-[3rem_0rem_3rem_0rem]"></div>

            <div className="absolute inset-0 flex flex-col md:flex-row items-center md:justify-center z-10 p-4">
              {/* Cột ngành hàng */}
              <div className="w-full md:w-[40%] lg:w-[35%] flex items-center justify-center p-4">
                <div className="bg-white rounded-[2rem_0rem_2rem_0rem] shadow-md w-full max-w-[380px]">
                  <ul className="w-full text-sm font-medium">
                    {industryPartnersData.map((item, index) => {
                      const isActive = activeIndustry === item.name;
                      const activeIndex = industryPartnersData.findIndex(
                        i => i.name === activeIndustry,
                      );
                      const isBeforeActive = index === activeIndex - 1;
                      const isHovered = hoveredIndex === index;
                      const isBeforeHovered = hoveredIndex === index + 1;

                      const shouldHideBorder =
                        isActive || isBeforeActive || isHovered || isBeforeHovered;

                      return (
                        <li
                          key={item.name}
                          onClick={() => handleClickIndustry(item)}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`group flex items-center h-16 md:h-[80px] gap-[20px] p-4 cursor-pointer transition-colors duration-300 relative
                            ${index === 0 ? 'rounded-tl-[2rem]' : ''}
                            ${index === industryPartnersData.length - 1 ? 'rounded-br-[2rem]' : ''}
                            ${
                              isActive
                                ? 'bg-[#c9184a] text-white'
                                : 'hover:bg-[#c9184a] hover:text-white'
                            }
                            border-b ${shouldHideBorder ? 'border-transparent' : 'border-gray-200'}
                            ${!isActive ? 'last:border-b-0' : ''}
                          `}
                        >
                          <div className="flex items-center justify-center w-8 h-8 mr-3">
                            {renderIcon(item.icon, isActive)}
                          </div>
                          <span className="text-sm md:text-[18px] font-medium">
                            {item.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Cột danh sách đối tác */}
              <div className="w-full md:w-[60%] lg:w-[65%] flex items-center justify-center p-4">
                <div
                  className={`flex flex-wrap gap-3 md:gap-4 justify-center items-center ${
                    isFading ? 'animate-fade-in' : ''
                  }`}
                >
                  {partners.map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-lg min-w-[250px] max-w-[320px] group border border-white/20 relative overflow-hidden transform-gpu will-change-transform"
                      style={{
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translate3d(0, 0, 0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate3d(0, -8px, 0)';
                        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate3d(0, 0, 0)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      }}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      {/* Decorative background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#c9184a]/2 via-transparent to-orange-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#c9184a] via-orange-500 to-[#c9184a] opacity-0 group-hover:opacity-5 blur-sm transition-all duration-300"></div>
                      
                      <div className="relative z-10">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#c9184a] transition-colors duration-300 mb-2">
                            {partner.name}
                          </h3>
                          {/* Add a subtle badge */}
                          <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#c9184a]/10 to-orange-500/10 rounded-full text-xs font-medium text-[#c9184a] group-hover:from-[#c9184a]/20 group-hover:to-orange-500/20 transition-all duration-300">
                            {partner.name.includes('2022') || partner.name.includes('2023') || partner.name.includes('2024') ? 'Doanh thu' : 
                             partner.name.includes('F&B') ? 'Thương hiệu' :
                             partner.name.includes('Mỹ phẩm') ? 'Làm đẹp' :
                             partner.name.includes('Sản xuất') ? 'Sản xuất' : 'Hệ thống'}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                          {partner.description}
                        </p>
                        
                        {/* Animated progress bar for growth items */}
                        {(partner.name.includes('2022') || partner.name.includes('2023') || partner.name.includes('2024')) && (
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-2 bg-gradient-to-r from-[#c9184a] to-orange-500 rounded-full transition-all duration-500 ease-out"
                                style={{
                                  width: partner.name.includes('2022') ? '60%' : 
                                         partner.name.includes('2023') ? '80%' : '100%'
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Floating particles effect */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#c9184a] to-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-orange-500 to-[#c9184a] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-150"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Partner Logos */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">L</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">LOTTE</h3>
                  <p className="text-gray-600 text-sm">Tập đoàn đa quốc gia lớn của Hàn Quốc</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">DM</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Dongnam Medicsco</h3>
                  <p className="text-gray-600 text-sm">Chuyên cung cấp dược phẩm và thiết bị y tế</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Melland</h3>
                  <p className="text-gray-600 text-sm">Thương hiệu kẹo nổi tiếng với thảo mộc</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="400">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Samjin</h3>
                  <p className="text-gray-600 text-sm">Nhà sản xuất bánh kẹo hàng đầu Hàn Quốc</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="500">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">SY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Sahmyook</h3>
                  <p className="text-gray-600 text-sm">Thực phẩm chay và thức uống lên men</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="600">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Taeyoung</h3>
                  <p className="text-gray-600 text-sm">Chế biến thực phẩm và gia vị</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Partners Section */}
      <div className="bg-gray-50 py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Các đối tác chiến lược</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/2-01.webp" 
                      alt="LOTTE Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-red-600 font-bold text-xl">L</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">LOTTE</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/dongnam1.webp" 
                      alt="Dongnam Medicsco Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-blue-600 font-bold text-sm">DM</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">Dongnam Medicsco</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/5-01.webp" 
                      alt="Melland Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-green-600 font-bold text-xl">M</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">Melland</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="400">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/6-01.webp" 
                      alt="Samjin Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-purple-600 font-bold text-xl">S</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">Samjin</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="500">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/7-01.webp" 
                      alt="Sahmyook Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-orange-600 font-bold text-sm">SY</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">Sahmyook</h3>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="600">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-6">
                  <div className="mx-auto mb-4 flex justify-center">
                    <img 
                      src="https://thienthuanphat.vn/Data/images/default/8.webp" 
                      alt="Taeyoung Logo" 
                      className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<span class="text-teal-600 font-bold text-xl">T</span>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#c9184a] transition-colors duration-300 text-center">Taeyoung</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Partnership Opportunities Section */}
      <div className="bg-gray-50 py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Cơ hội hợp tác</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              KSB GROUP sẵn sàng đồng hành cùng các đối tác trong và ngoài nước để kiến tạo hệ sinh thái phát triển bền vững và mở rộng quy mô toàn diện.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Nhà sản xuất & thương hiệu toàn cầu</h3>
                  <p className="text-gray-600 leading-relaxed">Muốn phát triển tại thị trường Việt Nam</p>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Doanh nghiệp nội địa</h3>
                  <p className="text-gray-600 leading-relaxed">Mong muốn đồng hành về sản phẩm, công nghệ, chuỗi cung ứng</p>
                </div>
              </div>
            </div>

            <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#c9184a] transition-colors duration-300">Đối tác nhượng quyền</h3>
                  <p className="text-gray-600 leading-relaxed">Trong các lĩnh vực F&B, mỹ phẩm, tiêu dùng nhanh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                Liên hệ hợp tác
              </h3>

              {/* Contact Info */}
              <div 
                className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 transition-all duration-700 ease-out group-hover:bg-white/95"
              >
                <div className="text-lg text-gray-700 mb-6 group-hover:text-gray-800 transition-colors duration-500 ease-out">
                  <div className="mb-4">
                    <strong>Phòng Phát triển Đối tác – KSB GROUP</strong>
                  </div>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <div className="flex items-start">
                      <span className="mr-3">📍</span>
                      <span>Tầng 4, căn V10-A01, KĐT Terra An Hưng Phố Nguyễn Thanh Bình, Phường Dương Nội, TP Hà Nội, Việt Nam</span>
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
                   className="email-button inline-flex items-center text-xl font-bold px-8 py-4 rounded-2xl transition-all duration-500 ease-out transform group/email relative overflow-hidden will-change-transform"
                   style={{
                     background: 'linear-gradient(135deg, rgba(217, 37, 31, 1) 0%, rgba(233, 128, 30, 1) 100%)',
                     color: 'white',
                     boxShadow: '0 10px 25px rgba(217, 37, 31, 0.3)',
                     transform: 'translateY(0) translateZ(0)'
                   }}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3 transition-transform duration-500 ease-out group-hover/email:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                    Liên hệ ngay
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/email:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Partners Section */}
      <div className="bg-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4">
              Các đối tác chiến lược
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {[
              {
                src: "https://thienthuanphat.vn/Data/images/default/2-01.webp",
                alt: "Partner 1",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/4.webp",
                alt: "Partner 2",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/5-01.webp",
                alt: "Partner 3",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/6-01.webp",
                alt: "Partner 4",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/7-01.webp",
                alt: "Partner 5",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/8.webp",
                alt: "Partner 6",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/9-011.webp",
                alt: "Partner 7",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/dongnam1.webp",
                alt: "Partner 8",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/9-01.webp",
                alt: "Partner 9",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              },
              {
                src: "https://thienthuanphat.vn/Data/images/default/1-01.webp",
                alt: "Partner 10",
                fallback: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&auto=format&fit=crop"
              }
            ].map((partner, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <PartnerLogo
                  src={partner.src}
                  alt={partner.alt}
                  fallback={partner.fallback}
                />
              </div>
            ))}
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
