'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { Product, Category, productService, getProductImage } from '../../services/productService';

interface ProductsClientProps {
    initialCategories: Category[];
    initialProducts: Product[];
    initialTotal: number;
    initialCategory?: string;
}

export default function ProductsClient({
    initialCategories,
    initialProducts,
    initialTotal,
    initialCategory = ''
}: ProductsClientProps) {
    const { t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('category') || initialCategory;

    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [categories] = useState<Category[]>(initialCategories);
    const [total, setTotal] = useState(initialTotal);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const pageSize = 20;

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Update selected category when URL changes
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
            // Save to session storage
            sessionStorage.setItem('last_selected_category', categoryFromUrl);

            // Category is updated via URL, no need for manual parent expansion in the new menu
        } else if (!searchParams.get('category')) {
            // If URL has no category, check session storage for "back" navigation support
            const savedCategory = sessionStorage.getItem('last_selected_category');
            if (savedCategory) {
                // Restore from session storage
                const params = new URLSearchParams(searchParams.toString());
                params.set('category', savedCategory);
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }
    }, [categoryFromUrl, categories, searchParams, pathname, router]);

    // Helper function to get all child category slugs recursively
    const getAllCategorySlugs = (slug: string, categoryList: Category[]): string[] => {
        const slugs: string[] = [slug];

        const findAndCollect = (currentSlug: string, list: Category[]): boolean => {
            for (const cat of list) {
                if (cat.slug === currentSlug) {
                    // Found the category, now collect all its descendants
                    const collectDescendants = (c: Category) => {
                        if (c.children && c.children.length > 0) {
                            c.children.forEach(child => {
                                slugs.push(child.slug);
                                collectDescendants(child);
                            });
                        }
                    };
                    collectDescendants(cat);
                    return true;
                }
                if (cat.children && cat.children.length > 0) {
                    if (findAndCollect(currentSlug, cat.children)) return true;
                }
            }
            return false;
        };

        findAndCollect(slug, categoryList);
        return Array.from(new Set(slugs)); // Ensure unique slugs
    };

    // Helper to get path of categories for breadcrumb
    const getCategoryPath = (slug: string, categoryList: Category[]): Category[] => {
        for (const cat of categoryList) {
            if (cat.slug === slug) {
                return [cat];
            }
            if (cat.children && cat.children.length > 0) {
                const subPath = getCategoryPath(slug, cat.children);
                if (subPath.length > 0) {
                    return [cat, ...subPath];
                }
            }
        }
        return [];
    };

    const categoryPath = selectedCategory ? getCategoryPath(selectedCategory, categories) : [];

    // Fetch products when filters change
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const categorySlugs = selectedCategory
                    ? getAllCategorySlugs(selectedCategory, categories)
                    : undefined;

                const result = await productService.getProducts(
                    currentPage,
                    pageSize,
                    categorySlugs,
                    searchQuery || undefined
                );
                setProducts(result.data);
                setTotal(result.total);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, searchQuery, currentPage, categories]);

    const handleCategoryChange = (categorySlug: string) => {
        const newCategory = categorySlug === selectedCategory ? '' : categorySlug;
        setSelectedCategory(newCategory);
        setCurrentPage(1);

        // Update session storage
        if (newCategory) {
            sessionStorage.setItem('last_selected_category', newCategory);
        } else {
            sessionStorage.removeItem('last_selected_category');
        }

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        if (newCategory) {
            params.set('category', newCategory);
        } else {
            params.delete('category');
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div>
            {/* Page Header */}
            <div className="sub_page_head relative w-full overflow-hidden">
                <Image
                    src="/images/careers-page/banner.png"
                    alt="Banner"
                    width={1200}
                    height={400}
                    className="w-full h-auto object-cover min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]"
                    style={{ display: 'block' }}
                    priority={true}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-3 sm:px-4 md:px-8 lg:px-12 overflow-hidden" style={{ zIndex: 10 }}>
                    <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto">
                        <h2
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
                            {t('product.title')}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div id="sub_menu" className="min-h-[36px] sm:min-h-[40px] md:min-h-[44px] flex items-stretch" style={{
                background: 'linear-gradient(130deg, rgba(64, 64, 64, 0.9) 0%, rgba(96, 96, 96, 0.9) 100%)'
            }}>
                <div className="w-full container mx-auto px-2 md:px-5 max-w-[1300px] flex items-stretch">
                    <nav className="flex items-stretch flex-wrap space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base w-full" aria-label="Breadcrumb">
                        <div className="flex items-stretch">
                            <Link
                                href="/"
                                className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span className="font-medium whitespace-nowrap">{t('nav.home')}</span>
                            </Link>
                        </div>

                        <div className="flex items-stretch">
                            <div className="flex items-center mr-1 sm:mr-2">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {selectedCategory ? (
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
                                >
                                    <span className="font-medium whitespace-nowrap">{t('product.title')}</span>
                                </button>
                            ) : (
                                <span className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 font-medium whitespace-nowrap">
                                    {t('product.title')}
                                </span>
                            )}
                        </div>

                        {categoryPath.map((pathCat, idx) => (
                            <div key={pathCat.id} className="flex items-stretch">
                                <div className="flex items-center mr-1 sm:mr-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {idx === categoryPath.length - 1 ? (
                                    <span className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 font-medium whitespace-nowrap">
                                        {pathCat.name}
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleCategoryChange(pathCat.slug)}
                                        className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
                                    >
                                        <span className="font-medium whitespace-nowrap">{pathCat.name}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Horizontal Category Menu */}
            <div className="bg-white border-b border-gray-100 sticky top-0 lg:top-[70px] z-[50] shadow-sm">
                <div className="container mx-auto px-4 max-w-[1300px]">
                    <div className="flex items-center justify-center overflow-x-auto lg:overflow-visible lg:flex-wrap scrollbar-hide no-scrollbar py-4 px-2">
                        {/* All Products Item */}
                        <div
                            className="relative flex-shrink-0 group flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-14 border-r border-gray-100 last:border-r-0 cursor-pointer"
                            onClick={() => {
                                handleCategoryChange('');
                                setExpandedCategory(null);
                            }}
                        >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${selectedCategory === '' ? 'bg-[#bb252d] text-white shadow-md' : 'bg-gray-50 text-gray-500 group-hover:bg-[#bb252d] group-hover:text-white group-hover:shadow-md'}`}>
                                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${selectedCategory === '' ? 'text-[#bb252d]' : 'text-gray-500 group-hover:text-[#bb252d]'}`}>
                                {t('product.all')}
                            </span>
                        </div>

                        {/* Category Items */}
                        {categories.map((parentCategory) => {
                            const isSelected = selectedCategory === parentCategory.slug ||
                                (parentCategory.children && parentCategory.children.some(c => c.slug === selectedCategory)) ||
                                (parentCategory.children && parentCategory.children.some(c => c.children && c.children.some(gc => gc.slug === selectedCategory)));

                            const childCategories = parentCategory.children || [];

                            return (
                                <div
                                    key={parentCategory.id}
                                    className="relative flex-shrink-0 group flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-14 border-r border-gray-100 last:border-r-0 cursor-pointer"
                                    onMouseEnter={() => isDesktop && setExpandedCategory(parentCategory.slug)}
                                    onMouseLeave={() => isDesktop && setExpandedCategory(null)}
                                    onClick={(e) => {
                                        if (!isDesktop && childCategories.length > 0) {
                                            e.preventDefault();
                                            setExpandedCategory(expandedCategory === parentCategory.slug ? null : parentCategory.slug);
                                        } else {
                                            handleCategoryChange(parentCategory.slug);
                                            // Close mobile menu if it's a leaf or parent with no children
                                            if (childCategories.length === 0) setExpandedCategory(null);
                                        }
                                    }}
                                >
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${isSelected ? 'bg-[#bb252d] text-white shadow-md' : 'bg-gray-50 text-gray-500 group-hover:bg-[#bb252d] group-hover:text-white group-hover:shadow-md'}`}>
                                        {/* Dynamic Icon based on slug */}
                                        {(() => {
                                            const iconProps = { className: "w-6 h-6 sm:w-8 sm:h-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" };
                                            switch (parentCategory.slug) {
                                                case 'thuc-pham':
                                                    return <svg {...iconProps}><path d="M3 11c0-4.418 3.582-8 8-8s8 3.582 8 8M3 11h18M3 11v7a2 2 0 002 2h14a2 2 0 002-2v-7M9 11v3M15 11v3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'keo':
                                                    return <svg {...iconProps}><path d="M16 16c-2 2-5 2-7 0s-2-5 0-7 5-2 7 0M9 9l-4-4M15 15l4 4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'mon-an-vat':
                                                    return <svg {...iconProps}><path d="M17 18a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h12zM9 9a2 2 0 100-4 2 2 0 000 4zM15 15a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'bodycare':
                                                    return <svg {...iconProps}><path d="M9 5h6a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zM9 5V3a1 1 0 011-1h4a1 1 0 011 1v2M12 11v4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'facial-skincare':
                                                    return <svg {...iconProps}><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 10h.01M16 10h.01M9 15c1 1 5 1 6 0" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'sua':
                                                    return <svg {...iconProps}><path d="M9 20h6M7 8l2-4h6l2 4M7 8v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'thuc-pham-chuc-nang':
                                                    return <svg {...iconProps}><path d="M10 10l4 4M14 10l-4 4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 9l4.5-4.5a3 3 0 014.24 0l6.36 6.36a3 3 0 010 4.24l-4.5 4.5a3 3 0 01-4.24 0L4.5 13.24a3 3 0 010-4.24z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                case 'hoa-my-pham':
                                                    return <svg {...iconProps}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                                default:
                                                    return <svg {...iconProps}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                                            }
                                        })()}
                                    </div>
                                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-colors duration-300 ${isSelected ? 'text-[#bb252d]' : 'text-gray-500 group-hover:text-[#bb252d]'}`}>
                                        {parentCategory.name}
                                    </span>

                                    {/* Desktop Dropdown Menu - Visible on Hover */}
                                    {isDesktop && childCategories.length > 0 && (
                                        <div
                                            className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[60] w-64 transition-all duration-300 
                                                ${expandedCategory === parentCategory.slug
                                                    ? 'opacity-100 visible'
                                                    : 'opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:animate-fadeInUp'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                                                {childCategories.map((child) => (
                                                    <div key={child.id} className="group/child">
                                                        <button
                                                            onClick={() => handleCategoryChange(child.slug)}
                                                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === child.slug ? 'bg-[#bb252d] text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                                                        >
                                                            <span>{child.name}</span>
                                                            {child.children && child.children.length > 0 && (
                                                                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            )}
                                                        </button>

                                                        {/* Level 3 Submenu */}
                                                        {child.children && child.children.length > 0 && (
                                                            <div className="hidden group-hover/child:block pl-4 pb-2 space-y-1">
                                                                {child.children.map((grandChild) => (
                                                                    <button
                                                                        key={grandChild.id}
                                                                        onClick={() => handleCategoryChange(grandChild.slug)}
                                                                        className={`w-full text-left px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${selectedCategory === grandChild.slug ? 'text-[#bb252d] bg-[#bb252d]/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                                                                    >
                                                                        • {grandChild.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Hierarchical Submenu */}
                    {!isDesktop && expandedCategory && (
                        <div className="flex flex-col border-t border-gray-50 bg-gray-50/10">
                            {/* Level 2 Submenu */}
                            <div className="py-3 px-2 overflow-x-auto scrollbar-hide flex gap-2 animate-fadeInUp">
                                {categories.find(c => c.slug === expandedCategory)?.children?.map(child => (
                                    <button
                                        key={child.id}
                                        onClick={() => handleCategoryChange(child.slug)}
                                        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 
                                            ${(selectedCategory === child.slug || (child.children && child.children.some(gc => gc.slug === selectedCategory)))
                                                ? 'bg-[#bb252d] text-white'
                                                : 'bg-white border border-gray-200 text-gray-600'}`}
                                    >
                                        {child.name}
                                    </button>
                                ))}
                            </div>

                            {/* Level 3 Submenu - Only show if current selection or path is in an L2 item that has children */}
                            {(() => {
                                const activeL2 = categories
                                    .find(c => c.slug === expandedCategory)?.children
                                    ?.find(child => selectedCategory === child.slug || (child.children && child.children.some(gc => gc.slug === selectedCategory)));

                                if (activeL2 && activeL2.children && activeL2.children.length > 0) {
                                    return (
                                        <div className="py-2.5 px-3 border-t border-gray-50 overflow-x-auto scrollbar-hide flex gap-3 animate-fadeInUp bg-white">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase py-1 border-r border-gray-200 pr-2 flex-shrink-0">
                                                {activeL2.name}
                                            </span>
                                            {activeL2.children.map(grandChild => (
                                                <button
                                                    key={grandChild.id}
                                                    onClick={() => handleCategoryChange(grandChild.slug)}
                                                    className={`flex-shrink-0 text-xs py-1 transition-all duration-200 whitespace-nowrap
                                                        ${selectedCategory === grandChild.slug ? 'text-[#bb252d] font-bold underline decoration-2 underline-offset-4' : 'text-gray-500 font-medium'}`}
                                                >
                                                    {grandChild.name}
                                                </button>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="bg-gray-50 py-12">
                <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
                    <div className="flex flex-col gap-8 lg:items-start">
                        {/* Sidebar - Removed Categories, keeping only filter badge if needed or search */}

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('product.search.placeholder')}
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb252d] focus:border-transparent transition-all duration-300 hover:border-[#bb252d]"
                                    />
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#bb252d] transition-colors duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </form>

                            {/* Results Count */}
                            <div className="mb-6 text-gray-600 flex items-center gap-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#bb252d] text-white text-sm font-medium">
                                    {products.length}
                                </span>
                                <span>/ {total} {t('product.results')}</span>
                            </div>

                            {/* Loading State with Premium Skeleton Animation */}
                            {loading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => {
                                        const isLeftLeaf = i % 2 === 0;
                                        const leafClass = isLeftLeaf ? "rounded-[3rem_0rem_3rem_0rem]" : "rounded-[0rem_3rem_0rem_3rem]";

                                        return (
                                            <div
                                                key={i}
                                                className={`bg-white ${leafClass} shadow-lg overflow-hidden relative`}
                                                style={{
                                                    animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`
                                                }}
                                            >
                                                {/* Shimmer overlay */}
                                                <div className="absolute inset-0 z-10">
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                                        style={{
                                                            animation: 'shimmer 1.5s infinite',
                                                            transform: 'skewX(-20deg)',
                                                        }}
                                                    />
                                                </div>

                                                {/* Image skeleton */}
                                                <div className="relative h-64 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 overflow-hidden">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 rounded-full bg-gray-200/80 flex items-center justify-center">
                                                            <svg
                                                                className="w-8 h-8 text-gray-300 animate-pulse"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {/* Decorative circles */}
                                                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#bb252d]/5 rounded-full animate-pulse" />
                                                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#bb252d]/5 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                                                </div>

                                                {/* Content skeleton */}
                                                <div className="p-6 space-y-4">
                                                    {/* Title skeleton */}
                                                    <div className="space-y-2">
                                                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-4/5" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                                                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/5" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.1s' }} />
                                                    </div>

                                                    {/* Description skeleton */}
                                                    <div className="space-y-2">
                                                        <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full w-full" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.2s' }} />
                                                        <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full w-4/5" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.3s' }} />
                                                    </div>

                                                    {/* Button skeleton */}
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <div className="h-4 bg-gradient-to-r from-[#bb252d]/20 via-[#bb252d]/10 to-[#bb252d]/20 rounded-full w-24" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.4s' }} />
                                                        <div className="w-4 h-4 rounded-full bg-[#bb252d]/10" style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.5s' }} />
                                                    </div>
                                                </div>

                                                {/* Loading indicator */}
                                                <div className="absolute top-3 right-3">
                                                    <div className="w-6 h-6 rounded-full border-2 border-[#bb252d]/20 border-t-[#bb252d] animate-spin" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Products Grid */}
                            {!loading && products.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product, index) => {
                                        // Alternating leaf patterns like news page
                                        const isLeftLeaf = index % 2 === 0;
                                        const leafClass = isLeftLeaf ? "rounded-[3rem_0rem_3rem_0rem]" : "rounded-[0rem_3rem_0rem_3rem]";
                                        const cornerClass = isLeftLeaf ? "rounded-bl-full" : "rounded-br-full";
                                        const cornerPosition = isLeftLeaf ? "top-0 right-0" : "top-0 left-0";

                                        return (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.slug}`}
                                                className={`bg-white ${leafClass} shadow-[0_8px_25px_-8px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15),0_12px_24px_-8px_rgba(0,0,0,0.1)] hover:scale-[1.02] cursor-pointer relative group`}
                                                style={{
                                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                                }}
                                            >
                                                {/* Decorative corner like news page */}
                                                <div className={`absolute ${cornerPosition} w-16 h-16 bg-[#bb252d] opacity-[0.03] ${cornerClass}`}></div>

                                                <div className="relative h-64 overflow-hidden bg-gray-50">
                                                    <Image
                                                        src={getProductImage(product)}
                                                        alt={product.image?.alternativeText || product.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.05] via-transparent to-transparent"></div>
                                                </div>

                                                <div className="p-6 bg-white flex flex-col justify-between flex-grow">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-[#bb252d] mb-2 line-clamp-2 transition-all duration-500 group-hover:scale-[1.01]">
                                                            {product.name}
                                                        </h3>
                                                        {product.summary && (
                                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                                                {product.summary}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center text-[#bb252d] font-semibold text-sm transition-all duration-500 group-hover:translate-x-1">
                                                        {t('product.viewDetail')}
                                                        <svg className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Shimmer effect overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {/* No Results */}
                            {!loading && products.length === 0 && (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">{t('product.noResults')}</h3>
                                    <p className="mt-2 text-gray-600">{t('product.noResults.desc')}</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {!loading && totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                                        >
                                            {t('product.pagination.prev')}
                                        </button>

                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${currentPage === pageNum
                                                        ? 'bg-[#bb252d] text-white shadow-lg'
                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                                        >
                                            {t('product.pagination.next')}
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
