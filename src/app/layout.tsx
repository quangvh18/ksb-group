import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOSProvider from "../components/AOSProvider";
import { LanguageProvider } from "../contexts/LanguageContext";
import StructuredData from "../components/StructuredData";
import PerformanceOptimizer from "../components/PerformanceOptimizer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh bền vững",
    template: "%s | KSB Group"
  },
  description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững. Khám phá các dịch vụ, tin tức và cơ hội nghề nghiệp tại KSB Group.",
  keywords: [
    "KSB Group",
    "tập đoàn KSB", 
    "hệ sinh thái kinh doanh",
    "công ty Việt Nam",
    "dịch vụ doanh nghiệp",
    "tin tức kinh doanh",
    "tuyển dụng",
    "đối tác",
    "sustainability",
    "business ecosystem"
  ],
  authors: [{ name: "KSB Group" }],
  creator: "KSB Group",
  publisher: "KSB Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ksbgroup.vn'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/vi',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://ksbgroup.vn',
    siteName: 'KSB Group',
    title: 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh bền vững',
    description: 'Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.',
    images: [
      {
        url: '/images/office.png',
        width: 1200,
        height: 630,
        alt: 'KSB Group - Tập đoàn KSB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh bền vững',
    description: 'Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.',
    images: ['/images/office.png'],
    creator: '@ksbgroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} antialiased`}
      >
        <LanguageProvider>
          <AOSProvider>
            <StructuredData 
              type="organization" 
              data={{
                name: "KSB Group",
                description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững",
                url: "https://ksbgroup.vn",
                logo: "https://ksbgroup.vn/images/logo-header.png",
                address: {
                  streetAddress: "The Terra An Hồng - Tòa nhà Hồng, Hà Nội",
                  addressLocality: "Hà Nội",
                  addressCountry: "VN"
                },
                contactPoint: {
                  telephone: "+84-24-1234-5678",
                  contactType: "customer service",
                  email: "info@ksbgroup.vn"
                },
                sameAs: [
                  "https://www.facebook.com/ksbgroup",
                  "https://www.linkedin.com/company/ksb-group",
                  "https://twitter.com/ksbgroup"
                ]
              }}
            />
            <StructuredData type="website" />
            <PerformanceOptimizer />
            <Header />
            {children}
            <Footer />
          </AOSProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
