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
    <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-24 md:pb-28">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
          Tin tức & Cộng đồng
        </h2>
        <p className="text-muted-foreground text-base text-center">
          Khám phá những tin tức mới nhất và thay đổi của KSB Group.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" data-aos="fade-up" data-aos-delay="150">
        {/* Left column - 2 regular cards */}
        <div className="flex flex-col gap-4">
          {regular.map((news, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={200 + index * 100}>
              <NewsCard
                title={news.title}
                image={news.image}
                link={`/news/${createSlug(news.title)}`}
                leafDirection={index % 2 === 0 ? 'left' : 'right'}
              />
            </div>
          ))}
        </div>

        {/* Right column - 1 featured card */}
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
    </section>
  )
}

export default NewsSection


