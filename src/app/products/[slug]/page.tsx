import type { Metadata } from "next";
import { productService } from "../../../services/productService";
import { getProductVariantsValue } from "../../../services/productVariantService";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const product = await productService.getProductBySlug(slug);

        if (!product) {
            return {
                title: "Sản phẩm không tìm thấy - KSB Group",
                description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
            };
        }

        return {
            title: `${product.name} - KSB Group`,
            description: product.summary || product.name,
            openGraph: {
                title: product.name,
                description: product.summary || product.name,
                images: product.image ? [{
                    url: product.image.url,
                    width: 800,
                    height: 600,
                    alt: product.image.alternativeText || product.name,
                }] : [],
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Sản phẩm - KSB Group",
            description: "Chi tiết sản phẩm từ KSB Group",
        };
    }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = await params;
    const product = await productService.getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Fetch variants and merge if available
    if (product.documentId) {
        try {
            const variantData = await getProductVariantsValue(product.documentId);
            if (variantData && variantData.product_variants) {
                // Merge variants into the product object
                Object.assign(product, { product_variants: variantData.product_variants });
            }
        } catch (error) {
            console.error('Error fetching variants:', error);
            // Continue with basic product data if variants fail
        }
    }

    return <ProductDetailClient product={product} />;
}
