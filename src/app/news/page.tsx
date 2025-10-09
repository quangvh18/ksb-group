'use client';

import PageHeader from "../../components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import "../../styles/news.css";
import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from "../../services/newsService";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";


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
    const newsData = await newsService.getNews(1, 50); // Load more items at once
    const transformedData = newsData.map(transformNewsItem);
    
    console.log('News data fetched:', { dataLength: transformedData.length });
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching news data:', error);
    // Return fallback data if API fails
    return fallbackNewsData;
  }
}

export default function NewsPage() {
  const { t } = useLanguage();
  const [newsData, setNewsData] = useState<TransformedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.news'), isActive: true }
  ];

  // Fetch news data from API using service
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsData();
        setNewsData(data);
        console.log('News loaded:', { dataLength: data.length });
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsData(fallbackNewsData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);


  return (
    <div>
      <PageHeader 
        title={t('news.title')}
        description={t('news.description')}
        breadcrumbItems={breadcrumbItems}
        bannerImage="/images/news-page/banner.webp"
      />
      <main>
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            
            {loading ? (
              <div className="text-center py-16">
                <div className="text-lg text-gray-600">{t('common.loading')}</div>
              </div>
            ) : newsData.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-lg text-gray-600">{t('news.noNews')}</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsData.map((news, index) => {
                  // Alternating leaf patterns
                  const isLeftLeaf = index % 2 === 0;
                  const leafClass = isLeftLeaf ? "rounded-[3rem_0rem_3rem_0rem]" : "rounded-[0rem_3rem_0rem_3rem]";
                  const cornerClass = isLeftLeaf ? "rounded-bl-full" : "rounded-br-full";
                  const cornerPosition = isLeftLeaf ? "top-0 right-0" : "top-0 left-0";
                  
                  const newsSlug = createSlug(news.title);
                  
                  return (
                    <div key={news.id} className="w-full flex" data-aos="zoom-in" data-aos-delay={index * 150}>
                      <Link href={`/news/${newsSlug}`} className="w-full">
                        <article className={`bg-white ${leafClass} shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-700 ease-out hover:transform hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] cursor-pointer relative group`}>
                          {/* Decorative corner */}
                          <div className={`absolute ${cornerPosition} w-16 h-16 bg-white opacity-20 ${cornerClass}`}></div>
                          
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={news.image}
                              alt={news.altText}
                              fill
                              className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 group-hover:from-black/20"></div>
                            
                            {/* Date Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="text-sm font-bold text-white bg-[#bb252d] px-3 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90">
                                {news.date}
                              </span>
                            </div>
                            
                            {/* Category Badge */}
                            <div className="absolute top-4 right-4">
                              <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                {news.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="px-6 pt-6 pb-0 bg-white text-gray-800 border-b border-gray-100 flex-shrink-0 min-h-[140px] flex flex-col justify-start relative">
                            <h3 className="text-lg font-bold mb-3 text-[#bb252d] text-left transition-all duration-500 group-hover:text-[#8b1e24] group-hover:scale-105 line-clamp-2">
                              {news.title}
                            </h3>
                            
                            <p className="text-sm leading-relaxed text-gray-600 text-left transition-all duration-500 group-hover:text-gray-800 line-clamp-3">
                              {news.description}
                            </p>
                          </div>
                          
                          {/* Footer Section */}
                          <div className="px-6 py-4 flex-1 flex flex-col justify-end bg-white">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-[#bb252d] font-medium text-sm transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#8b1e24]">
                                {t('news.readMore')}
                                <svg className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                              </div>
                              
                              {/* Shimmer effect overlay */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </div>
                  );
                  })}
                </div>
                
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}