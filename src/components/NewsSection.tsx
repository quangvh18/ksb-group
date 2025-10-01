import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'
import NewsSectionClient from './NewsSectionClient'

const NewsSection = async () => {
  let initialNews: TransformedNewsItem[] = []
  let totalCount = 0

  try {
    // Lấy 15 tin tức đầu tiên với metadata
    const { data: apiNews, total } = await newsService.getNewsWithMeta(1, 15)
    initialNews = apiNews.map(transformNewsItem)
    totalCount = total
  } catch {
    initialNews = fallbackNewsData.slice(0, 15)
    totalCount = fallbackNewsData.length
  }

  return (
    <NewsSectionClient 
      initialNews={initialNews} 
      totalCount={totalCount} 
    />
  )
}

export default NewsSection


