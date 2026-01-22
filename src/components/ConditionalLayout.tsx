'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButtons from './FloatingContactButtons';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isProductsRoute = pathname?.startsWith('/products');

    // For products routes, don't render the default header/footer
    // The products layout will handle its own header/footer
    if (isProductsRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
            <FloatingContactButtons />
        </>
    );
}
