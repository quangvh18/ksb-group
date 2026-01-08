
import api from './api';
import { ProductVariant } from './productVariantService';

// --- Interfaces ---

export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    order?: number | null;
    showInMenu?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    parent?: Category | null;
    children?: Category[];
    products?: { id: number }[];
    news?: { id: number }[];
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
    sku?: string;
    brand?: string;
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
    // Priority 1: First variant image (most specific to product listing)
    if (product.product_variants && product.product_variants.length > 0) {
        const firstVariant = product.product_variants.find(v => v.isDefault) || product.product_variants[0];

        // New API: imageUrl is an array of images on variant
        if (firstVariant.imageUrl && firstVariant.imageUrl.length > 0) {
            const varImage = firstVariant.imageUrl[0]; // Get first image from array
            // Priority: medium > small > thumbnail
            if (varImage.formats?.medium?.url) return getFullImageUrl(varImage.formats.medium.url);
            if (varImage.formats?.small?.url) return getFullImageUrl(varImage.formats.small.url);
            if (varImage.formats?.thumbnail?.url) return getFullImageUrl(varImage.formats.thumbnail.url);
            if (varImage.url) return getFullImageUrl(varImage.url);
        }

        // Legacy API: variant_images array
        if (firstVariant.variant_images && firstVariant.variant_images.length > 0) {
            const firstVarImage = firstVariant.variant_images[0].thumbNail;
            if (firstVarImage?.formats?.medium?.url) return getFullImageUrl(firstVarImage.formats.medium.url);
            if (firstVarImage?.formats?.small?.url) return getFullImageUrl(firstVarImage.formats.small.url);
            if (firstVarImage?.formats?.thumbnail?.url) return getFullImageUrl(firstVarImage.formats.thumbnail.url);
            if (firstVarImage?.url) return getFullImageUrl(firstVarImage.url);
        }
    }

    // Priority 2: Main product image
    if (product.image) {
        if (product.image.formats?.medium?.url) return getFullImageUrl(product.image.formats.medium.url);
        if (product.image.formats?.small?.url) return getFullImageUrl(product.image.formats.small.url);
        if (product.image.formats?.thumbnail?.url) return getFullImageUrl(product.image.formats.thumbnail.url);
        if (product.image.url) return getFullImageUrl(product.image.url);
    }

    // Priority 3: Gallery first image
    if (product.gallery && product.gallery.length > 0) {
        const firstImage = product.gallery[0];
        if (firstImage.formats?.medium?.url) return getFullImageUrl(firstImage.formats.medium.url);
        if (firstImage.formats?.small?.url) return getFullImageUrl(firstImage.formats.small.url);
        if (firstImage.formats?.thumbnail?.url) return getFullImageUrl(firstImage.formats.thumbnail.url);
        if (firstImage.url) return getFullImageUrl(firstImage.url);
    }

    return '/images/placeholder.jpg';
};

// --- Service ---

export const productService = {
    async getProducts(
        page = 1,
        pageSize = 20,
        categorySlug?: string | string[],
        searchQuery?: string,
        sort?: string
    ): Promise<{ data: Product[]; total: number }> {
        try {
            const params: any = {
                'pagination[page]': page,
                'pagination[pageSize]': pageSize,
                'populate[0]': 'product_variants',
                'populate[product_variants][populate][0]': 'imageUrl',
                'populate[1]': 'category',
                sort: sort === 'best' ? ['publishedAt:asc'] : ['createdAt:desc'],
            };

            if (categorySlug) {
                if (Array.isArray(categorySlug)) {
                    categorySlug.forEach((slug, index) => {
                        params[`filters[category][slug][$in][${index}]`] = slug;
                    });
                } else {
                    params['filters[category][slug][$eq]'] = categorySlug;
                }
            }

            if (searchQuery) {
                params['filters[$or][0][name][$containsi]'] = searchQuery;
                params['filters[$or][1][summary][$containsi]'] = searchQuery;
                params['filters[$or][2][brand][$containsi]'] = searchQuery;
            }

            const response = await api.get<ProductsResponse>('/products', { params });
            return {
                data: response.data?.data || [],
                total: response.data?.meta?.pagination?.total || 0
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
                'populate[0]': 'product_variants',
                'populate[product_variants][populate][0]': 'imageUrl',
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
                    'pagination[page]': 1,
                    'pagination[pageSize]': 30,
                    'filters[parent][$null]': 'true',
                    'populate[children][fields][0]': 'id',
                    'populate[children][fields][1]': 'name',
                    'populate[children][fields][2]': 'slug',
                    'populate[children][populate][children][fields][0]': 'id',
                    'populate[children][populate][children][fields][1]': 'name',
                    'populate[children][populate][children][fields][2]': 'slug',
                    'sort[0]': 'order:asc',
                    'sort[1]': 'name:asc'
                }
            });

            const allCategories = response.data.data;

            // Excluded slugs (news-related categories should still be hidden on products page)
            const excludedSlugs = ['su-kien', 'tin-tuc-nganh-thuc-pham', 'tin-tuc'];

            return allCategories
                .filter(cat => !excludedSlugs.includes(cat.slug))
                .map(cat => {
                    if (cat.children && cat.children.length > 0) {
                        cat.children = cat.children.filter(child => !excludedSlugs.includes(child.slug));
                        cat.children.forEach(child => {
                            if (child.children && child.children.length > 0) {
                                child.children = child.children.filter(gc => !excludedSlugs.includes(gc.slug));
                            }
                        });
                    }
                    return cat;
                });
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }
};

export default productService;