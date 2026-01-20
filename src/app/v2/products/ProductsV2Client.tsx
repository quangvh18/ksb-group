'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Product, Category, productService, getProductImage } from '../../../services/productService';

interface ProductsV2ClientProps {
    initialCategories: Category[];
    initialProducts: Product[];
    initialTotal: number;
}

// Category Icons Component
const CategoryIcon = ({ slug, className, strokeWidth = "1.5" }: { slug: string; className: string; strokeWidth?: string }) => {
    switch (slug) {
        case 'thuc-pham':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M8 20c0-8 8-14 16-14s16 6 16 14" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="6" y="20" width="36" height="6" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 26v10a4 4 0 004 4h20a4 4 0 004-4V26" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 14v-4M24 10V6M32 14v-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'hoa-my-pham':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M18 8h12v6l-2 2v18a4 4 0 01-4 4h-0a4 4 0 01-4-4V16l-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="24" cy="24" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'thuc-pham-chuc-nang':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M9 25l6-6 10 10 14-14" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 44s16-8 16-20V10l-16-6L8 10v14c0 12 16 20 16 20z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'sua':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M14 4h20l2 8H12l2-8zM12 12h24v28a4 4 0 01-4 4H16a4 4 0 01-4-4V12z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 22h8M24 18v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'bodycare':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M16 6h16v8H16V6z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 14h20v26a4 4 0 01-4 4H18a4 4 0 01-4-4V14z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 22v10" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="24" cy="22" r="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'facial-skincare':
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <circle cx="24" cy="24" r="16" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 18c0 4 4 6 8 6s8-2 8-6M20 32s2 4 4 4 4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        default:
            return (
                <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
                    <path d="M24 4l18 10v20l-18 10L6 34V14l18-10z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 14v20M6 14l18 10M42 14l-18 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
    }
};

export default function ProductsV2Client({
    initialCategories,
    initialProducts,
    initialTotal,
}: ProductsV2ClientProps) {
    const { t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<Product[]>(initialProducts);
    // Ensure we always have these 4 categories at the top for the icons
    const [categories, setCategories] = useState<Category[]>(() => {
        const prioritySlugs = ['thuc-pham', 'hoa-my-pham', 'thuc-pham-chuc-nang', 'sua', 'bodycare', 'facial-skincare'];
        // Sort and prioritize categories
        const priorityItems = initialCategories.filter(c => prioritySlugs.includes(c.slug))
            .sort((a, b) => prioritySlugs.indexOf(a.slug) - prioritySlugs.indexOf(b.slug));
        const otherItems = initialCategories.filter(c => !prioritySlugs.includes(c.slug));
        return [...priorityItems, ...otherItems];
    });
    const [total, setTotal] = useState(initialTotal);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '');
    const pageSize = 20;

    // Sync state with URL params (especially for Header searches)
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const cat = searchParams.get('category') || '';
        const s = searchParams.get('sort') || '';

        setSearchQuery(search);
        setSelectedCategory(cat);
        setSort(s);
        setCurrentPage(1);
    }, [searchParams]);

    // Get all child slugs recursively
    const getAllCategorySlugs = useCallback((slug: string, categoryList: Category[]): string[] => {
        const slugs: string[] = [slug];

        const findAndCollect = (currentSlug: string, list: Category[]): boolean => {
            for (const cat of list) {
                if (cat.slug === currentSlug) {
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
        return Array.from(new Set(slugs));
    }, []);

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const activeCategory = selectedSubCategory || selectedCategory;
            const categorySlugs = activeCategory
                ? getAllCategorySlugs(activeCategory, categories)
                : undefined;

            const result = await productService.getProducts(
                currentPage,
                pageSize,
                categorySlugs,
                searchQuery || undefined,
                sort || undefined
            );
            setProducts(result.data);
            setTotal(result.total);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, selectedSubCategory, searchQuery, sort, currentPage, categories, getAllCategorySlugs]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedSubCategory || selectedCategory);
        if (searchQuery) params.set('search', searchQuery);
        if (sort) params.set('sort', sort);

        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl, { scroll: false });
    }, [selectedCategory, selectedSubCategory, searchQuery, sort, pathname, router]);

    const handleCategoryClick = (slug: string) => {
        if (selectedCategory === slug) {
            setSelectedCategory('');
            setSelectedSubCategory('');
        } else {
            setSelectedCategory(slug);
            setSelectedSubCategory('');
        }
        setCurrentPage(1);
    };

    const handleSubCategoryClick = (slug: string) => {
        if (selectedSubCategory === slug) {
            setSelectedSubCategory('');
        } else {
            setSelectedSubCategory(slug);
        }
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(total / pageSize);

    // Get sub-categories for selected category
    const getSubCategories = () => {
        const category = categories.find(c => c.slug === selectedCategory);
        return category?.children || [];
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner - Image Only */}
            <section className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden">
                <Image
                    src="/images/v2-banner.png"
                    alt="KSB Group Banner"
                    fill
                    priority
                    className="object-cover"
                />
            </section>

            {/* Category Icons */}
            <section className="bg-white border-y border-gray-200">
                <div className="container mx-auto max-w-[1200px] relative z-10 px-4">
                    <div className="flex border-l border-gray-100">
                        {categories.slice(0, 6).map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.slug)}
                                className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 md:py-6 border-r border-gray-100 transition-all duration-300 group
                                    ${selectedCategory === category.slug
                                        ? 'text-[#bb252d] bg-gray-50'
                                        : 'text-gray-600 hover:text-[#bb252d] hover:bg-gray-50/50'
                                    }`}
                            >
                                <CategoryIcon
                                    slug={category.slug}
                                    strokeWidth="1.5"
                                    className={`w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110 
                                        ${selectedCategory === category.slug ? 'stroke-[#bb252d]' : 'stroke-current'}`}
                                />
                                <span className="text-[10px] md:text-[13px] font-medium whitespace-nowrap px-1">
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sub-categories Pills */}
            {selectedCategory && getSubCategories().length > 0 && (
                <section className="py-4 bg-white border-y border-gray-100">
                    <div className="container mx-auto max-w-[1300px] px-4">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => setSelectedSubCategory('')}
                                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedSubCategory === ''
                                        ? 'bg-[#bb252d] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {t('v2.all') || 'Tất cả'}
                            </button>
                            {getSubCategories().map((sub) => (
                                <button
                                    key={sub.id}
                                    onClick={() => handleSubCategoryClick(sub.slug)}
                                    className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedSubCategory === sub.slug
                                            ? 'bg-[#bb252d] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Section Title */}
            <section className="pt-8 pb-4">
                <div className="container mx-auto max-w-[1300px] px-4">
                    <div className="text-center mb-6">
                        <p className="text-[#bb252d] text-sm font-medium mb-2 tracking-wider uppercase">
                            {selectedCategory
                                ? t('v2.featured.subtitle.cat') || 'Chất lượng hàng đầu từ KSB Group'
                                : t('v2.featured.subtitle') || 'Được tin dùng bởi hàng ngàn khách hàng'}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                            {searchQuery ? (
                                <>
                                    {t('v2.search.results') || 'Kết quả tìm kiếm cho'}
                                    <span className="text-[#bb252d]"> "{searchQuery}"</span>
                                </>
                            ) : selectedCategory ? (
                                categories.find(c => c.slug === selectedCategory)?.name
                            ) : sort === 'best' ? (
                                t('v2.bestProducts.title') || 'Sản phẩm bán chạy nhất'
                            ) : (
                                t('v2.featured.title') || 'Sản phẩm nổi bật'
                            )}
                        </h2>
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-sm">
                            {t('v2.showing') || 'Hiển thị'} <span className="font-semibold text-[#bb252d]">{products.length}</span> / {total} {t('v2.products') || 'sản phẩm'}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {t('v2.clearSearch') || 'Xóa tìm kiếm'}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="pb-12">
                <div className="container mx-auto max-w-[1300px] px-4">
                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="aspect-square bg-gray-200" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        <div className="h-5 bg-gray-200 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Products */}
                    {!loading && products.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {products.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <Image
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Brand Badge */}
                                        {product.brand && (
                                            <div className="absolute top-3 left-3">
                                                <div className="bg-[#bb252d] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                                                    {product.brand}
                                                </div>
                                            </div>
                                        )}

                                        {/* Quick View Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                                {t('v2.quickView') || 'Xem nhanh'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        {/* Category Tag */}
                                        {product.category && (
                                            <span className="inline-block px-2 py-0.5 bg-[#bb252d]/10 text-[#bb252d] text-xs font-medium rounded mb-2">
                                                {product.category.name}
                                            </span>
                                        )}

                                        {/* Product Name */}
                                        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#bb252d] transition-colors min-h-[2.5rem] md:min-h-[3rem]">
                                            {product.name}
                                        </h3>

                                        {/* Summary */}
                                        {product.summary && (
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                                                {product.summary}
                                            </p>
                                        )}

                                        {/* View Detail Button */}
                                        <div className="flex items-center text-[#bb252d] text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            {t('v2.viewDetail') || 'Xem chi tiết'}
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4M20 12l-4-4m4 4l-4 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {t('v2.noProducts') || 'Không tìm thấy sản phẩm'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {t('v2.tryAnotherSearch') || 'Hãy thử tìm kiếm với từ khóa khác'}
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('');
                                    setSelectedSubCategory('');
                                    setSearchQuery('');
                                }}
                                className="px-6 py-3 bg-[#bb252d] text-white rounded-full font-medium hover:bg-[#a31f26] transition-colors"
                            >
                                {t('v2.viewAll') || 'Xem tất cả sản phẩm'}
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="mt-10 flex justify-center">
                            <nav className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 ${currentPage === pageNum
                                                ? 'bg-[#bb252d] text-white shadow-lg'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </section>

            {/* Floating Action Buttons */}
            <div className="fixed right-4 bottom-20 z-50 hidden lg:flex flex-col gap-3">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-14 h-14 bg-white text-gray-600 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 border border-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
