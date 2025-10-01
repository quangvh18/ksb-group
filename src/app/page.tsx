import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import dynamic from 'next/dynamic'
import HomeFeature from '../components/HomeFeature'
import NewsSection from '../components/NewsSection'

const Banner = dynamic(() => import('../components/Banner'))
const KSBGroupSection = dynamic(() => import('../components/KSBGroupSection'))
const ServicesSection = dynamic(() => import('../components/ServicesSection'))


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
  await getNewsData();
  return (
    <div>
      <Banner />
      <main>
        <HomeFeature />
        {/* KSB Group Summary Section */}
        <KSBGroupSection />
        <ServicesSection />
        {/* News & Community Section - replaced with new components */}
        <NewsSection />

        
        {/* Brand Section moved to separate component; not rendered here */}
      </main>
    </div>
  );
}
