'use client';

import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer-bottom py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-5 border-t border-[#cfcfcf]">
      <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
        <div className="flex flex-wrap">
          
          {/* Logo Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4 sm:mb-6 md:mb-0 px-2 md:px-3">
            <Image 
              src="https://thienthuanphat.vn/Data/images/banner-cn/logo/fa-ksb.webp" 
              alt="KSB Group Logo"
              width={120}
              height={48}
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>
          
          {/* Company Info Section */}
          <div className="w-full sm:w-full md:w-full lg:w-1/2 mb-6 sm:mb-8 md:mb-6 lg:mb-0 order-3 sm:order-3 md:order-3 lg:order-2 px-2 md:px-3">
            <p className="text-left text-xs sm:text-sm md:text-sm leading-relaxed">
              <strong className="block mb-2 sm:mb-3">{t('footer.company')}</strong>
              <span className="block mb-2">
                <strong>{t('footer.address')}:</strong> {t('footer.address.detail')}
              </span>
              <span className="block mb-2">
                <strong>{t('footer.factory')}:</strong> {t('footer.factory.detail')}
              </span>
              <span className="block mt-3 text-[11px] sm:text-xs">
                ⓒ {t('footer.copyright')}
              </span>
            </p>
          </div>
          
          {/* Phone Section */}
          <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/6 mb-6 sm:mb-8 md:mb-0 order-2 sm:order-2 md:order-2 lg:order-3 px-2 md:px-3">
            <dl>
              <dt className="font-bold text-xs sm:text-sm md:text-sm mb-2 sm:mb-3">{t('footer.phone')}</dt>
              <dd className="text-xs sm:text-sm md:text-sm">
                <a href="tel:19001181" className="hover:underline hover:text-blue-600 block mb-1">{t('footer.phone.detail')}</a>
                <span className="text-[10px] sm:text-xs text-gray-600">{t('footer.phone.hours')}</span>
              </dd>
            </dl>
          </div>
          
          {/* Email & Website Section */}
          <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/6 mb-6 sm:mb-8 md:mb-0 order-2 sm:order-2 md:order-2 lg:order-4 px-2 md:px-3">
            <dl>
              <dt className="font-bold text-xs sm:text-sm md:text-sm mb-2 sm:mb-3">{t('footer.email')}</dt>
              <dd className="text-xs sm:text-sm md:text-sm">
                <a href="mailto:info@ksbgroup.vn" className="hover:underline hover:text-blue-600 block mb-1">
                  {t('footer.email.general')}
                </a>
                <a href="mailto:support@ksbgroup.vn" className="hover:underline hover:text-blue-600 block mb-1">
                  {t('footer.email.support')}
                </a>
                <a href="https://ksbgroup.vn" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 block">
                  {t('footer.website.detail')}
                </a>
              </dd>
            </dl>
          </div>
          
        </div>
      </div>
    </footer>
  );
}