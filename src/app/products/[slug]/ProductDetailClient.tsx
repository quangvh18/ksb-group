'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getProductImage, getFullImageUrl } from '../../../services/productService';
import { ProductVariant } from '../../../services/productVariantService';

// Product already includes variants now
interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState<'info' | 'description'>('info');
    const [activeVariantId, setActiveVariantId] = useState<number | null>(null);

    useEffect(() => {
        if (product.product_variants && product.product_variants.length > 0) {
            // Find default variant or take first one
            const defaultVariant = product.product_variants.find(v => v.isDefault) || product.product_variants[0];
            setActiveVariantId(defaultVariant.id);
        }
    }, [product]);

    // Unified Image List Construction
    const allImages = [
        // 1. Main Product Image (if any)
        ...(product.image ? [{ ...product.image, variantId: null, isMain: true }] : []),
        // 2. Product Gallery (if any)
        ...(product.gallery?.map(img => ({ ...img, variantId: null, isMain: false })) || []),
        // 3. All Variant Images
        ...(product.product_variants?.flatMap(v =>
            v.variant_images?.map(vi => ({
                ...vi.thumbNail,
                variantId: v.id,
                isMain: false
            })) || []
        ) || [])
    ].filter(Boolean);

    // Effect: Switch selected image when Active Variant changes (e.g. via Buttons)
    useEffect(() => {
        if (!activeVariantId) return;

        // Find index of the first image belonging to this variant
        const firstVariantImageIndex = allImages.findIndex((img: any) => img.variantId === activeVariantId);

        if (firstVariantImageIndex !== -1) {
            setSelectedImage(firstVariantImageIndex);
        } else {
            // If variant has no specific images, maybe keep current or reset? 
            // Let's keep current behavior roughly, or reset to 0 if out of bounds
        }
    }, [activeVariantId]);

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
        const image = allImages[index] as any;
        if (image.variantId && image.variantId !== activeVariantId) {
            setActiveVariantId(image.variantId);
        }
    };

    // Derived state for display
    const currentImage = allImages[selectedImage];
    const activeVariant = product.product_variants?.find(v => v.id === activeVariantId);

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
                            Chi tiết sản phẩm
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
                            <Link
                                href="/products"
                                className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
                            >
                                <span className="font-medium whitespace-nowrap">Sản phẩm</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="bg-white py-16">
                <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
                    {/* Product Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Image Gallery */}
                        <div className="space-y-6" data-aos="fade-right">
                            {/* Main Image */}
                            {/* Main Image */}
                            <div className="relative h-96 lg:h-[550px] bg-gray-50 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group">
                                <Image
                                    src={
                                        (currentImage && getFullImageUrl((currentImage as any).url))
                                        || getProductImage(product)
                                    }
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.05] via-transparent to-transparent"></div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {allImages.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto p-4 custom-scrollbar">
                                    {allImages.map((image: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => handleThumbnailClick(index)}
                                            className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                                ? 'border-[#bb252d] shadow-md scale-105'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <Image
                                                src={getFullImageUrl(image.url)}
                                                alt={`${product.name} - ${index + 1}`}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8" data-aos="fade-left">
                            <div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex flex-wrap gap-6 items-center">
                                    {product.category && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Danh mục:</span>
                                            <Link
                                                href={`/products?category=${product.category.slug}`}
                                                className="text-sm font-bold text-[#bb252d] hover:text-[#a0153a] transition-colors"
                                            >
                                                {product.category.name}
                                            </Link>
                                        </div>
                                    )}

                                    {product.brandName && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Thương hiệu:</span>
                                            <span className="text-sm font-bold text-gray-900">{product.brandName}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Variant Selector */}
                            {product.product_variants && product.product_variants.length > 0 && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-4">Các loại hương vị:</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.product_variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setActiveVariantId(variant.id)}
                                                className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 font-bold ${activeVariantId === variant.id
                                                    ? 'border-[#bb252d] bg-[#bb252d] text-white shadow-lg shadow-red-200'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#bb252d] hover:text-[#bb252d]'
                                                    }`}
                                            >
                                                {variant.variantName}
                                            </button>
                                        ))}
                                    </div>
                                    {activeVariant && (
                                        <div className="mt-4 text-sm text-gray-500 animate-fadeIn">
                                            Đang chọn: <span className="font-bold text-gray-800">{activeVariant.variantName}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {(() => {
                                const getDescriptionSummary = () => {
                                    if (Array.isArray(product.description)) {
                                        // Find first paragraph with substantial text
                                        const p = product.description.find(b =>
                                            b.type === 'paragraph' &&
                                            b.children?.some((c: any) => c.text && c.text.length > 20)
                                        );
                                        // If no substantial paragraph, take just the first one
                                        const targetBlock = p || product.description.find(b => b.type === 'paragraph');

                                        if (targetBlock?.children) {
                                            return targetBlock.children.map((c: any) => c.text).join('');
                                        }
                                    }
                                    return null;
                                };

                                let summaryText = product.summary;
                                const descriptionText = getDescriptionSummary();

                                // If summary is missing OR too short (likely just a title) and we have a better description
                                if (!summaryText || (summaryText.length < 100 && descriptionText && descriptionText.length > summaryText.length)) {
                                    summaryText = descriptionText;
                                }

                                if (!summaryText) return null;

                                // Truncate if too long (max 300 chars)
                                const maxLength = 300;
                                if (summaryText.length > maxLength) {
                                    summaryText = summaryText.substring(0, maxLength) + '...';
                                }

                                return (
                                    <div className="bg-gray-50 rounded-3xl p-8 border-l-4 border-[#bb252d] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#bb252d] opacity-[0.03] rounded-bl-full"></div>
                                        <p className="text-gray-700 leading-relaxed text-lg text-justify italic">
                                            "{summaryText}"
                                        </p>
                                    </div>
                                );
                            })()}

                            {product.skuName && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mã SP:</span>
                                    <span className="text-sm font-mono font-bold text-gray-700">{product.skuName}</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-3 bg-[#bb252d] text-white py-5 px-10 rounded-full hover:bg-[#a0153a] transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 group"
                                >
                                    <svg className="w-6 h-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Liên hệ đặt hàng ngay
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="border-t border-gray-100 pt-16">
                        {/* Tab Headers */}
                        <div className="flex justify-center border-b border-gray-100 mb-12">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`px-8 py-4 font-bold text-lg transition-all relative ${activeTab === 'info'
                                    ? 'text-[#bb252d]'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Thông tin sản phẩm
                                {activeTab === 'info' && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#bb252d] rounded-t-full"></span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`px-8 py-4 font-bold text-lg transition-all relative ${activeTab === 'description'
                                    ? 'text-[#bb252d]'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Mô tả chi tiết
                                {activeTab === 'description' && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#bb252d] rounded-t-full"></span>
                                )}
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="max-w-4xl mx-auto" data-aos="fade-up">
                            {activeTab === 'info' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { label: 'Tên sản phẩm', value: product.name },
                                            { label: 'Thương hiệu', value: product.brandName },
                                            { label: 'Mã sản phẩm', value: product.skuName },
                                            { label: 'Danh mục', value: product.category?.name },
                                            // Add Variant info if selected
                                            activeVariant ? { label: 'Phiên bản', value: activeVariant.variantName } : null
                                        ].map((item, idx) => item && item.value && (
                                            <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-gray-200 transition-all hover:bg-white hover:shadow-sm group">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">{item.label}</span>
                                                <p className="font-bold text-gray-800 text-lg group-hover:text-[#bb252d] transition-colors">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'description' && (
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                                    {product.description && product.description.length > 0 ? (
                                        <div
                                            className="product-description-content"
                                            dangerouslySetInnerHTML={{ __html: renderDescription(product.description) }}
                                        />
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                            <p className="text-gray-400 font-medium">Chưa có mô tả chi tiết cho sản phẩm này.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back to Products */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-[#bb252d] font-medium hover:text-[#a0153a] transition-colors duration-300"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Quay lại danh sách sản phẩm
                        </Link>
                    </div>
                </div>
            </main>

            {/* Hidden Image Preloader */}
            <div className="hidden">
                {product.product_variants?.map(variant =>
                    variant.variant_images?.map((img, idx) => (
                        <Image
                            key={`${variant.id}-${idx}`}
                            src={getFullImageUrl(img.thumbNail.url)}
                            alt="preloader"
                            width={1}
                            height={1}
                            priority
                            unoptimized
                        />
                    ))
                )}
            </div>
        </div>
    );
}

// Helper function to render description
function renderDescription(description: any[]): string {
    if (!description || !Array.isArray(description)) return '';

    return description.map(block => {
        if (block.type === 'paragraph') {
            const text = block.children?.map((child: any) => child.text || '').join('') || '';
            return `<p class="mb-4">${text}</p>`;
        }
        if (block.type === 'heading') {
            const level = block.level || 2;
            const text = block.children?.map((child: any) => child.text || '').join('') || '';
            return `<h${level} class="font-bold mb-3 mt-6">${text}</h${level}>`;
        }
        return '';
    }).join('');
}
