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
    const isV2Route = pathname?.startsWith('/v2');

    // For v2 routes, don't render the default header/footer
    // The v2 layout will handle its own header/footer
    if (isV2Route) {
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
