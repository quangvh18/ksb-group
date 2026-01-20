import { Metadata } from 'next';
import { productService } from '../../../services/productService';
import ProductsV2Client from './ProductsV2Client';

export const metadata: Metadata = {
    title: 'KSB Group - Sản phẩm chất lượng cao',
    description: 'Khám phá các sản phẩm chất lượng cao từ KSB Group. Thực phẩm nhập khẩu, mỹ phẩm thiên nhiên, và nhiều hơn nữa.',
    openGraph: {
        title: 'KSB Group - Sản phẩm chất lượng cao',
        description: 'Khám phá các sản phẩm chất lượng cao từ KSB Group',
        type: 'website',
    },
};

export default async function ProductsV2Page() {
    // Fetch initial data server-side
    const [categoriesResult, productsResult] = await Promise.all([
        productService.getCategories(),
        productService.getProducts(1, 20),
    ]);

    return (
        <ProductsV2Client
            initialCategories={categoriesResult}
            initialProducts={productsResult.data}
            initialTotal={productsResult.total}
        />
    );
}
