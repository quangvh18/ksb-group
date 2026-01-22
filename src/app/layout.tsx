import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AOSProvider from "../components/AOSProvider";
import { LanguageProvider } from "../contexts/LanguageContext";
import StructuredData from "../components/StructuredData";
import PerformanceOptimizer from "../components/PerformanceOptimizer";
import GoogleAnalytics from "../components/GoogleAnalytics";
import AnalyticsProvider from "../components/AnalyticsProvider";
import ConditionalLayout from "../components/ConditionalLayout";

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
  description: "KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm. Đối tác tin cậy, chất lượng quốc tế, phục vụ thị trường Việt Nam.",
  keywords: [
    "KSB Group",
    "tập đoàn KSB",
    "hệ sinh thái kinh doanh",
    "Biofresh",
    "mỹ phẩm thiên nhiên",
    "thực phẩm nhập khẩu",
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
    description: 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm. Đối tác tin cậy, chất lượng quốc tế.',
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
    description: 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm.',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'your-google-verification-code',
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
    'og:site_name': 'KSB Group',
    'og:type': 'website',
    'og:locale': 'vi_VN',
    'og:url': 'https://ksbgroup.vn',
    'og:title': 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành',
    'og:description': 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm.',
    'og:image': 'https://ksbgroup.vn/images/ksb.jpg',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành',
    'twitter:description': 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm.',
    'twitter:image': 'https://ksbgroup.vn/images/ksb.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#bb252d" />
        <meta name="msapplication-TileColor" content="#bb252d" />
        <meta name="apple-mobile-web-app-title" content="KSB Group" />
        <meta name="application-name" content="KSB Group" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <AnalyticsProvider>
            <AOSProvider>
              <StructuredData
                type="organization"
                data={{
                  name: "KSB Group",
                  description: "Tập đoàn KSB - Hệ sinh thái kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm. Đối tác tin cậy, chất lượng quốc tế, phục vụ thị trường Việt Nam.",
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
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </AOSProvider>
          </AnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
