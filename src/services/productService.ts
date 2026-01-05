
import api from './api';
import { ProductVariant } from './productVariantService';

// --- Interfaces ---

export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    parent?: Category | null;
    children?: Category[];
}

export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface ImageFormats {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
}

export interface ProductImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
}

export interface Product {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    summary?: string;
    description?: any[]; // Keep flexible as it can be blocks
    skuName?: string;
    brandName?: string;
    publishedAt: string;

    // Relationships
    category?: Category;
    image?: ProductImage;
    gallery?: ProductImage[];
    product_variants?: ProductVariant[];
}

export interface ProductsResponse {
    data: Product[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// --- Helper Functions ---

export const getFullImageUrl = (url?: string): string => {
    if (!url) return '/images/placeholder.jpg';
    // If it's already a full URL (cloudinary), return as is
    if (url.startsWith('http')) return url;
    // Otherwise prepend Strapi URL (fallback)
    return `https://admin.ksbgroup.vn${url}`;
};

export const getProductImage = (product: Product): string => {
    // Check main image
    if (product.image) {
        if (product.image.formats?.medium?.url) return getFullImageUrl(product.image.formats.medium.url);
        if (product.image.formats?.small?.url) return getFullImageUrl(product.image.formats.small.url);
        if (product.image.formats?.thumbnail?.url) return getFullImageUrl(product.image.formats.thumbnail.url);
        if (product.image.url) return getFullImageUrl(product.image.url);
    }

    // Fallback to gallery first image if main image missing
    if (product.gallery && product.gallery.length > 0) {
        const firstImage = product.gallery[0];
        if (firstImage.formats?.medium?.url) return getFullImageUrl(firstImage.formats.medium.url);
        if (firstImage.formats?.small?.url) return getFullImageUrl(firstImage.formats.small.url);
        if (firstImage.formats?.thumbnail?.url) return getFullImageUrl(firstImage.formats.thumbnail.url);
        if (firstImage.url) return getFullImageUrl(firstImage.url);
    }

    // Fallback to first variant image if available
    if (product.product_variants && product.product_variants.length > 0) {
        const firstVariant = product.product_variants.find(v => v.isDefault) || product.product_variants[0];
        if (firstVariant.variant_images && firstVariant.variant_images.length > 0) {
            const firstVarImage = firstVariant.variant_images[0].thumbNail;
            if (firstVarImage?.formats?.medium?.url) return getFullImageUrl(firstVarImage.formats.medium.url);
            if (firstVarImage?.formats?.small?.url) return getFullImageUrl(firstVarImage.formats.small.url);
            if (firstVarImage?.formats?.thumbnail?.url) return getFullImageUrl(firstVarImage.formats.thumbnail.url);
            if (firstVarImage?.url) return getFullImageUrl(firstVarImage.url);
        }
    }

    return '/images/placeholder.jpg';
};

// --- Service ---

export const productService = {
    async getProducts(
        page = 1,
        pageSize = 20,
        categorySlug?: string,
        searchQuery?: string
    ): Promise<{ data: Product[]; total: number }> {
        try {
            const params: any = {
                'pagination[page]': page,
                'pagination[pageSize]': pageSize,
                'populate[0]': 'product_variants.variant_images.thumbNail',
                'populate[1]': 'category',
                sort: ['createdAt:desc'],
            };

            if (categorySlug) {
                params['filters[category][slug][$eq]'] = categorySlug;
            }

            if (searchQuery) {
                params['filters[name][$contains]'] = searchQuery;
            }

            const response = await api.get<ProductsResponse>('/products', { params });
            return {
                data: response.data.data,
                total: response.data.meta.pagination.total
            };
        } catch (error) {
            console.error('Error fetching products:', error);
            return { data: [], total: 0 };
        }
    },

    async getProductBySlug(slug: string): Promise<Product | null> {
        try {
            const params = {
                'filters[slug][$eq]': slug,
                'populate[0]': 'product_variants.variant_images.thumbNail',
                'populate[1]': 'category',
            };

            const response = await api.get<ProductsResponse>('/products', { params });

            if (response.data.data && response.data.data.length > 0) {
                return response.data.data[0];
            }
            return null;
        } catch (error) {
            console.error(`Error fetching product with slug ${slug}:`, error);
            return null;
        }
    },

    async getCategories(): Promise<Category[]> {
        try {
            const response = await api.get<{ data: Category[] }>('/categories', {
                params: {
                    'populate[parent][fields][0]': 'id',
                    'populate[products][fields][0]': 'id',
                    'pagination[pageSize]': 250 // Get all categories
                }
            });

            const allCategories = response.data.data as (Category & { products?: any[] })[];

            // Helper to check if a category has products directly or in any of its subcategories
            const categoryHasProducts = (category: Category & { products?: any[] }): boolean => {
                // Check if this category has products
                if (category.products && category.products.length > 0) return true;

                // Check if any child category has products
                const children = allCategories.filter(c => c.parent?.id === category.id);
                return children.some(child => categoryHasProducts(child));
            };

            // Filter the list to only include categories that have products or offspring with products
            // and exclude specific categories requested by user (Events, Food News)
            const excludedSlugs = ['su-kien', 'tin-tuc-nganh-thuc-pham', 'tin-tuc'];
            return allCategories.filter(cat =>
                categoryHasProducts(cat) &&
                !excludedSlugs.includes(cat.slug)
            );
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }
};

export default productService;