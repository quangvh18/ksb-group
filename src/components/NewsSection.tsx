import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import NewsSectionClient from './NewsSectionClient'

interface NewsSectionProps {
  initialNews?: TransformedNewsItem[];
}

const NewsSection = async ({ initialNews }: NewsSectionProps) => {
  let newsData: TransformedNewsItem[] = []
  let totalCount = 0

  // Nếu có initialNews từ props, sử dụng nó
  if (initialNews && initialNews.length > 0) {
    newsData = initialNews
    totalCount = initialNews.length
  } else {
    // Nếu không có props, fetch từ API
    try {
      // Lấy 15 tin tức đầu tiên với metadata
      const { data: apiNews, total } = await newsService.getNewsWithMeta(1, 15)
      newsData = apiNews.map(transformNewsItem)
      totalCount = total
    } catch (error) {
      console.error('NewsSection: API fetch failed:', error);
      newsData = fallbackNewsData.slice(0, 15)
      totalCount = fallbackNewsData.length
    }
  }

  return (
    <NewsSectionClient 
      initialNews={newsData} 
      totalCount={totalCount} 
    />
  )
}

export default NewsSection


