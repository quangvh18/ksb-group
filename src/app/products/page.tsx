import { Suspense } from 'react';
import { Metadata } from 'next';
import { productService, Category } from '../../services/productService';
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

// Helper function to get all category slugs including children
function getAllCategorySlugs(slug: string, categories: Category[]): string[] {
    const slugs: string[] = [slug];

    const findAndCollect = (currentSlug: string, list: Category[]): boolean => {
        for (const cat of list) {
            if (cat.slug === currentSlug) {
                const collectDescendants = (c: Category) => {
                    if (c.children && c.children.length > 0) {
                        c.children.forEach(child => {
                            slugs.push(child.slug);
                            collectDescendants(child);
                        });
                    }
                };
                collectDescendants(cat);
                return true;
            }
            if (cat.children && cat.children.length > 0) {
                if (findAndCollect(currentSlug, cat.children)) return true;
            }
        }
        return false;
    };

    findAndCollect(slug, categories);
    return Array.from(new Set(slugs));
}

export default async function ProductsPage() {
    // Fetch categories first to get all sub-categories
    const categoriesResult = await productService.getCategories();

    // Get all slugs for 'keo' and 'sua' including their children
    const keoSlugs = getAllCategorySlugs('keo', categoriesResult);
    const suaSlugs = getAllCategorySlugs('sua', categoriesResult);
    const bestSellerCategorySlugs = [...new Set([...keoSlugs, ...suaSlugs])];

    // Fetch products and best sellers
    const [productsResult, bestSellersResult] = await Promise.all([
        productService.getProducts(1, 40), // Get more for the grid
        productService.getProducts(1, 100, bestSellerCategorySlugs) // Best Sellers - Candy and Milk categories + children (increase limit)
    ]);

    // Debug logging - check in terminal
    console.log('=== BEST SELLERS DEBUG ===');

    // Show full category hierarchy
    const printHierarchy = (cats: Category[], indent = 0) => {
        cats.forEach(c => {
            console.log('  '.repeat(indent) + `- ${c.name} (${c.slug})`);
            if (c.children && c.children.length > 0) {
                printHierarchy(c.children, indent + 1);
            }
        });
    };
    console.log('Full category hierarchy:');
    printHierarchy(categoriesResult);

    // Find all slugs containing 'sua'
    const findSuaCategories = (cats: Category[]): string[] => {
        let found: string[] = [];
        cats.forEach(c => {
            if (c.slug.includes('sua') || c.name.toLowerCase().includes('sữa')) {
                found.push(`${c.name} (${c.slug})`);
            }
            if (c.children && c.children.length > 0) {
                found = found.concat(findSuaCategories(c.children));
            }
        });
        return found;
    };
    console.log('Categories containing "sua" or "sữa":', findSuaCategories(categoriesResult));

    console.log('Best seller category slugs being used:', bestSellerCategorySlugs);
    console.log('Best sellers count:', bestSellersResult.data.length);
    console.log('=== END DEBUG ===');

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
