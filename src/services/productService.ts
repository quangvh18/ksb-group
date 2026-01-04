import axios, { AxiosResponse } from 'axios';

// Interface cho Category
export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    parent?: {
        id: number;
        documentId: string;
        name: string;
        slug: string;
        description?: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    } | null;
}

// Interface cho Product
export interface Product {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    summary?: string;
    description?: any[];
    image?: {
        id: number;
        documentId: string;
        name: string;
        alternativeText?: string;
        url: string;
        formats?: {
            large?: { url: string };
            medium?: { url: string };
            small?: { url: string };
            thumbnail?: { url: string };
        };
    };
    gallery?: any[];
    skuName?: string;
    brandName?: string;
    category?: Category;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ProductApiResponse {
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

export interface CategoryApiResponse {
    data: Category[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Product Service Class
export class ProductService {
    private baseURL: string;
    private apiKey?: string;

    constructor(baseURL: string = 'https://admin.ksbgroup.vn/api', apiKey?: string) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    // Get all categories for products (not for news)
    async getCategories(): Promise<Category[]> {
        try {
            const response: AxiosResponse<CategoryApiResponse> = await axios.get(
                `${this.baseURL}/categories`,
                {
                    params: {
                        'populate': '*',
                        'pagination[page]': 1,
                        'pagination[pageSize]': 100,
                        'filters[news][id][$notNull]': false,
                        'sort': 'name:asc',
                        '_t': Date.now()
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                    },
                    timeout: 5000,
                }
            );

            return response.data.data.length > 0 ? response.data.data : fallbackCategories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return fallbackCategories;
        }
    }

    // Get products with pagination and optional filters
    async getProducts(
        page: number = 1,
        pageSize: number = 12,
        categorySlug?: string,
        searchQuery?: string
    ): Promise<{ data: Product[], total: number }> {
        try {
            const params: any = {
                'populate': '*',
                'pagination[page]': page,
                'pagination[pageSize]': pageSize,
                'sort': 'createdAt:desc',
                '_t': Date.now()
            };

            // Add category filter if provided
            if (categorySlug) {
                params['filters[category][slug][$eq]'] = categorySlug;
            }

            // Add search filter if provided
            if (searchQuery) {
                params['filters[$or][0][name][$containsi]'] = searchQuery;
                params['filters[$or][1][summary][$containsi]'] = searchQuery;
                params['filters[$or][2][brandName][$containsi]'] = searchQuery;
            }

            const response: AxiosResponse<ProductApiResponse> = await axios.get(
                `${this.baseURL}/products`,
                {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                    },
                    timeout: 5000,
                }
            );

            if (response.data.data.length > 0) {
                return {
                    data: response.data.data,
                    total: response.data.meta.pagination.total
                };
            }

            // Return fallback data if no data from API
            return {
                data: fallbackProducts.slice((page - 1) * pageSize, page * pageSize),
                total: fallbackProducts.length
            };
        } catch (error) {
            console.error('Error fetching products:', error);
            // Return fallback data on error
            return {
                data: fallbackProducts.slice((page - 1) * pageSize, page * pageSize),
                total: fallbackProducts.length
            };
        }
    }

    // Get single product by slug or documentId
    async getProductBySlug(slugOrDocumentId: string): Promise<Product | null> {
        try {
            // First, try to find by documentId (if it looks like a documentId - alphanumeric without hyphens at the start)
            const isDocumentId = /^[a-z0-9]{20,}$/i.test(slugOrDocumentId);

            const params: any = {
                'populate': '*',
                '_t': Date.now()
            };

            if (isDocumentId) {
                params['filters[documentId][$eq]'] = slugOrDocumentId;
            } else {
                params['filters[slug][$eq]'] = slugOrDocumentId;
            }

            const response: AxiosResponse<ProductApiResponse> = await axios.get(
                `${this.baseURL}/products`,
                {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                    },
                    timeout: 5000,
                }
            );

            if (response.data.data[0]) {
                return response.data.data[0];
            }

            // If not found by documentId, try by slug as fallback
            if (isDocumentId) {
                const slugResponse: AxiosResponse<ProductApiResponse> = await axios.get(
                    `${this.baseURL}/products`,
                    {
                        params: {
                            'populate': '*',
                            'filters[slug][$eq]': slugOrDocumentId,
                            '_t': Date.now()
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                        },
                        timeout: 5000,
                    }
                );

                if (slugResponse.data.data[0]) {
                    return slugResponse.data.data[0];
                }
            }

            // Fallback to local data
            return fallbackProducts.find(p => p.slug === slugOrDocumentId || p.documentId === slugOrDocumentId) || null;
        } catch (error) {
            console.error(`Error fetching product with slug/documentId ${slugOrDocumentId}:`, error);
            // Fallback to local data
            return fallbackProducts.find(p => p.slug === slugOrDocumentId || p.documentId === slugOrDocumentId) || null;
        }
    }

    // Get single product by documentId directly
    async getProductByDocumentId(documentId: string): Promise<Product | null> {
        try {
            const response: AxiosResponse<ProductApiResponse> = await axios.get(
                `${this.baseURL}/products`,
                {
                    params: {
                        'populate': '*',
                        'filters[documentId][$eq]': documentId,
                        '_t': Date.now()
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                    },
                    timeout: 5000,
                }
            );

            if (response.data.data[0]) {
                return response.data.data[0];
            }

            // Fallback to local data
            return fallbackProducts.find(p => p.documentId === documentId) || null;
        } catch (error) {
            console.error(`Error fetching product with documentId ${documentId}:`, error);
            // Fallback to local data
            return fallbackProducts.find(p => p.documentId === documentId) || null;
        }
    }
}

// Create default instance
export const productService = new ProductService();

// Utility function to get full image URL
export const getFullImageUrl = (url?: string): string => {
    if (!url) return '/images/product-placeholder.jpg';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads/')) return `https://admin.ksbgroup.vn${url}`;
    return url;
};

// Utility function to get product image
export const getProductImage = (product: Product): string => {
    if (product.image) {
        const imageUrl = product.image.formats?.medium?.url ||
            product.image.formats?.small?.url ||
            product.image.url;
        return getFullImageUrl(imageUrl);
    }
    return '/images/product-placeholder.jpg';
};

// Fallback Categories Data
export const fallbackCategories: Category[] = [
    {
        id: 14,
        documentId: 'gjrj8vsno2ph17nup6ig92xb',
        name: 'Thực phẩm',
        slug: 'thuc-pham',
        description: 'Thực phẩm',
        createdAt: '2025-12-20T08:46:40.108Z',
        updatedAt: '2025-12-20T08:46:40.108Z',
        publishedAt: '2025-12-20T08:46:40.145Z',
        parent: null
    },
    {
        id: 25,
        documentId: 'nc27tywk5y4vtwlfi996unv3',
        name: 'Sữa',
        slug: 'sua',
        description: undefined,
        createdAt: '2025-12-30T04:32:05.348Z',
        updatedAt: '2025-12-30T04:32:05.348Z',
        publishedAt: '2025-12-30T04:32:05.379Z',
        parent: {
            id: 14,
            documentId: 'gjrj8vsno2ph17nup6ig92xb',
            name: 'Thực phẩm',
            slug: 'thuc-pham',
            description: 'Thực phẩm',
            createdAt: '2025-12-20T08:46:40.108Z',
            updatedAt: '2025-12-20T08:46:40.108Z',
            publishedAt: '2025-12-20T08:46:40.145Z'
        }
    },
    {
        id: 29,
        documentId: 'o76brh0xfnslixy50jdcezz8',
        name: 'Kẹo',
        slug: 'keo',
        description: undefined,
        createdAt: '2025-12-30T04:33:55.359Z',
        updatedAt: '2025-12-30T04:33:55.359Z',
        publishedAt: '2025-12-30T04:33:55.392Z',
        parent: {
            id: 14,
            documentId: 'gjrj8vsno2ph17nup6ig92xb',
            name: 'Thực phẩm',
            slug: 'thuc-pham',
            description: 'Thực phẩm',
            createdAt: '2025-12-20T08:46:40.108Z',
            updatedAt: '2025-12-20T08:46:40.108Z',
            publishedAt: '2025-12-20T08:46:40.145Z'
        }
    },
    {
        id: 34,
        documentId: 'gxa5qb8q05qg1whl6xllwyvs',
        name: 'Món ăn vặt',
        slug: 'mon-an-vat',
        description: undefined,
        createdAt: '2025-12-30T04:33:33.014Z',
        updatedAt: '2025-12-30T05:06:16.111Z',
        publishedAt: '2025-12-30T05:06:16.139Z',
        parent: {
            id: 14,
            documentId: 'gjrj8vsno2ph17nup6ig92xb',
            name: 'Thực phẩm',
            slug: 'thuc-pham',
            description: 'Thực phẩm',
            createdAt: '2025-12-20T08:46:40.108Z',
            updatedAt: '2025-12-20T08:46:40.108Z',
            publishedAt: '2025-12-20T08:46:40.145Z'
        }
    },
    {
        id: 35,
        documentId: 'otexhiypyba12fyl73betdgt',
        name: 'Thực phẩm chức năng',
        slug: 'thuc-pham-chuc-nang',
        description: undefined,
        createdAt: '2025-12-30T04:34:39.277Z',
        updatedAt: '2025-12-30T05:08:23.604Z',
        publishedAt: '2025-12-30T05:08:23.632Z',
        parent: {
            id: 14,
            documentId: 'gjrj8vsno2ph17nup6ig92xb',
            name: 'Thực phẩm',
            slug: 'thuc-pham',
            description: 'Thực phẩm',
            createdAt: '2025-12-20T08:46:40.108Z',
            updatedAt: '2025-12-20T08:46:40.108Z',
            publishedAt: '2025-12-20T08:46:40.145Z'
        }
    }
];

// Fallback Products Data
export const fallbackProducts: Product[] = [
    {
        id: 1,
        documentId: 'prod-1',
        name: 'Sữa Óc Chó Hạnh Nhân Đậu Đen Sahmyook',
        slug: 'sua-oc-cho-hanh-nhan-dau-den-sahmyook',
        summary: 'Sữa hạt cao cấp từ Hàn Quốc, kết hợp óc chó, hạnh nhân và đậu đen. Giàu dinh dưỡng, tốt cho sức khỏe tim mạch và trí não.',
        description: [
            {
                type: 'paragraph',
                children: [{ text: 'Sữa Óc Chó Hạnh Nhân Đậu Đen Sahmyook là sản phẩm sữa hạt cao cấp được nhập khẩu từ Hàn Quốc. Sản phẩm kết hợp hoàn hảo giữa óc chó, hạnh nhân và đậu đen - ba loại hạt giàu dinh dưỡng nhất.' }]
            },
            {
                type: 'heading',
                level: 3,
                children: [{ text: 'Thành phần dinh dưỡng' }]
            },
            {
                type: 'paragraph',
                children: [{ text: 'Óc chó: Giàu Omega-3, vitamin E, giúp tăng cường trí nhớ và sức khỏe tim mạch.' }]
            },
            {
                type: 'paragraph',
                children: [{ text: 'Hạnh nhân: Cung cấp protein, chất xơ, vitamin và khoáng chất thiết yếu.' }]
            },
            {
                type: 'paragraph',
                children: [{ text: 'Đậu đen: Giàu chất chống oxy hóa, giúp làm đẹp da và tăng cường sức đề kháng.' }]
            }
        ],
        image: {
            id: 1,
            documentId: 'img-1',
            name: 'sua-oc-cho.jpg',
            alternativeText: 'Sữa Óc Chó Hạnh Nhân Đậu Đen',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1759497682/sua_oc_cho_hanh_nhan_dau_den_han_quoc_tui_e6fc3f0430.webp'
        },
        skuName: 'SM-OCH-001',
        brandName: 'Sahmyook',
        category: fallbackCategories[0],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 2,
        documentId: 'prod-2',
        name: 'Kẹo Hồng Sâm Hàn Quốc 6 Năm Tuổi',
        slug: 'keo-hong-sam-han-quoc-6-nam-tuoi',
        summary: 'Kẹo hồng sâm cao cấp từ Hàn Quốc, sử dụng hồng sâm 6 năm tuổi. Tăng cường sức đề kháng, giảm stress và mệt mỏi.',
        description: [
            {
                type: 'paragraph',
                children: [{ text: 'Kẹo Hồng Sâm Hàn Quốc được làm từ hồng sâm 6 năm tuổi chất lượng cao, giúp bổ sung năng lượng và tăng cường sức khỏe toàn diện.' }]
            }
        ],
        image: {
            id: 2,
            documentId: 'img-2',
            name: 'keo-sam.jpg',
            alternativeText: 'Kẹo Hồng Sâm',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766125064/hong_sam_ko_duong_1_c51cd851cd.png'
        },
        skuName: 'KS-HS-001',
        brandName: 'Korean Ginseng',
        category: fallbackCategories[1],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 3,
        documentId: 'prod-3',
        name: 'Bánh Quy Hạnh Nhân Hàn Quốc',
        slug: 'banh-quy-hanh-nhan-han-quoc',
        summary: 'Bánh quy hạnh nhân thơm ngon, giòn tan. Được làm từ hạnh nhân cao cấp và bơ tươi.',
        image: {
            id: 3,
            documentId: 'img-3',
            name: 'banh-quy.jpg',
            alternativeText: 'Bánh Quy Hạnh Nhân',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1759071890/1_d20031c7fe.webp'
        },
        skuName: 'BK-HN-001',
        brandName: 'Crown',
        category: fallbackCategories[2],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 4,
        documentId: 'prod-4',
        name: 'Viên Uống Collagen Hàn Quốc',
        slug: 'vien-uong-collagen-han-quoc',
        summary: 'Viên uống collagen giúp làm đẹp da, chống lão hóa. Công thức từ Hàn Quốc với collagen thủy phân.',
        image: {
            id: 4,
            documentId: 'img-4',
            name: 'collagen.jpg',
            alternativeText: 'Viên Uống Collagen',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766119276/oc_cho_hop_00dac0703a.png'
        },
        skuName: 'TP-CL-001',
        brandName: 'K-Beauty',
        category: fallbackCategories[3],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 5,
        documentId: 'prod-5',
        name: 'Sữa Đậu Nành Hữu Cơ Sahmyook',
        slug: 'sua-dau-nanh-huu-co-sahmyook',
        summary: 'Sữa đậu nành hữu cơ nguyên chất, không đường, giàu protein thực vật. Phù hợp cho người ăn chay.',
        image: {
            id: 5,
            documentId: 'img-5',
            name: 'sua-dau-nanh.jpg',
            alternativeText: 'Sữa Đậu Nành',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766044192/sua_oc_cho_84d0e3bd04.png'
        },
        skuName: 'SM-DN-001',
        brandName: 'Sahmyook',
        category: fallbackCategories[0],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 6,
        documentId: 'prod-6',
        name: 'Kẹo Sâm Đen Hàn Quốc',
        slug: 'keo-sam-den-han-quoc',
        summary: 'Kẹo sâm đen cao cấp, giúp bồi bổ sức khỏe, tăng cường sinh lực. Vị ngọt thanh, dễ sử dụng.',
        image: {
            id: 6,
            documentId: 'img-6',
            name: 'keo-sam-den.jpg',
            alternativeText: 'Kẹo Sâm Đen',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766136290/keo_sam_den_bbd02da200.png'
        },
        skuName: 'KS-SD-001',
        brandName: 'Korean Ginseng',
        category: fallbackCategories[1],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 7,
        documentId: 'prod-7',
        name: 'Bánh Chocopie Hàn Quốc',
        slug: 'banh-chocopie-han-quoc',
        summary: 'Bánh Chocopie thơm ngon với lớp marshmallow mềm mịn và socola đậm đà. Món ăn vặt yêu thích.',
        image: {
            id: 7,
            documentId: 'img-7',
            name: 'chocopie.jpg',
            alternativeText: 'Bánh Chocopie',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1759071890/1_d20031c7fe.webp'
        },
        skuName: 'BK-CP-001',
        brandName: 'Orion',
        category: fallbackCategories[2],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 8,
        documentId: 'prod-8',
        name: 'Vitamin C Hàn Quốc',
        slug: 'vitamin-c-han-quoc',
        summary: 'Viên sủi Vitamin C 1000mg, tăng cường miễn dịch, làm đẹp da. Hương cam tự nhiên.',
        image: {
            id: 8,
            documentId: 'img-8',
            name: 'vitamin-c.jpg',
            alternativeText: 'Vitamin C',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766119276/oc_cho_hop_00dac0703a.png'
        },
        skuName: 'TP-VC-001',
        brandName: 'K-Health',
        category: fallbackCategories[3],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 9,
        documentId: 'prod-9',
        name: 'Sữa Hạt Điều Hữu Cơ',
        slug: 'sua-hat-dieu-huu-co',
        summary: 'Sữa hạt điều nguyên chất, béo ngậy, thơm ngon. Giàu chất béo tốt và vitamin E.',
        image: {
            id: 9,
            documentId: 'img-9',
            name: 'sua-hat-dieu.jpg',
            alternativeText: 'Sữa Hạt Điều',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766044192/sua_oc_cho_84d0e3bd04.png'
        },
        skuName: 'SM-HD-001',
        brandName: 'Sahmyook',
        category: fallbackCategories[0],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 10,
        documentId: 'prod-10',
        name: 'Kẹo Gừng Hàn Quốc',
        slug: 'keo-gung-han-quoc',
        summary: 'Kẹo gừng ấm bụng, giảm buồn nôn. Thích hợp cho mùa đông và người đi xa.',
        image: {
            id: 10,
            documentId: 'img-10',
            name: 'keo-gung.jpg',
            alternativeText: 'Kẹo Gừng',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766125064/hong_sam_ko_duong_1_c51cd851cd.png'
        },
        skuName: 'KS-GG-001',
        brandName: 'Korean Candy',
        category: fallbackCategories[1],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 11,
        documentId: 'prod-11',
        name: 'Bánh Quy Bơ Hàn Quốc',
        slug: 'banh-quy-bo-han-quoc',
        summary: 'Bánh quy bơ thơm béo, tan chảy trong miệng. Được làm từ bơ tươi New Zealand.',
        image: {
            id: 11,
            documentId: 'img-11',
            name: 'banh-quy-bo.jpg',
            alternativeText: 'Bánh Quy Bơ',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1759071890/1_d20031c7fe.webp'
        },
        skuName: 'BK-BO-001',
        brandName: 'Crown',
        category: fallbackCategories[2],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: 12,
        documentId: 'prod-12',
        name: 'Omega 3 Hàn Quốc',
        slug: 'omega-3-han-quoc',
        summary: 'Viên uống Omega 3 từ dầu cá biển sâu. Tốt cho tim mạch, não bộ và thị lực.',
        image: {
            id: 12,
            documentId: 'img-12',
            name: 'omega-3.jpg',
            alternativeText: 'Omega 3',
            url: 'https://res.cloudinary.com/dbmpcixdy/image/upload/v1766119276/oc_cho_hop_00dac0703a.png'
        },
        skuName: 'TP-OM-001',
        brandName: 'K-Health',
        category: fallbackCategories[3],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
    }
];
