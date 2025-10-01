'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import { newsService, transformNewsItem, TransformedNewsItem } from '../services/newsService';

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
  const [newsData, setNewsData] = useState<TransformedNewsItem[]>(initialNews);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialNews.length < totalCount);

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

  const featured = newsData[0];
  const regular = newsData.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-24 md:pb-28">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center" data-aos="fade-up" data-aos-delay="100">
          Tin tức & Cộng đồng
        </h2>
        <p className="text-muted-foreground text-base text-center" data-aos="fade-up" data-aos-delay="150">
          Khám phá những tin tức mới nhất và thay đổi của KSB Group.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" data-aos="fade-up" data-aos-delay="150">
        {/* Left column - regular cards */}
        <div className="flex flex-col gap-4">
          {regular.map((news, index) => (
            <div key={`${news.title}-${index}`} data-aos="zoom-in" data-aos-delay={200 + index * 100}>
              <NewsCard
                title={news.title}
                image={news.image}
                link={`/news/${createSlug(news.title)}`}
                leafDirection={index % 2 === 0 ? 'left' : 'right'}
              />
            </div>
          ))}
        </div>

        {/* Right column - featured card */}
        <div className="min-h-[400px] lg:min-h-[600px]" data-aos="zoom-in" data-aos-delay="250">
          {featured && (
            <NewsCard
              title={featured.title}
              image={featured.image}
              link={`/news/${createSlug(featured.title)}`}
              featured
              leafDirection="left"
            />
          )}
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={loadMoreNews}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#c9184a] hover:bg-[#a0153a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold shadow transition-colors duration-300"
          >
            {isLoading ? 'Đang tải...' : 'Xem thêm'}
          </button>
        </div>
      )}
    </section>
  );
}
