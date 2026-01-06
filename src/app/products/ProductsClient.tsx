'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { Product, Category, productService, getProductImage } from '../../services/productService';

interface ProductsClientProps {
    initialCategories: Category[];
    initialProducts: Product[];
    initialTotal: number;
}

export default function ProductsClient({
    initialCategories,
    initialProducts,
    initialTotal
}: ProductsClientProps) {
    const { t } = useLanguage();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [categories] = useState<Category[]>(initialCategories);
    const [total, setTotal] = useState(initialTotal);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const pageSize = 20;

    // Fetch products when filters change
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const result = await productService.getProducts(
                    currentPage,
                    pageSize,
                    selectedCategory || undefined,
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
    }, [selectedCategory, searchQuery, currentPage]);

    const handleCategoryChange = (categorySlug: string) => {
        setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
        setCurrentPage(1);
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
                            <span className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 font-medium whitespace-nowrap">
                                Sản phẩm
                            </span>
                        </div>
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
                                        onClick={() => setSelectedCategory('')}
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
                                    {categories.filter(cat => !cat.parent).map((parentCategory, index) => {
                                        const childCategories = categories.filter(cat => cat.parent?.id === parentCategory.id);
                                        const isParentSelected = selectedCategory === parentCategory.slug;
                                        const hasSelectedChild = childCategories.some(child => selectedCategory === child.slug);
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

                                                {/* Child Categories - Collapsible with smooth animation */}
                                                <div
                                                    className={`ml-4 pl-4 border-l-2 border-[#bb252d]/20 flex flex-col gap-1.5 overflow-hidden ${isExpanded && childCategories.length > 0
                                                        ? 'max-h-[500px] opacity-100 py-1'
                                                        : 'max-h-0 opacity-0 py-0'
                                                        }`}
                                                    style={{
                                                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease-out',
                                                    }}
                                                >
                                                    {childCategories.map((childCategory, childIndex) => (
                                                        <button
                                                            key={childCategory.id}
                                                            onClick={() => handleCategoryChange(childCategory.slug)}
                                                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-x-1 active:scale-[0.98] ${selectedCategory === childCategory.slug
                                                                ? 'bg-[#bb252d] text-white shadow-md shadow-[#bb252d]/30'
                                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                                }`}
                                                            style={{
                                                                transform: isExpanded ? 'translateX(0)' : 'translateX(-10px)',
                                                                opacity: isExpanded ? 1 : 0,
                                                                transition: `transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${childIndex * 0.05}s, opacity 0.3s ease-out ${childIndex * 0.05}s`,
                                                            }}
                                                        >
                                                            <svg className={`w-4 h-4 flex-shrink-0 ${selectedCategory === childCategory.slug ? 'text-white' : 'text-[#bb252d]/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                            </svg>
                                                            <span className="flex-1 text-left text-xs leading-tight line-clamp-2" title={childCategory.name}>{childCategory.name}</span>
                                                            {selectedCategory === childCategory.slug && (
                                                                <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Standalone categories (no parent structure) */}
                                    {categories.filter(cat => !cat.parent).length === 0 && categories.map((category, index) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryChange(category.slug)}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${selectedCategory === category.slug
                                                ? 'bg-gradient-to-r from-[#bb252d] to-[#a0153a] text-white shadow-lg shadow-[#bb252d]/30'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                            style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s both` }}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCategory === category.slug ? 'bg-white/20' : 'bg-white shadow-sm'
                                                }`}>
                                                <svg className={`w-4 h-4 ${selectedCategory === category.slug ? 'text-white' : 'text-[#bb252d]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold">{category.name}</span>
                                            {selectedCategory === category.slug && (
                                                <svg className="w-5 h-5 text-white ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Filter Badge */}
                                {selectedCategory && (
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">Đang lọc:</span>
                                            <button
                                                onClick={() => setSelectedCategory('')}
                                                className="text-xs text-[#bb252d] hover:underline font-medium"
                                            >
                                                Xóa bộ lọc
                                            </button>
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-[#bb252d]/10 text-[#bb252d] rounded-full text-sm font-medium">
                                            <span>{categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}</span>
                                            <button
                                                onClick={() => setSelectedCategory('')}
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

                            {/* Loading State */}
                            {loading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                                            <div className="h-64 bg-gray-200"></div>
                                            <div className="p-4">
                                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
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
