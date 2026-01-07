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
    const pageSize = 20;

    // Update selected category when URL changes
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
            // Save to session storage
            sessionStorage.setItem('last_selected_category', categoryFromUrl);

            // Find and expand parent category if needed
            for (const parentCategory of categories) {
                if (parentCategory.slug === categoryFromUrl) {
                    setExpandedCategory(parentCategory.slug);
                    break;
                }
                const childCategories = parentCategory.children || [];
                for (const child of childCategories) {
                    if (child.slug === categoryFromUrl) {
                        setExpandedCategory(parentCategory.slug);
                        break;
                    }
                    const grandChildren = child.children || [];
                    for (const grandChild of grandChildren) {
                        if (grandChild.slug === categoryFromUrl) {
                            setExpandedCategory(parentCategory.slug);
                            break;
                        }
                    }
                }
            }
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
                            Sản phẩm
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
                                <span className="font-medium whitespace-nowrap">Trang chủ</span>
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
                                    <span className="font-medium whitespace-nowrap">Sản phẩm</span>
                                </button>
                            ) : (
                                <span className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 font-medium whitespace-nowrap">
                                    Sản phẩm
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

            {/* Main Content */}
            <main className="bg-gray-50 py-12">
                <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Filters */}
                        <aside className="lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg p-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide border border-gray-100">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#bb252d] to-[#a0153a] rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Danh mục</h3>
                                        <p className="text-xs text-gray-500">Lọc theo loại sản phẩm</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {/* All Products Button */}
                                    <button
                                        onClick={() => handleCategoryChange('')}
                                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${selectedCategory === ''
                                            ? 'bg-gradient-to-r from-[#bb252d] to-[#a0153a] text-white shadow-lg shadow-[#bb252d]/30'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCategory === '' ? 'bg-white/20' : 'bg-white shadow-sm'
                                            }`}>
                                            <svg className={`w-4 h-4 ${selectedCategory === '' ? 'text-white' : 'text-[#bb252d]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <span className="font-semibold">Tất cả sản phẩm</span>
                                        </div>
                                        {selectedCategory === '' && (
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Parent Categories with Children */}
                                    {categories.map((parentCategory, index) => {
                                        // Use children directly from API response
                                        const childCategories = parentCategory.children || [];
                                        const isParentSelected = selectedCategory === parentCategory.slug;
                                        // Check if any child or grandchild is selected
                                        const hasSelectedChild = childCategories.some(child =>
                                            selectedCategory === child.slug ||
                                            (child.children && child.children.some(grandChild => selectedCategory === grandChild.slug))
                                        );
                                        const isExpanded = expandedCategory === parentCategory.slug || isParentSelected || hasSelectedChild;

                                        return (
                                            <div
                                                key={parentCategory.id}
                                                className="space-y-2"
                                                style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s both` }}
                                            >
                                                {/* Parent Category Button */}
                                                <button
                                                    onClick={() => {
                                                        handleCategoryChange(parentCategory.slug);
                                                        // Toggle expand khi click
                                                        if (expandedCategory === parentCategory.slug) {
                                                            setExpandedCategory(null);
                                                        } else {
                                                            setExpandedCategory(parentCategory.slug);
                                                        }
                                                    }}
                                                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${isParentSelected
                                                        ? 'bg-gradient-to-r from-[#bb252d] to-[#a0153a] text-white shadow-lg shadow-[#bb252d]/30'
                                                        : hasSelectedChild
                                                            ? 'bg-[#bb252d]/10 text-[#bb252d] border-2 border-[#bb252d]/20'
                                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isParentSelected ? 'bg-white/20' : 'bg-white shadow-sm'
                                                        }`}>
                                                        <svg className={`w-4 h-4 ${isParentSelected ? 'text-white' : 'text-[#bb252d]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 text-left min-w-0">
                                                        <span className="font-semibold text-sm leading-tight line-clamp-2" title={parentCategory.name}>{parentCategory.name}</span>
                                                    </div>
                                                    {/* Arrow icon to indicate expandable */}
                                                    {childCategories.length > 0 && (
                                                        <svg
                                                            className={`w-4 h-4 ${isParentSelected ? 'text-white' : 'text-gray-500'}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            style={{
                                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    )}
                                                    {isParentSelected && (
                                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>

                                                {/* Child Categories (Level 2) - Collapsible with smooth animation */}
                                                <div
                                                    className={`ml-4 pl-4 border-l-2 border-[#bb252d]/20 flex flex-col gap-1.5 overflow-hidden ${isExpanded && childCategories.length > 0
                                                        ? 'max-h-[1000px] opacity-100 py-1'
                                                        : 'max-h-0 opacity-0 py-0'
                                                        }`}
                                                    style={{
                                                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease-out',
                                                    }}
                                                >
                                                    {childCategories.map((childCategory, childIndex) => {
                                                        const grandChildCategories = childCategory.children || [];
                                                        const isChildSelected = selectedCategory === childCategory.slug;
                                                        const hasSelectedGrandChild = grandChildCategories.some(gc => selectedCategory === gc.slug);
                                                        const isChildExpanded = isChildSelected || hasSelectedGrandChild;

                                                        return (
                                                            <div key={childCategory.id} className="space-y-1">
                                                                {/* Child Category Button */}
                                                                <button
                                                                    onClick={() => handleCategoryChange(childCategory.slug)}
                                                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-x-1 active:scale-[0.98] ${isChildSelected
                                                                        ? 'bg-[#bb252d] text-white shadow-md shadow-[#bb252d]/30'
                                                                        : hasSelectedGrandChild
                                                                            ? 'bg-[#bb252d]/10 text-[#bb252d] border border-[#bb252d]/20'
                                                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                                        }`}
                                                                    style={{
                                                                        transform: isExpanded ? 'translateX(0)' : 'translateX(-10px)',
                                                                        opacity: isExpanded ? 1 : 0,
                                                                        transition: `transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${childIndex * 0.05}s, opacity 0.3s ease-out ${childIndex * 0.05}s`,
                                                                    }}
                                                                >
                                                                    <svg className={`w-4 h-4 flex-shrink-0 ${isChildSelected ? 'text-white' : 'text-[#bb252d]/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                                                    </svg>
                                                                    <span className="flex-1 text-left text-xs leading-tight line-clamp-2" title={childCategory.name}>{childCategory.name}</span>
                                                                    {/* Arrow for grandchildren */}
                                                                    {grandChildCategories.length > 0 && (
                                                                        <svg
                                                                            className={`w-3 h-3 ${isChildSelected ? 'text-white' : 'text-gray-400'}`}
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                            style={{
                                                                                transform: isChildExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                                transition: 'transform 0.3s ease',
                                                                            }}
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    )}
                                                                    {isChildSelected && (
                                                                        <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    )}
                                                                </button>

                                                                {/* Grandchild Categories (Level 3) */}
                                                                {grandChildCategories.length > 0 && (
                                                                    <div
                                                                        className={`ml-4 pl-3 border-l-2 border-[#bb252d]/10 flex flex-col gap-1 overflow-hidden ${isChildExpanded
                                                                            ? 'max-h-[500px] opacity-100 py-1'
                                                                            : 'max-h-0 opacity-0 py-0'
                                                                            }`}
                                                                        style={{
                                                                            transition: 'max-height 0.3s ease, opacity 0.25s ease, padding 0.2s ease',
                                                                        }}
                                                                    >
                                                                        {grandChildCategories.map((grandChild, gcIndex) => (
                                                                            <button
                                                                                key={grandChild.id}
                                                                                onClick={() => handleCategoryChange(grandChild.slug)}
                                                                                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-200 hover:translate-x-0.5 ${selectedCategory === grandChild.slug
                                                                                    ? 'bg-[#bb252d] text-white shadow-sm'
                                                                                    : 'bg-gray-50/80 hover:bg-gray-100 text-gray-600'
                                                                                    }`}
                                                                                style={{
                                                                                    opacity: isChildExpanded ? 1 : 0,
                                                                                    transform: isChildExpanded ? 'translateX(0)' : 'translateX(-8px)',
                                                                                    transition: `transform 0.25s ease ${gcIndex * 0.03}s, opacity 0.2s ease ${gcIndex * 0.03}s`,
                                                                                }}
                                                                            >
                                                                                <svg className={`w-3 h-3 flex-shrink-0 ${selectedCategory === grandChild.slug ? 'text-white' : 'text-[#bb252d]/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                                                </svg>
                                                                                <span className="flex-1 text-left leading-tight line-clamp-2" title={grandChild.name}>{grandChild.name}</span>
                                                                                {selectedCategory === grandChild.slug && (
                                                                                    <svg className="w-3 h-3 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                )}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>

                                {/* Selected Filter Badge */}
                                {selectedCategory && (
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">Đang lọc:</span>
                                            <button
                                                onClick={() => handleCategoryChange('')}
                                                className="text-xs text-[#bb252d] hover:underline font-medium"
                                            >
                                                Xóa bộ lọc
                                            </button>
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-[#bb252d]/10 text-[#bb252d] rounded-full text-sm font-medium">
                                            <span>{categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</span>
                                            <button
                                                onClick={() => handleCategoryChange('')}
                                                className="hover:bg-[#bb252d]/20 rounded-full p-0.5"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Tìm kiếm sản phẩm..."
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
                                <span>/ {total} sản phẩm</span>
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
                                                        Xem chi tiết
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
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
                                    <p className="mt-2 text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
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
                                            Trước
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
                                            Sau
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
