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
    const pageSize = 12;

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
                        <aside className="lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                                    Danh mục sản phẩm
                                </h3>

                                <div className="space-y-2">
                                    {/* All Products */}
                                    <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === ''}
                                                onChange={() => setSelectedCategory('')}
                                                className="w-4 h-4 text-[#c9184a] border-gray-300 rounded focus:ring-[#c9184a] transition-all duration-200"
                                            />
                                            {selectedCategory === '' && (
                                                <span className="absolute inset-0 rounded animate-ping bg-[#c9184a] opacity-20"></span>
                                            )}
                                        </div>
                                        <span className="text-gray-700 group-hover:text-[#c9184a] transition-all duration-300 font-medium">
                                            Tất cả sản phẩm
                                        </span>
                                    </label>

                                    {/* Category Filters */}
                                    {categories.map((category, index) => (
                                        <label
                                            key={category.id}
                                            className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                            style={{
                                                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                                            }}
                                        >
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategory === category.slug}
                                                    onChange={() => handleCategoryChange(category.slug)}
                                                    className="w-4 h-4 text-[#c9184a] border-gray-300 rounded focus:ring-[#c9184a] transition-all duration-200"
                                                />
                                                {selectedCategory === category.slug && (
                                                    <span className="absolute inset-0 rounded animate-ping bg-[#c9184a] opacity-20"></span>
                                                )}
                                            </div>
                                            <span className="text-gray-700 group-hover:text-[#c9184a] transition-all duration-300 font-medium">
                                                {category.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
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
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-transparent transition-all duration-300 hover:border-[#c9184a]"
                                    />
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#c9184a] transition-colors duration-300"
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
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#c9184a] text-white text-sm font-medium">
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
                                                <div className={`absolute ${cornerPosition} w-16 h-16 bg-[#c9184a] opacity-[0.03] ${cornerClass}`}></div>

                                                <div className="relative h-64 overflow-hidden bg-gray-50">
                                                    <Image
                                                        src={getProductImage(product)}
                                                        alt={product.image?.alternativeText || product.name}
                                                        fill
                                                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.05] via-transparent to-transparent"></div>
                                                </div>

                                                <div className="p-6 bg-white flex flex-col justify-between flex-grow">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-[#c9184a] mb-2 line-clamp-2 transition-all duration-500 group-hover:scale-[1.01]">
                                                            {product.name}
                                                        </h3>
                                                        {product.summary && (
                                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                                                {product.summary}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center text-[#c9184a] font-semibold text-sm transition-all duration-500 group-hover:translate-x-1">
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
                                                        ? 'bg-[#c9184a] text-white shadow-lg'
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
