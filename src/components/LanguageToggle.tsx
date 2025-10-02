'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="px-[10px]">
      <button 
        onClick={toggleLanguage}
        className="block py-[15px] px-[10px] bg-white rounded-b-[10px] no-underline hover:bg-gray-50 transition-colors"
        title={t('language.switch')}
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          {/* Globe icon with language indicator */}
          <div className="relative">
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            {/* Language indicator */}
            <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[8px] font-bold px-1 py-0.5 rounded-sm min-w-[14px] text-center">
              {language.toUpperCase()}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

