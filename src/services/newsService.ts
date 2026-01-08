import api from './api';
import { getContentPreview, ContentBlock } from '../utils/contentRenderer';

// Interface cho News API response
export interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary?: string;
  content?: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      large?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
    };
    url: string;
    provider?: string;
  };
  gallery?: ContentBlock[];
}

export interface NewsApiResponse {
  data: NewsItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// News Service Class
export class NewsService {
  // Get news with pagination
  async getNews(page: number = 1, pageSize: number = 15): Promise<NewsItem[]> {
    try {
      const response = await api.get<NewsApiResponse>(
        '/news',
        {
          params: {
            'populate': '*',
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'sort': 'publishedAt:desc',
            '_t': Date.now() // Cache busting
          }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  // Get news with pagination and metadata
  async getNewsWithMeta(page: number = 1, pageSize: number = 15): Promise<{ data: NewsItem[], total: number }> {
    try {
      const response = await api.get<NewsApiResponse>(
        '/news',
        {
          params: {
            'populate': '*',
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'sort': 'publishedAt:desc',
            '_t': Date.now() // Cache busting
          }
        }
      );

      return {
        data: response.data.data,
        total: response.data.meta.pagination.total
      };
    } catch (error) {
      console.error('Error fetching news with metadata:', error);
      return { data: [], total: 0 };
    }
  }

  // Get single news item by ID
  async getNewsById(id: number): Promise<NewsItem | null> {
    try {
      const response = await api.get<{ data: NewsItem }>(
        `/news/${id}`,
        {
          params: {
            'populate': '*'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error(`Error fetching news with ID ${id}:`, error);
      return null;
    }
  }

  // Get news by category
  async getNewsByCategory(categoryName: string, page: number = 1, pageSize: number = 15): Promise<NewsItem[]> {
    try {
      const response = await api.get<NewsApiResponse>(
        '/news',
        {
          params: {
            'populate': '*',
            'filters[category][name][$eq]': categoryName,
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'sort': 'publishedAt:desc'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error(`Error fetching news for category ${categoryName}:`, error);
      return [];
    }
  }

  // Search news by title or description
  async searchNews(query: string, page: number = 1, pageSize: number = 15): Promise<NewsItem[]> {
    try {
      const response = await api.get<NewsApiResponse>(
        '/news',
        {
          params: {
            'populate': '*',
            'filters[$or][0][title][$containsi]': query,
            'filters[$or][1][description][$containsi]': query,
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'sort': 'publishedAt:desc'
          }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error(`Error searching news with query "${query}":`, error);
      return [];
    }
  }
}

// Create default instance
export const newsService = new NewsService();

// Interface for transformed news item
export interface TransformedNewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  fullDate: string;
  content: ContentBlock[];
  altText: string;
}

// Utility functions for data transformation
export const transformNewsItem = (news: NewsItem): TransformedNewsItem => {
  // Get image URL with fallback to different formats
  const getImageUrl = () => {
    if (news.featuredImage) {
      // Try different formats in order of preference
      return news.featuredImage.formats?.medium?.url ||
        news.featuredImage.formats?.small?.url ||
        news.featuredImage.formats?.large?.url ||
        news.featuredImage.url;
    }
    return "/images/news-1.jpg";
  };

  // Get full image URL (handle both local and cloudinary URLs)
  const getFullImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    if (url.startsWith('/uploads/')) {
      return `https://admin.ksbgroup.vn${url}`;
    }
    return url;
  };

  const imageUrl = getImageUrl();
  const fullImageUrl = getFullImageUrl(imageUrl);

  // Get description from summary or extract from content
  const getDescription = () => {
    if (news.summary) return news.summary;
    if (news.content && news.content.length > 0) {
      return getContentPreview(news.content, 150);
    }
    return "Mô tả không có";
  };

  return {
    id: news.id,
    title: news.title || "Tiêu đề không có",
    description: getDescription(),
    image: fullImageUrl,
    date: news.publishedAt ?
      new Date(news.publishedAt).toLocaleDateString('vi-VN', {
        month: '2-digit',
        day: '2-digit'
      }) : "01-01",
    category: "Tin tức", // Default category since not provided in new structure
    fullDate: news.publishedAt ?
      new Date(news.publishedAt).toLocaleDateString('vi-VN') : "01/01/2024",
    content: news.content || [],
    altText: news.featuredImage?.alternativeText || news.title || "News image"
  };
};

// Fallback data
export const fallbackNewsData: TransformedNewsItem[] = [
  {
    id: 1,
    image: "/images/news-1.jpg",
    title: "Samyuk Foods đã nhận được lời khen ngợi từ Thị trưởng thành phố Cheonan",
    date: "09-11",
    description: "Thị trưởng thành phố Cheonan đã gửi lời khen ngợi đến Samyuk Foods về những đóng góp tích cực cho cộng đồng và nền kinh tế địa phương.",
    category: "Tin tức",
    fullDate: "11/09/2024",
    content: [],
    altText: "Samyuk Foods đã nhận được lời khen ngợi từ Thị trưởng thành phố Cheonan"
  },
  {
    id: 2,
    image: "/images/news-2.jpg",
    title: "Samyuk Foods đã tổ chức sự kiện kỷ niệm ngày ra mắt sản phẩm Sữa đậu nành",
    date: "09-11",
    description: "Sự kiện kỷ niệm đánh dấu một cột mốc quan trọng trong lịch sử phát triển của Samyuk Foods với dòng sản phẩm sữa đậu nành.",
    category: "Tin tức",
    fullDate: "11/09/2024",
    content: [],
    altText: "Samyuk Foods đã tổ chức sự kiện kỷ niệm ngày ra mắt sản phẩm Sữa đậu nành"
  },
  {
    id: 3,
    image: "/images/news-3.jpg",
    title: "Samyuk Foods đứng đầu hạng mục sữa đậu nành tại Hàn Quốc, Trung Quốc và Việt Nam",
    date: "08-28",
    description: "Với chất lượng vượt trội và hương vị độc đáo, Samyuk Foods đã khẳng định vị thế dẫn đầu trong ngành sữa đậu nành.",
    category: "Tin tức",
    fullDate: "28/08/2024",
    content: [],
    altText: "Samyuk Foods đứng đầu hạng mục sữa đậu nành tại Hàn Quốc, Trung Quốc và Việt Nam"
  }
];
