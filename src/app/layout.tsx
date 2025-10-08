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
    default: "KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành",
    template: "%s | KSB Group"
  },
  applicationName: "KSB Group",
  description: "KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm, Thực phẩm đông lạnh. Đối tác tin cậy, chất lượng quốc tế, phục vụ thị trường Việt Nam.",
  keywords: [
    "KSB Group",
    "tập đoàn KSB", 
    "hệ sinh thái kinh doanh",
    "Biofresh",
    "mỹ phẩm thiên nhiên",
    "thực phẩm nhập khẩu",
    "tôm Bắc Cực",
    "công ty Việt Nam",
    "đối tác kinh doanh",
    "phân phối độc quyền",
    "chất lượng quốc tế",
    "sustainability",
    "business ecosystem",
    "Thiên Thuận Phát",
    "Ecobin",
    "Bách Mộc An",
    "KangNam"
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
    title: 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành',
    description: 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm, Thực phẩm đông lạnh. Đối tác tin cậy, chất lượng quốc tế.',
    images: [
      {
        url: 'https://ksbgroup.vn/images/ksb.jpg',
        width: 1200,
        height: 630,
        alt: 'KSB Group - Tập đoàn KSB - Hệ sinh thái kinh doanh đa ngành',
        type: 'image/jpeg',
      },
      {
        url: 'https://ksbgroup.vn/images/office.png',
        width: 1200,
        height: 630,
        alt: 'KSB Group Office - Tập đoàn KSB',
        type: 'image/png',
      },
      {
        url: 'https://ksbgroup.vn/images/logo-header.png',
        width: 800,
        height: 600,
        alt: 'KSB Group Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành',
    description: 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm, Thực phẩm đông lạnh.',
    images: ['https://ksbgroup.vn/images/ksb.jpg'],
    creator: '@ksbgroup',
    site: '@ksbgroup',
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
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/jpeg',
    'og:image:secure_url': 'https://ksbgroup.vn/images/ksb.jpg',
    'twitter:image:alt': 'KSB Group - Tập đoàn KSB - Hệ sinh thái kinh doanh đa ngành',
    'twitter:domain': 'ksbgroup.vn',
    'twitter:url': 'https://ksbgroup.vn',
    'article:author': 'KSB Group',
    'article:publisher': 'https://www.facebook.com/ksbgroup',
    'business:contact_data:street_address': 'The Terra An Hồng - Tòa nhà Hồng, Hà Nội',
    'business:contact_data:locality': 'Hà Nội',
    'business:contact_data:country_name': 'Vietnam',
    'business:contact_data:email': 'info@ksbgroup.vn',
    'business:contact_data:phone_number': '+84-24-1234-5678',
    'generator': 'KSB Group',
    'author': 'KSB Group',
    'copyright': 'KSB Group',
    'robots': 'index, follow',
    'googlebot': 'index, follow',
    'bingbot': 'index, follow',
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
                description: "Tập đoàn KSB - Hệ sinh thái kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm, Thực phẩm đông lạnh. Đối tác tin cậy, chất lượng quốc tế, phục vụ thị trường Việt Nam.",
                url: "https://ksbgroup.vn",
                logo: "https://ksbgroup.vn/images/logo-header.png",
                foundingDate: "2020",
                numberOfEmployees: "100-500",
                industry: ["Hóa - Mỹ phẩm", "Thực phẩm", "Phân phối", "Nhập khẩu"],
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
