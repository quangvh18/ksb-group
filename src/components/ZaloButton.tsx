'use client';

import React from 'react';

const ZaloButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 zalo-button-wrapper">
      {/* Ripple effect circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full bg-[#0068FF] opacity-75 animate-zalo-ripple"></div>
        <div className="absolute h-12 w-12 rounded-full bg-[#0068FF] opacity-50 animate-zalo-ripple-delay"></div>
      </div>
      
      {/* Main button */}
      <a
        href="https://zalo.me/0911009665"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ Zalo"
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0068FF] animate-zalo-float animate-zalo-shake group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0068FF] to-[#0052CC] animate-zalo-glow"></div>
        <img
          src="https://cdn.divineshop.vn/static/9a3807bd0aeb1523d5088f182f8b69b6.svg"
          alt="Zalo"
          className="relative h-7 w-7 transition-transform group-hover:scale-110"
        />
      </a>
    </div>
  );
};

export default ZaloButton;

