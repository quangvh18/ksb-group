import { Suspense } from 'react';
import HeaderV2 from '../../components/HeaderV2';
import Footer from '../../components/Footer';

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div className="h-20 bg-white" />}>
                <HeaderV2 />
            </Suspense>
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
