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
      <div className="sub_page_head relative w-full overflow-hidden">
        <Image 
          src="https://www.sahmyook.co.kr/theme/syfood/img/intro/intro_bg_01.png" 
          alt="Banner"
          width={1200}
          height={400}
          className="w-full h-auto object-cover min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]"
          style={{ display: 'block' }}
          priority={true}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-3 sm:px-4 md:px-8 lg:px-12 overflow-hidden" style={{
          zIndex: 10
        }}>
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto">
            <h2 
              id="subpage_title" 
              className="text-white text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1.5 sm:mb-2 md:mb-3 lg:mb-5 leading-tight break-words hyphens-auto" 
              style={{
                color: '#ffffff',
                textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                position: 'relative',
                zIndex: 20,
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {title}
            </h2>
            {description && (
              <p 
                className="text-white text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed break-words" 
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                  position: 'relative',
                  zIndex: 20,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div id="sub_menu" className="min-h-[44px] sm:min-h-[48px] md:min-h-[52px] flex items-stretch" style={{
        background: 'linear-gradient(130deg, rgba(64, 64, 64, 0.9) 0%, rgba(96, 96, 96, 0.9) 100%)'
      }}>
        <div className="w-full container mx-auto px-2 md:px-5 max-w-[1300px] flex items-stretch">
          <nav className="flex items-stretch flex-wrap space-x-1 xs:space-x-1.5 sm:space-x-2 md:space-x-3 text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg w-full" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-stretch">
                {index > 0 && (
                  <div className="flex items-center mr-1 xs:mr-1.5 sm:mr-2 md:mr-3">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {item.href ? (
                  <a 
                    href={item.href} 
                    className="flex items-center text-white px-1.5 xs:px-2 sm:px-2.5 md:px-4 py-2.5 sm:py-3 md:py-4 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
                  >
                    {index === 0 && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                      </svg>
                    )}
                    <span className="font-semibold text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">{item.label}</span>
                  </a>
                ) : (
                  <span 
                    className="text-white font-medium px-1.5 xs:px-2 sm:px-2.5 md:px-4 py-2.5 sm:py-3 md:py-4 rounded cursor-pointer transition-all duration-200 flex items-center hover:bg-white/20 hover:text-white" 
                  >
                    {item.label === "Về chúng tôi" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Tin tức" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Liên hệ" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    )}
                    {item.label === "Đối tác" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {item.label === "Tuyển dụng" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                      </svg>
                    )}
                    {item.label === "Hệ sinh thái" && (
                      <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 mr-1 xs:mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                    <span className="font-semibold text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">{item.label}</span>
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