import { MetadataRoute } from 'next'
import { newsService, transformNewsItem, fallbackNewsData } from '../services/newsService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ksbgroup.vn'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ecosystem`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/organization`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const newsData = await newsService.getNews(1, 100) // Get more news for sitemap

    if (!newsData || newsData.length === 0) {
      throw new Error('No news data received from service');
    }

    const transformedNews = newsData.map(transformNewsItem)

    newsPages = transformedNews.map((news) => {
      const slug = news.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()

      // Parse date safely
      let lastModified = new Date()
      try {
        const parsedDate = new Date(news.date)
        if (!isNaN(parsedDate.getTime())) {
          lastModified = parsedDate
        }
      } catch {
        console.warn('Invalid date for news item:', news.date)
      }

      return {
        url: `${baseUrl}/news/${slug}`,
        lastModified: lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }
    })
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
    // Use fallback data if API fails
    newsPages = fallbackNewsData.slice(0, 10).map((news) => {
      const slug = news.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()

      // Parse date safely for fallback data
      let lastModified = new Date()
      try {
        const parsedDate = new Date(news.date)
        if (!isNaN(parsedDate.getTime())) {
          lastModified = parsedDate
        }
      } catch {
        console.warn('Invalid date for fallback news item:', news.date)
      }

      return {
        url: `${baseUrl}/news/${slug}`,
        lastModified: lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }
    })
  }

  return [...staticPages, ...newsPages]
}
