'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#2e3a36] relative w-full lg:bg-[rgba(46,58,54,0.5)] lg:fixed lg:top-0 lg:z-[1000]">
      <div className="relative mx-auto">
         <nav className="relative w-full max-w-[1300px] mx-auto px-2 md:px-5 flex justify-between">
           <h2 className="absolute text-[0] leading-[0] overflow-hidden text-[30px] mt-[20px] mb-[10px]">KSB GROUP</h2>
           
           <div className="float-left flex items-center h-[70px] px-0">
             <Link href="/">
               <Image 
                 src="https://thienthuanphat.vn/Data/images/banner-cn/logo/fa-ksb.webp" 
                 alt="KSB Group Logo" 
                 width={120}
                 height={40}
                 priority={true}
                 className="h-10 w-auto" 
               />
             </Link>
           </div>
           
           {/* Desktop Navigation - Hidden on mobile */}
           <div className="mx-auto relative hidden lg:block">
            <ul className="mb-0 text-[1.1em] p-0 m-0 list-none block">
               <li className="float-left leading-[70px] p-0 relative z-[999]">
                 <Link href="/" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.home') || 'Trang chủ'}
                 </Link>
               </li>
               <li 
                 className="float-left leading-[70px] p-0 relative z-[998]"
                 onMouseEnter={() => setIsAboutHovered(true)}
                 onMouseLeave={() => setIsAboutHovered(false)}
               >
                 <Link href="/about" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.about')}
                 </Link>
                 
                 {/* Sub Menu */}
                 {isAboutHovered && (
                   <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg min-w-[180px] z-[1000]">
                     <Link 
                       href="/about" 
                       className="block px-5 py-3 text-lg text-gray-800 hover:bg-[#c9184a] hover:text-white transition-all duration-200 border-b border-gray-100"
                     >
                       {t('nav.about')}
                     </Link>
                     <Link 
                       href="/about/organization" 
                       className="block px-5 py-3 text-lg text-gray-800 hover:bg-[#c9184a] hover:text-white transition-all duration-200 last:rounded-b-lg"
                     >
                       {t('about.organization.title')}
                     </Link>
                   </div>
                 )}
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[997]">
                 <Link href="/ecosystem" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.ecosystem')}
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[996]">
                 <Link href="/news" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.news')}
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[995]">
                 <Link href="/careers" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.careers')}
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[994]">
                 <Link href="/partners" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.partners')}
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[993]">
                 <Link href="/contact" className="no-underline block font-bold px-5 text-white hover:bg-[#c9184a] hover:text-white transition-all duration-200">
                   {t('nav.contact')}
                 </Link>
               </li>
            </ul>
          </div>

          {/* Mobile Menu Button - Only visible on mobile and tablet */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-[#c9184a] rounded transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Right Section - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageToggle />
            
            <div className="bg-white h-[60px] py-[10px] px-[30px] rounded-b-[10px] shadow-[0px_3px_10px_0px_rgba(0,105,52,0.35)] flex items-center justify-center">
              <a href="https://shopthienthuanphat.com/" className="block">
                <span className="text-[#f02748] font-bold text-lg tracking-wide">KSB MALL</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#2e3a36] border-t border-white/20">
            <div className="px-4 py-6">
              <nav className="space-y-1">
                <Link 
                  href="/" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Trang chủ
                </Link>
                <div>
                  <button
                    onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)}
                    className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200 text-left flex items-center justify-between"
                  >
                    <span>Về chúng tôi</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isAboutMobileOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isAboutMobileOpen && (
                    <div className="ml-4 space-y-0 bg-white/10 rounded-b-lg overflow-hidden">
                      <Link 
                        href="/about" 
                        className="block px-5 py-3 text-lg text-white/80 hover:bg-[#c9184a] hover:text-white transition-all duration-200"
                        onClick={closeMenu}
                      >
                        {t('nav.about')}
                      </Link>
                      <Link 
                        href="/about/organization" 
                        className="block px-5 py-3 text-lg text-white/80 hover:bg-[#c9184a] hover:text-white transition-all duration-200 last:rounded-b-lg"
                        onClick={closeMenu}
                      >
                        {t('about.organization.title')}
                      </Link>
                    </div>
                  )}
                </div>
                <Link 
                  href="/ecosystem" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Hệ sinh thái
                </Link>
                <Link 
                  href="/news" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Tin tức
                </Link>
                <Link 
                  href="/careers" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Tuyển dụng
                </Link>
                <Link 
                  href="/partners" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Đối tác
                </Link>
                <Link 
                  href="/contact" 
                  className="block w-full px-4 py-4 text-white font-bold hover:bg-[#c9184a] transition-all duration-200"
                  onClick={closeMenu}
                >
                  Liên hệ
                </Link>
              </nav>
              
              {/* Mobile Social Links */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-4">
                  <a 
                    href="https://www.instagram.com/sahmyook_island/" 
                    target="_blank" 
                    className="p-3 bg-white rounded-full hover:bg-[#c9184a] transition-all duration-200"
                  >
                    <Image 
                      src="/images/insta-icon.png" 
                      alt="Instagram" 
                      width={24}
                      height={24}
                      className="w-6 h-6" 
                    />
                  </a>
                  <a 
                    href="https://shopthienthuanphat.com/"
                    className="p-3 bg-white rounded-full hover:bg-[#c9184a] transition-all duration-200"
                  >
                    <Image 
                      src="https://thienthuanphat.vn/Data/images/banner-cn/logo/fa-ksb.webp" 
                      alt="KSB Mall" 
                      width={60}
                      height={24}
                      className="w-15 h-6" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
