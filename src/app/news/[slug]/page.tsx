import type { Metadata } from "next";
import { newsService, transformNewsItem } from "../../../services/newsService";
import NewsDetailClient from "./NewsDetailClient";
import "../../../styles/news.css";

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    // Get all news to find the one with matching slug
    const newsData = await newsService.getNews(1, 100);
    const news = newsData.find(item => {
      // Convert title to slug for comparison
      const titleSlug = item.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      return titleSlug === params.slug;
    });

    if (!news) {
      return {
        title: "Bài viết không tìm thấy - KSB Group",
        description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
      };
    }

    const transformedNews = transformNewsItem(news);

    return {
      title: `${transformedNews.title} - KSB Group`,
      description: transformedNews.description,
      openGraph: {
        title: transformedNews.title,
        description: transformedNews.description,
        images: [
          {
            url: transformedNews.image,
            width: 800,
            height: 600,
            alt: transformedNews.altText,
          },
        ],
        type: "article",
        publishedTime: transformedNews.fullDate,
      },
      twitter: {
        card: "summary_large_image",
        title: transformedNews.title,
        description: transformedNews.description,
        images: [transformedNews.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Bài viết - KSB Group",
      description: "Đọc bài viết chi tiết từ KSB Group",
    };
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  return <NewsDetailClient slug={params.slug} />;
}
