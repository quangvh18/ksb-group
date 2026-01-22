'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { Category, productService } from '../services/productService';

export default function HeaderV2() {
    const { t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [isScrolled, setIsScrolled] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);

    const activeCategory = searchParams.get('category');
    const activeSort = searchParams.get('sort');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await productService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Sync search query state with URL
    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);

            // Scroll to products section after navigation with retry
            const scrollToProducts = () => {
                const element = document.getElementById('all-products');
                if (element) {
                    const offset = 230;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            };

            // Try scrolling after short delay (for same page)
            setTimeout(scrollToProducts, 200);
            // Retry after longer delay (for page navigation)
            setTimeout(scrollToProducts, 600);
        } else {
            // If search input is empty, clear search params and show all products
            router.push('/products');
        }
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname === '/products') {
            const element = document.getElementById(id);
            if (element) {
                e.preventDefault();
                const offset = 120; // Height of sticky header area
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                setIsMenuOpen(false);
            }
        }
    };

    return (
        <header className={`bg-white w-full sticky top-0 z-[1000] transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>

            {/* Main Header */}
            <div className="container mx-auto max-w-[1300px] px-4 border-b border-gray-100">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4">
                    {/* Logo */}
                    <Link href="/products" className="flex-shrink-0">
                        <div className="flex items-center pl-4">
                            <Image
                                src="/images/logo-v2.png"
                                alt="KSB Mall Group"
                                width={120}
                                height={60}
                                priority
                                className="h-12 md:h-16 w-auto"
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
                                    className="w-full h-11 px-5 pr-12 bg-gray-100 border-2 border-transparent rounded-full text-sm focus:outline-none focus:border-[#bb252d] focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
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
            <nav className="bg-white border-t border-gray-100 relative">
                <div className="container mx-auto max-w-[1300px] px-4">
                    <ul className="hidden md:flex items-center h-12 gap-0">
                        {/* All Products Menu */}
                        <li>
                            <Link
                                href="/products"
                                onClick={(e) => scrollToSection(e, 'all-products')}
                                className={`flex items-center gap-2 px-5 py-3 font-bold transition-all duration-300 h-12 border-b-2
                                    ${pathname === '/products' && !activeCategory && !activeSort && !searchParams.get('search')
                                        ? 'text-[#bb252d] border-[#bb252d] bg-red-50/30'
                                        : 'text-gray-900 border-transparent hover:text-[#bb252d] hover:bg-gray-50'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                {t('v2.allMenu') || 'Tất cả sản phẩm'}
                            </Link>
                        </li>

                        <li className="h-6 w-px bg-gray-200 mx-2" />

                        {/* Best Products */}
                        <li>
                            <Link
                                href="/products?sort=best"
                                onClick={(e) => scrollToSection(e, 'best-sellers')}
                                className={`flex items-center px-5 py-3 text-sm font-bold transition-all duration-300 h-12 border-b-2
                                    ${activeSort === 'best'
                                        ? 'text-[#bb252d] border-[#bb252d] bg-gray-50'
                                        : 'text-gray-700 border-transparent hover:text-[#bb252d] hover:bg-gray-50'}`}
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
                                src="/images/logo-v2.png"
                                alt="KSB Mall Group"
                                width={90}
                                height={45}
                                className="h-10 w-auto brightness-0 invert"
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
                                    href="/products"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={(e) => scrollToSection(e, 'all-products')}
                                >
                                    <span className="text-xl">🏪</span>
                                    {t('v2.allMenu') || 'Tất cả sản phẩm'}
                                </Link>
                                <Link
                                    href="/products?sort=best"
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold hover:bg-red-50 hover:text-[#bb252d] rounded-lg"
                                    onClick={(e) => scrollToSection(e, 'best-sellers')}
                                >
                                    <span className="text-xl">⭐</span>
                                    {t('v2.bestProducts') || 'Bán chạy'}
                                </Link>
                            </div>

                            <div className="my-4 h-px bg-gray-200" />

                            {/* Dynamic Categories Accordion */}
                            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {t('v2.categories') || 'Danh mục'}
                            </h3>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex flex-col">
                                        <div className="flex items-center">
                                            <Link
                                                href={`/products?category=${category.slug}`}
                                                className="flex-1 px-4 py-3 text-gray-700 font-semibold hover:text-[#bb252d] rounded-l-lg"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {category.name}
                                            </Link>
                                            {category.children && category.children.length > 0 && (
                                                <button
                                                    onClick={() => setExpandedMobileCat(expandedMobileCat === category.slug ? null : category.slug)}
                                                    className="p-3 text-gray-400 hover:text-[#bb252d]"
                                                >
                                                    <svg className={`w-4 h-4 transition-transform ${expandedMobileCat === category.slug ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {expandedMobileCat === category.slug && category.children && (
                                            <div className="ml-4 border-l-2 border-red-200 pl-2 py-1 space-y-1 bg-gray-50/50 rounded-r-lg transition-all duration-300">
                                                {category.children.map((child) => (
                                                    <div key={child.id}>
                                                        <Link
                                                            href={`/products?category=${child.slug}`}
                                                            className={`block px-4 py-2 text-sm transition-colors ${activeCategory === child.slug ? 'text-[#bb252d] font-bold' : 'text-gray-600 hover:text-[#bb252d]'}`}
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                        {child.children && child.children.length > 0 && (
                                                            <div className="ml-4 space-y-1 border-l border-gray-200">
                                                                {child.children.map((gc) => (
                                                                    <Link
                                                                        key={gc.id}
                                                                        href={`/products?category=${gc.slug}`}
                                                                        className={`block px-4 py-1.5 text-xs transition-colors ${activeCategory === gc.slug ? 'text-[#bb252d] font-semibold' : 'text-gray-500 hover:text-[#bb252d]'}`}
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                    >
                                                                        • {gc.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
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
                        <div className="p-4 border-t bg-gray-50">
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
