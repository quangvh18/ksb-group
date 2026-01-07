import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import dynamic from 'next/dynamic'
import HomeFeature from '../components/HomeFeature'
import NewsSection from '../components/NewsSection'
import StrategicPartners from '../components/StrategicPartners'
import StatsWithMap from '../components/StatsWithMap'
import type { Metadata } from 'next'

// Disable caching for this page to ensure fresh data
// Revalidate this page every hour to ensure fresh data while maintaining performance
export const revalidate = 3600

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
    // Lấy tất cả bài viết
    const newsData = await newsService.getNews(1, 100);

    // Danh sách slug của 2 bài viết cần hiển thị
    const featuredSlugs = [
      'ksb-group-don-tiep-dai-su-new-zealand-khoi-dau-cho-nhung-du-an-hop-tac-ben-vung',
      'ksb-group-dua-sua-yen-mach-cao-cap-new-zealand-ve-viet-nam'
    ];

    // Lọc ra 2 bài viết theo slug
    const featuredNews = newsData.filter(news =>
      featuredSlugs.includes(news.slug)
    );

    // Sắp xếp theo thứ tự trong featuredSlugs
    const sortedNews = featuredSlugs
      .map(slug => featuredNews.find(news => news.slug === slug))
      .filter(news => news !== undefined);

    // If featuredNews is empty (due to error or no data), use fallback
    if (!sortedNews || sortedNews.length === 0) {
      console.log('No featured news data found, using fallback');
      return fallbackNewsData.slice(0, 2);
    }

    return sortedNews.map(transformNewsItem);
  } catch (error) {
    console.error('Error fetching news data:', error);
    // Return fallback data if API fails
    return fallbackNewsData.slice(0, 2);
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
