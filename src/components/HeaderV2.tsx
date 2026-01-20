'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';


export default function HeaderV2() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/v2/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className={`bg-white w-full sticky top-0 z-[1000] transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>

            {/* Main Header */}
            <div className="container mx-auto max-w-[1300px] px-4 border-b border-gray-100">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4">
                    {/* Logo */}
                    <Link href="/v2/products" className="flex-shrink-0">
                        <div className="flex items-center pl-4">
                            <Image
                                src="/images/logo.png"
                                alt="KSB Group"
                                width={140}
                                height={45}
                                priority
                                className="h-10 md:h-12 w-auto"
                            />
                        </div>
                    </Link>

                    {/* Right Side - Search & Mobile Menu */}
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        {/* Search Bar - Moved to Right */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden md:flex max-w-[400px] w-full"
                        >
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('v2.search.placeholder') || 'Tìm kiếm sản phẩm...'}
                                    className="w-full h-11 px-5 pr-12 bg-gray-100 border-2 border-transparent rounded-full text-sm focus:outline-none focus:border-[#bb252d] focus:bg-white transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-[#bb252d] text-white hover:bg-[#a31f26] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-3">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('v2.search.placeholder') || 'Tìm kiếm sản phẩm...'}
                                className="w-full h-10 px-4 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#bb252d]"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-[1300px] px-4">
                    <ul className="hidden md:flex items-center h-12 gap-1">
                        {/* All Menu Button */}
                        <li className="relative">
                            <button
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                {t('v2.allMenu') || 'Toàn bộ'}
                            </button>
                        </li>

                        <li className="h-6 w-px bg-gray-200 mx-2" />


                        {/* Best Products */}
                        <li>
                            <Link
                                href="/v2/products?sort=best"
                                className="flex items-center px-4 py-2 text-gray-700 font-medium hover:text-[#bb252d] hover:bg-red-50 rounded-lg transition-colors"
                            >
                                {t('v2.bestProducts') || 'Bán chạy'}
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-[998] md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-white z-[999] shadow-2xl md:hidden overflow-y-auto">
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-[#bb252d]">
                            <Image
                                src="/images/logo.png"
                                alt="KSB Group"
                                width={100}
                                height={32}
                                className="h-8 w-auto brightness-0 invert"
                            />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white hover:bg-white/20 rounded-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="p-4">
                            <div className="space-y-1">
                                <Link
                                    href="/v2/products?sort=best"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">⭐</span>
                                    {t('v2.bestProducts') || 'Bán chạy'}
                                </Link>
                            </div>

                            <div className="my-4 h-px bg-gray-200" />

                            {/* Categories */}
                            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {t('v2.categories') || 'Danh mục'}
                            </h3>
                            <div className="space-y-1">
                                <Link
                                    href="/v2/products?category=thuc-pham"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">🍜</span>
                                    {t('v2.category.food') || 'Thực phẩm'}
                                </Link>
                                <Link
                                    href="/v2/products?category=hoa-my-pham"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">💄</span>
                                    {t('v2.category.cosmetics') || 'Hóa mỹ phẩm'}
                                </Link>
                                <Link
                                    href="/v2/products?category=thuc-pham-chuc-nang"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">💊</span>
                                    {t('v2.category.supplements') || 'Thực phẩm chức năng'}
                                </Link>
                                <Link
                                    href="/v2/products?category=sua"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">🥛</span>
                                    {t('v2.category.milk') || 'Sữa'}
                                </Link>
                            </div>

                            <div className="my-4 h-px bg-gray-200" />

                            {/* Account Links */}
                            <div className="space-y-1">
                                <Link
                                    href="/login"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {t('v2.login') || 'Đăng nhập'}
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t('v2.support') || 'Hỗ trợ'}
                                </Link>
                            </div>
                        </nav>

                        {/* Back to Main Site */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2e3a36] text-white rounded-lg hover:bg-[#1a2320] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('v2.backToMain') || 'Quay về trang chính'}
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
