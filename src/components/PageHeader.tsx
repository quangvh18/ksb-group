import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbItems: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
}

export default function PageHeader({ title, description, breadcrumbItems }: PageHeaderProps) {
  return (
    <>
      {/* Banner Section */}
      <div className="sub_page_head relative">
        <Image 
          src="https://www.sahmyook.co.kr/theme/syfood/img/intro/intro_bg_01.png" 
          alt="Banner"
          width={1200}
          height={400}
          className="w-full h-auto"
          style={{ display: 'block' }}
          priority={true}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center" style={{
          paddingTop: '80px',
          paddingBottom: '40px',
          zIndex: 10
        }}>
          <h2 id="subpage_title" className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3" style={{
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            position: 'relative',
            zIndex: 20
          }}>
            <span title={title}>
              {title}
            </span>
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed" style={{
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            position: 'relative',
            zIndex: 20
          }}>{description}</p>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div id="sub_menu" className="py-2 sm:py-3" style={{
        background: 'linear-gradient(130deg, rgba(64, 64, 64, 0.9) 0%, rgba(96, 96, 96, 0.9) 100%)'
      }}>
        <div className="container mx-auto px-4 sm:px-5 w-full max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] sm:max-w-[750px]">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <div className="flex items-center mr-1 sm:mr-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {item.href ? (
                  <a 
                    href={item.href} 
                        className="flex items-center text-white hover:bg-[#780000] hover:text-white px-2 sm:px-3 rounded transition-all duration-200 cursor-pointer"
                    style={{
                      height: '48px',
                      marginTop: '-12px',
                      marginBottom: '-12px',
                      paddingTop: '12px',
                      paddingBottom: '12px'
                    }}
                  >
                    {index === 0 && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                      </svg>
                    )}
                    <span className="font-semibold text-lg">{item.label}</span>
                  </a>
                ) : (
                  <span 
                    className="text-white font-medium px-2 sm:px-3 rounded cursor-pointer hover:bg-[#780000] hover:text-white transition-all duration-200 flex items-center" 
                    style={{
                      height: '48px',
                      marginTop: '-12px',
                      marginBottom: '-12px',
                      paddingTop: '12px',
                      paddingBottom: '12px'
                    }}
                  >
                    {item.label === "Về chúng tôi" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Tin tức" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Liên hệ" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    )}
                    {item.label === "Đối tác" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Tuyển dụng" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                      </svg>
                    )}
                    {item.label === "Hệ sinh thái" && (
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                    <span className="font-semibold text-lg">{item.label}</span>
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
