import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsService, transformNewsItem } from "../../../services/newsService";
import { renderContent } from "../../../utils/contentRenderer";
import "../../../styles/news.css";

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    // Get all news to find the one with matching slug
    const newsData = await newsService.getNews(1, 100);
    const news = newsData.find(item => {
      // Convert title to slug for comparison
      const titleSlug = item.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      return titleSlug === params.slug;
    });

    if (!news) {
      return {
        title: "Bài viết không tìm thấy - KSB Group",
        description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
      };
    }

    const transformedNews = transformNewsItem(news);

    return {
      title: `${transformedNews.title} - KSB Group`,
      description: transformedNews.description,
      openGraph: {
        title: transformedNews.title,
        description: transformedNews.description,
        images: [
          {
            url: transformedNews.image,
            width: 800,
            height: 600,
            alt: transformedNews.altText,
          },
        ],
        type: "article",
        publishedTime: transformedNews.fullDate,
      },
      twitter: {
        card: "summary_large_image",
        title: transformedNews.title,
        description: transformedNews.description,
        images: [transformedNews.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Bài viết - KSB Group",
      description: "Đọc bài viết chi tiết từ KSB Group",
    };
  }
}

// Get news by slug
async function getNewsBySlug(slug: string) {
  try {
    const newsData = await newsService.getNews(1, 100);
    const news = newsData.find(item => {
      // Convert title to slug for comparison
      const titleSlug = item.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      return titleSlug === slug;
    });

    if (!news) {
      return null;
    }

    return transformNewsItem(news);
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    notFound();
  }

  return (
    <div>
      {/* Simple Page Header */}
      <div className="sub_page_head relative w-full overflow-hidden">
        <Image 
          src="https://www.sahmyook.co.kr/theme/syfood/img/intro/intro_bg_01.png" 
          alt="Banner"
          width={1200}
          height={400}
          className="w-full h-auto object-cover min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]"
          style={{ display: 'block' }}
          priority={true}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-3 sm:px-4 md:px-8 lg:px-12 overflow-hidden" style={{
          zIndex: 10
        }}>
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto">
            <h2 
              id="subpage_title" 
              className="text-white text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1.5 sm:mb-2 md:mb-3 lg:mb-5 leading-tight break-words hyphens-auto" 
              style={{
                color: '#ffffff',
                textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                position: 'relative',
                zIndex: 20,
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Tin tức
            </h2>
          </div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div id="sub_menu" className="min-h-[36px] sm:min-h-[40px] md:min-h-[44px] flex items-stretch" style={{
        background: 'linear-gradient(130deg, rgba(64, 64, 64, 0.9) 0%, rgba(96, 96, 96, 0.9) 100%)'
      }}>
        <div className="w-full container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] flex items-stretch">
          <nav className="flex items-stretch flex-wrap space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base w-full" aria-label="Breadcrumb">
            <div className="flex items-stretch">
              <a 
                href="/" 
                className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span className="font-medium whitespace-nowrap">Trang chủ</span>
              </a>
            </div>
            
            <div className="flex items-stretch">
              <div className="flex items-center mr-1 sm:mr-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <a 
                href="/news" 
                className="flex items-center text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded transition-all duration-200 cursor-pointer hover:bg-white/20 hover:text-white"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium whitespace-nowrap">Tin tức</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      
      <main>
        <article className="bg-white py-16">
          <div className="container mx-auto px-5 max-w-4xl">
            {/* Article Header */}
            <header className="mb-12 text-center">
              
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-justify">
              {news.title}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-justify mb-6">
              {news.description}
            </p>
            
            <div className="flex items-center justify-end mb-8 max-w-3xl mx-auto">
              <span className="text-gray-600 text-sm font-medium">
                {news.fullDate}
              </span>
            </div>
            </header>

            {/* Featured Image */}
            {news.image && (
              <div className="mb-12">
                <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={news.image}
                    alt={news.altText}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="news-content"
                dangerouslySetInnerHTML={{ 
                  __html: renderContent(news.content) 
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <p>Đăng ngày: {news.fullDate}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <a
                    href="/news"
                    className="inline-flex items-center text-[#c9184a] font-medium hover:text-[#a0153a] transition-colors duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Quay lại danh sách
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </div>
  );
}
