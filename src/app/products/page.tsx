import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { productService } from "../../services/productService";

export const metadata: Metadata = {
    title: "Sản phẩm - KSB Group",
    description: "Khám phá danh sách sản phẩm chất lượng cao từ KSB Group. Tìm kiếm và lọc sản phẩm theo danh mục.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
    // Fetch initial data
    const [categoriesData, productsData] = await Promise.all([
        productService.getCategories(),
        productService.getProducts(1, 12)
    ]);

    return (
        <ProductsClient
            initialCategories={categoriesData}
            initialProducts={productsData.data}
            initialTotal={productsData.total}
        />
    );
}
