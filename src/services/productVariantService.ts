import api from './api';

// Interfaces based on the provided JSON response

export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata?: {
        public_id: string;
        resource_type: string;
    };
}

export interface ImageFormats {
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
}

export interface Thumbnail {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata?: {
        public_id: string;
        resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface VariantImage {
    id: number;
    documentId: string;
    isMain: boolean | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    thumbNail: Thumbnail;
}

export interface ProductVariant {
    id: number;
    documentId: string;
    variantName: string;
    volume: string;
    packaging: string;
    isDefault: boolean | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    variant_images: VariantImage[];
}

export interface DescriptionChild {
    text: string;
    type: string;
}

export interface DescriptionBlock {
    type: string;
    children: DescriptionChild[];
}

// Complete Product Interface for this specific response structure
export interface ProductDetail {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    summary: string;
    description: DescriptionBlock[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sku: string | null;
    brand: string | null;
    product_variants: ProductVariant[];
}

export interface ProductDetailResponse {
    data: ProductDetail[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

/**
 * Fetch product details with variants using the specific deep population query.
 * Corresponds to: products?filters[documentId][$eq]=...&populate...
 * @param documentId The documentId of the product
 */
export const getProductVariantsValue = async (documentId: string): Promise<ProductDetail | null> => {
    try {
        const params = {
            filters: {
                documentId: {
                    $eq: documentId
                }
            },
            populate: {
                0: 'product_variants',
                product_variants: {
                    populate: {
                        0: 'variant_images',
                        variant_images: {
                            populate: {
                                0: 'thumbNail'
                            }
                        }
                    }
                }
            }
        };

        const response = await api.get<ProductDetailResponse>('/products', { params });

        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data.data[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching product with variants:', error);
        return null;
    }
};
