import HeaderV2 from '../../components/HeaderV2';
import Footer from '../../components/Footer';

export default function V2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderV2 />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
