import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import dynamic from 'next/dynamic'
import HomeFeature from '../components/HomeFeature'
import NewsSection from '../components/NewsSection'
import StrategicPartners from '../components/StrategicPartners'
import StatsWithMap from '../components/StatsWithMap'
import type { Metadata } from 'next'

// Disable caching for this page to ensure fresh data
export const revalidate = 0

const Banner = dynamic(() => import('../components/Banner'))
// const KSBGroupSection = dynamic(() => import('../components/KSBGroupSection'))
const ServicesSection = dynamic(() => import('../components/ServicesSection'))

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Khám phá KSB Group - Tập đoàn hàng đầu với hệ sinh thái kinh doanh bền vững. Dịch vụ chuyên nghiệp, tin tức cập nhật và cơ hội nghề nghiệp hấp dẫn.",
  keywords: [
    "KSB Group trang chủ",
    "tập đoàn KSB",
    "hệ sinh thái kinh doanh",
    "dịch vụ doanh nghiệp",
    "tin tức KSB",
    "tuyển dụng KSB",
    "công ty Việt Nam",
    "sustainability",
    "business ecosystem"
  ],
  openGraph: {
    title: "KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh bền vững",
    description: "Khám phá KSB Group - Tập đoàn hàng đầu với hệ sinh thái kinh doanh bền vững. Dịch vụ chuyên nghiệp, tin tức cập nhật và cơ hội nghề nghiệp hấp dẫn.",
    url: "https://ksbgroup.vn",
    images: [
      {
        url: "https://ksbgroup.vn/images/ksb.jpg",
        width: 1200,
        height: 630,
        alt: "KSB Group - Tập đoàn KSB - Hệ sinh thái kinh doanh bền vững",
        type: "image/jpeg",
      },
      {
        url: "https://ksbgroup.vn/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group Office - Tập đoàn KSB",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh bền vững",
    description: "Khám phá KSB Group - Tập đoàn hàng đầu với hệ sinh thái kinh doanh bền vững.",
    images: ["https://ksbgroup.vn/images/ksb.jpg"],
    creator: "@ksbgroup",
    site: "@ksbgroup",
  },
  alternates: {
    canonical: "https://ksbgroup.vn",
  },
};


// Function để fetch news data using service
async function getNewsData(): Promise<TransformedNewsItem[]> {
  try {
    const newsData = await newsService.getNews(1, 3); // Chỉ lấy 3 bài tin tức cho trang chủ
    return newsData.map(transformNewsItem);
  } catch (error) {
    console.error('Error fetching news data:', error);
    // Return fallback data if API fails
    return fallbackNewsData.slice(0, 3); // Chỉ lấy 3 bài đầu
  }
}

export default async function Home() {
  // Fetch news data from API using service
  const newsData = await getNewsData();
  return (
    <div>
      <Banner />
      <main>
        <HomeFeature />
        {/* KSB Group Summary Section */}
        {/* <KSBGroupSection /> */}
        <ServicesSection />
        {/* Strategic Partners Section */}
        <StrategicPartners />
        {/* News & Community Section - replaced with new components */}
        <NewsSection initialNews={newsData} />
        {/* Stats with Map Section - replaced AboutFootprint */}
        <StatsWithMap />

        
        {/* Brand Section moved to separate component; not rendered here */}
      </main>
    </div>
  );
}
