'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import { newsService, transformNewsItem, TransformedNewsItem } from '../services/newsService';
import { useLanguage } from '../contexts/LanguageContext';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

interface NewsSectionClientProps {
  initialNews: TransformedNewsItem[];
  totalCount: number;
}

export default function NewsSectionClient({ initialNews, totalCount }: NewsSectionClientProps) {
  const { t } = useLanguage();
  const [newsData, setNewsData] = useState<TransformedNewsItem[]>(initialNews);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false); // Không hiển thị nút "Xem thêm" cho trang chủ

  const loadMoreNews = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const { data: apiNews } = await newsService.getNewsWithMeta(nextPage, 3);
      const transformedNews = apiNews.map(transformNewsItem);
      
      setNewsData(prev => [...prev, ...transformedNews]);
      setCurrentPage(nextPage);
      setHasMore(newsData.length + transformedNews.length < totalCount);
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const regular = newsData.slice(0, 4); // Lấy 4 bài tin tức

  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-24 md:pb-28">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center" data-aos="fade-up" data-aos-delay="100">
          {t('news.title')}
        </h2>
        <p className="text-muted-foreground text-base text-center" data-aos="fade-up" data-aos-delay="150">
          {t('news.description')}
        </p>
      </div>

      {/* Grid layout với 4 tin tức */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {regular.map((news, index) => (
          <div key={`${news.title}-${index}`} data-aos="zoom-in" data-aos-delay={150 + index * 100}>
            <NewsCard
              title={news.title}
              image={news.image}
              link={`/news/${createSlug(news.title)}`}
              leafDirection={index % 2 === 0 ? 'left' : 'right'}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={loadMoreNews}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#bb252d] hover:bg-[#a0153a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold shadow transition-colors duration-300"
          >
            {isLoading ? 'Đang tải...' : 'Xem thêm'}
          </button>
        </div>
      )}
    </section>
  );
}
