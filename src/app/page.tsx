import Image from 'next/image'
import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import dynamic from 'next/dynamic'
import HomeFeature from '../components/HomeFeature'
import NewsSection from '../components/NewsSection'

const Banner = dynamic(() => import('../components/Banner'))
const KSBGroupSection = dynamic(() => import('../components/KSBGroupSection'))
const ServicesSection = dynamic(() => import('../components/ServicesSection'))

// Function để tạo slug từ title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

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
        <KSBGroupSection />
        <ServicesSection />
        {/* News & Community Section - replaced with new components */}
        <NewsSection />

        
        {/* Brand Section */}
        <div className="box-brand relative bg-gray-50 py-16" data-aos="fade-up" data-aos-duration="1200">
          <span className="brand-img-2 absolute top-10 right-10 w-20 h-20 opacity-20">
            <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-2.svg" alt="" width={80} height={80} className="w-full h-full" />
          </span>
          <span className="brand-img-3 absolute bottom-10 left-10 w-16 h-16 opacity-20">
            <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-3.svg" alt="" width={64} height={64} className="w-full h-full" />
          </span>
          <div className="container relative mx-auto px-2 md:px-5 max-w-[1300px]">
            <span className="brand-img-1 absolute top-0 left-0 w-24 h-24 opacity-20">
              <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-1.svg" alt="" width={96} height={96} className="w-full h-full" />
            </span>
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <Image className="logo-session mx-auto mb-4 w-32 h-auto" src="https://cjfoods.com.vn/themes/nest/images/cjfoods-logo.svg" alt="KSB Group" width={128} height={64} />
              <h2 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-4">Thương hiệu tự hào</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="100">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/2024-new-bibigo/website-new-bibigo-social-media-avarta-1.png" alt="Bibigo" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Bibigo</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="200">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-cautre.png" alt="Cầu Tre" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Cầu Tre</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="300">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-ohya.png" alt="Ohya" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Ohya</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="400">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-innerb.png" alt="Innerb" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Innerb</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="500">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-xedap.png" alt="Xe đạp" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Xe đạp</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="600">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-beksul-1.png" alt="Beksul" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Beksul</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="700">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-hetbahn.png" alt="Hetbahn" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Hetbahn</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="800">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-dasida.png" alt="Dasida" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Dasida</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="900">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <Image src="https://cjfoods.com.vn/storage/logo-brand/logo-haechandle.png" alt="HAECHANDLE" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">HAECHANDLE</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
