import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import "../../styles/about.css";

interface ValueCard {
  title: string;
  subtitle: string;
  content: string[];
  titleColor: "green" | "blue";
}

const valuesData: ValueCard[] = [
  {
    title: "Sứ mệnh",
    subtitle: "Mang đến sản phẩm chất lượng cao, sáng tạo và bền vững",
    content: [
      "Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao, sáng tạo và bền vững, được sản xuất và phân phối một cách chuyên nghiệp, góp phần xây dựng một giá trị thực về sức khỏe và kinh tế cho nhân loại."
    ],
    titleColor: "green"
  },
  {
    title: "Giá trị cốt lõi",
    subtitle: "Kỉ luật, sáng tạo, bứt phá",
    content: [
      "KSB GROUP phát triển dựa trên 3 giá trị cốt lõi: Kỉ luật, sáng tạo, bứt phá. Chúng tôi đề cao tính kỷ luật để đảm bảo sự chuyên nghiệp và hiệu quả; nuôi dưỡng tinh thần sáng tạo để không ngừng đổi mới, thích ứng với thị trường; và khát khao bứt phá để vươn xa, chinh phục những cột mốc lớn hơn mỗi ngày."
    ],
    titleColor: "blue"
  },
  {
    title: "Tầm nhìn",
    subtitle: "Tập đoàn đa quốc gia hàng đầu trong lĩnh vực sản xuất và phân phối",
    content: [
      "Trở thành tập đoàn đa quốc gia hàng đầu trong lĩnh vực sản xuất và phân phối các sản phẩm xanh, kết hợp nhập khẩu tinh hoa thế giới và xuất khẩu sản phẩm lành mạnh, góp phần nâng cao giá trị kinh tế và sức khỏe cho nhân loại."
    ],
    titleColor: "blue"
  },
  {
    title: "Hệ sinh thái",
    subtitle: "Đa dạng lĩnh vực hoạt động",
    content: [
      "KSB GROUP hoạt động đa dạng trong các lĩnh vực: Hóa - Mỹ phẩm, Xuất nhập khẩu thực phẩm & hàng tiêu dùng, và Thực phẩm đông lạnh. Với hệ thống chi nhánh và cơ sở vật chất chiến lược trải dài, chúng tôi kiến tạo nên những chuỗi giá trị vượt trội."
    ],
    titleColor: "green"
  }
];

export const metadata: Metadata = {
  title: "Về chúng tôi - KSB Group",
  description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.",
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Về chúng tôi", isActive: true }
  ];

  return (
    <div id="wrapper">
      <div className="sub_page intro intro_01">
        <PageHeader 
          title="Về chúng tôi"
          description="Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững."
          breadcrumbItems={breadcrumbItems}
        />

        {/* Vietnamese Introduction Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
            <div className="text-center space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight" data-aos="fade-up" data-aos-delay="100">
                Tập đoàn KSB - Nền tảng vững mạnh<br />
                với hệ sinh thái kinh doanh bền vững
              </h2>
              
              <p className="text-lg text-black leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh, kế thừa và phát triển từ tâm huyết của Công ty TNHH XNK Thiên Thuận Phát. Với hơn một thập kỷ miệt mài gieo trồng giá trị, chúng tôi đã vun đắp một hệ sinh thái kinh doanh bền vững, với những ngành nghề đa dạng trong các lĩnh vực khác nhau, vươn mình trở thành biểu tượng của sự uy tín và chất lượng.
              </p>
            </div>
          </div>
        </div>

        {/* Company Introduction Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Company Image with Shadow Effect - Left Side */}
              <div className="relative order-2 lg:order-1" data-aos="fade-right" data-aos-delay="200">
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
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight" data-aos="fade-left" data-aos-delay="100">
                  Sứ mệnh, Giá trị cốt lõi và Tầm nhìn
                </h2>
                
                <p className="text-lg text-black leading-relaxed" data-aos="fade-left" data-aos-delay="200">
                  Từ nền tảng vững chắc của hoạt động buôn bán, bán lẻ và nhập khẩu độc quyền, 
                  KSB GROUP đã kiên cường kiến tạo vị thế dẫn đầu, đồng thời định hình một chuẩn mực mới 
                  trong ngành sản xuất bánh kẹo.
                </p>
                
                <p className="text-lg text-black leading-relaxed" data-aos="fade-left" data-aos-delay="300">
                  KSB đã chạm tới mọi miền đất nước, mở rộng tầm ảnh hưởng mạnh mẽ với hệ thống chi nhánh 
                  và cơ sở vật chất chiến lược trải dài. Chúng tôi không chỉ là đối tác nhập khẩu được tin cậy, 
                  mà còn là người kiến tạo nên những chuỗi giá trị vượt trội.
                </p>
                
                <p className="text-lg text-black leading-relaxed" data-aos="fade-left" data-aos-delay="400">
                  KSB cam kết không ngừng vươn xa, kiến tạo giá trị và khẳng định vững chắc vị thế quyền lực 
                  của một tập đoàn hàng đầu trên bản đồ kinh tế Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
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
                        {/* Icon */}
                        <div className={`absolute top-4 right-4 w-8 h-8 ${colorScheme.icon} transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`}>
                          {index === 0 && (
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                            </svg>
                          )}
                          {index === 1 && (
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          )}
                          {index === 2 && (
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                            </svg>
                          )}
                          {index === 3 && (
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </div>
                        
                    <h3 className="text-xl font-bold mb-3 text-[#c9184a] text-center transition-all duration-300 group-hover:text-[#a0153a] group-hover:scale-110">
                        {item.title}
                      </h3>
                        <h5 className="text-sm font-medium text-black leading-relaxed h-[60px] flex items-center transition-all duration-300 group-hover:text-gray-700">
                          {item.subtitle}
                        </h5>
                    </div>
                      <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white">
                      {item.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-sm leading-relaxed text-black text-left transition-all duration-300 group-hover:text-gray-800 group-hover:font-medium">
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
      </div>
    </div>
  );
}
