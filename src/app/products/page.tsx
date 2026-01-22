import { Suspense } from 'react';
import { Metadata } from 'next';
import { productService } from '../../services/productService';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
    title: 'KSB Group - Sản phẩm chất lượng cao',
    description: 'Khám phá các sản phẩm chất lượng cao từ KSB Group. Thực phẩm nhập khẩu, mỹ phẩm thiên nhiên, và nhiều hơn nữa.',
    openGraph: {
        title: 'KSB Group - Sản phẩm chất lượng cao',
        description: 'Khám phá các sản phẩm chất lượng cao từ KSB Group',
        type: 'website',
    },
};

export default async function ProductsPage() {
    // Fetch initial data server-side
    const [categoriesResult, productsResult, bestSellersResult] = await Promise.all([
        productService.getCategories(),
        productService.getProducts(1, 40), // Get more for the grid
        productService.getProducts(1, 40, ['keo', 'sua']) // Specifically for Best Sellers - only Candy and Milk categories
    ]);

    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Đang tải...</div>}>
            <ProductsClient
                initialCategories={categoriesResult}
                initialProducts={productsResult.data}
                initialBestSellers={bestSellersResult.data}
                initialTotal={productsResult.total}
            />
        </Suspense>
    );
}
