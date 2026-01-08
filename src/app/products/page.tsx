import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { productService } from "../../services/productService";

export const metadata: Metadata = {
    title: "Sản phẩm - KSB Group",
    description: "Khám phá danh sách sản phẩm chất lượng cao từ KSB Group. Tìm kiếm và lọc sản phẩm theo danh mục.",
};

export const revalidate = 0; // Disable cache for debugging

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

    // Fetch initial data
    const [categoriesData, productsData] = await Promise.all([
        productService.getCategories(),
        productService.getProducts(1, 20, category)
    ]);

    return (
        <ProductsClient
            initialCategories={categoriesData}
            initialProducts={productsData.data}
            initialTotal={productsData.total}
            initialCategory={category || ''}
        />
    );
}
