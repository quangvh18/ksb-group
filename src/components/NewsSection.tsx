import NewsCard from './NewsCard'
import { newsService, transformNewsItem, fallbackNewsData, TransformedNewsItem } from '../services/newsService'

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

const NewsSection = async () => {
  let newsData: TransformedNewsItem[] = []
  try {
    const apiNews = await newsService.getNews(1, 3)
    newsData = apiNews.map(transformNewsItem)
  } catch (e) {
    newsData = fallbackNewsData.slice(0, 3)
  }

  const featured = newsData[0]
  const regular = newsData.slice(1, 3)

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 md:py-8 h-screen flex flex-col overflow-hidden">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
          Tin tức & Cộng đồng
        </h2>
        <p className="text-muted-foreground text-base text-center">
          Khám phá những tin tức mới nhất và thay đổi của KSB Group.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 flex-1 min-h-0">
        {/* Left column - 2 regular cards */}
        <div className="grid grid-rows-2 gap-4 min-h-0">
          {regular.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              image={news.image}
              link={`/news/${createSlug(news.title)}`}
              leafDirection={index % 2 === 0 ? 'left' : 'right'}
              fullHeight
            />
          ))}
        </div>

        {/* Right column - 1 featured card */}
        <div className="min-h-[400px] lg:min-h-[600px] h-full min-h-0">
          {featured && (
            <NewsCard
              title={featured.title}
              image={featured.image}
              link={`/news/${createSlug(featured.title)}`}
              featured
              leafDirection="left"
              fullHeight
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsSection


