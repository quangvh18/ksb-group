'use client';

import React from 'react';

const FloatingContactButtons: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
            {/* Facebook Button */}
            <div className="relative group">
                {/* Ripple effect circles for Facebook */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute h-12 w-12 rounded-full bg-[#1877F2] opacity-75 animate-zalo-ripple"></div>
                    <div className="absolute h-12 w-12 rounded-full bg-[#1877F2] opacity-50 animate-zalo-ripple-delay"></div>
                </div>

                <a
                    href="https://www.facebook.com/profile.php?id=61584067275586"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Liên hệ Facebook"
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] animate-zalo-float animate-zalo-shake"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0D60D8] opacity-90"></div>
                    <svg
                        className="relative h-7 w-7 text-white transition-transform group-hover:scale-110"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
            </div>

            {/* Zalo Button */}
            <div className="relative zalo-button-wrapper">
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
        </div>
    );
};

export default FloatingContactButtons;
