import React from 'react';
import { renderContent } from '../utils/contentRenderer';
import { TransformedNewsItem } from '../services/newsService';

interface NewsDetailProps {
  news: TransformedNewsItem;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {news.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="bg-[#c9184a] text-white px-3 py-1 rounded-full">
            {news.date}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {news.category}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {news.image && (
        <div className="mb-8">
          <img
            src={news.image}
            alt={news.altText}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: renderContent(news.content) 
          }}
        />
      </div>
    </article>
  );
}
