# News Service Documentation

## Overview
News Service được thiết kế để tương tác với API tin tức của KSB Group, sử dụng axios và cung cấp các tính năng quản lý tin tức toàn diện.

## Cấu trúc API Response

API trả về dữ liệu với cấu trúc sau:

```json
{
  "data": [
    {
      "id": 7,
      "documentId": "a2yzuteqyb7hccnahv8p6f8u",
      "title": "Tiêu đề bài viết",
      "slug": "slug-bai-viet",
      "summary": "Tóm tắt bài viết",
      "content": [...], // Rich content blocks
      "createdAt": "2025-09-27T14:20:10.888Z",
      "updatedAt": "2025-09-27T14:20:10.888Z",
      "publishedAt": "2025-09-27T14:20:10.924Z",
      "featuredImage": {
        "id": 10,
        "url": "/uploads/image.jpg",
        "formats": {
          "large": { "url": "...", "width": 1000, "height": 666 },
          "medium": { "url": "...", "width": 750, "height": 500 },
          "small": { "url": "...", "width": 500, "height": 333 },
          "thumbnail": { "url": "...", "width": 234, "height": 156 }
        }
      },
      "gallery": [...]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 5,
      "pageCount": 2,
      "total": 9
    }
  }
}
```

## Features

### 1. NewsService Class
- **Base URL**: Configurable
- **API Key**: Optional authentication
- **Timeout**: 10 seconds
- **Error Handling**: Comprehensive

### 2. API Methods
- `getNews(page, pageSize)` - Lấy danh sách tin tức
- `getNewsById(id)` - Lấy tin tức theo ID
- `getNewsByCategory(categoryName, page, pageSize)` - Lấy tin tức theo category
- `searchNews(query, page, pageSize)` - Tìm kiếm tin tức

### 3. Data Transformation
- **`transformNewsItem()`** - Transform API data thành UI-friendly format
- **Image URL Handling** - Tự động xử lý URL ảnh (local/cloudinary)
- **Content Rendering** - Render rich content blocks
- **Fallback Values** - Safe defaults cho mọi field

## Usage Examples

### Basic Usage
```typescript
import { newsService, transformNewsItem } from '../services/newsService';

// Get news list
const newsData = await newsService.getNews(1, 15);
const transformedData = newsData.map(transformNewsItem);
```

### With Error Handling
```typescript
try {
  const newsData = await newsService.getNews(1, 15);
  const transformedData = newsData.map(transformNewsItem);
} catch (error) {
  console.error('Error fetching news:', error);
  // Use fallback data
}
```

### Search News
```typescript
const searchResults = await newsService.searchNews('sữa đậu nành', 1, 10);
```

## Content Rendering

Service bao gồm utility functions để render rich content:

```typescript
import { renderContent, extractPlainText } from '../utils/contentRenderer';

// Render full content
const htmlContent = renderContent(news.content);

// Extract plain text
const plainText = extractPlainText(news.content);
```

## Image Handling

Service tự động xử lý các loại URL ảnh:

- **Local URLs**: `/uploads/image.jpg` → `https://admin.ksbgroup.vn/uploads/image.jpg`
- **Cloudinary URLs**: Giữ nguyên
- **HTTP URLs**: Giữ nguyên
- **Format Priority**: medium → small → large → original

## Error Handling

Service có error handling toàn diện:

- **API Errors**: Catch và log errors
- **Network Timeout**: 10 seconds timeout
- **Fallback Data**: Sử dụng dữ liệu mặc định khi API fails
- **Type Safety**: Full TypeScript support

## TypeScript Interfaces

### NewsItem
```typescript
interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary?: string;
  content?: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: {
    id: number;
    url: string;
    formats?: {
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      thumbnail?: { url: string; width: number; height: number };
    };
  };
  gallery?: any[];
}
```

### TransformedNewsItem
```typescript
interface TransformedNewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  fullDate: string;
  content: any[];
  altText: string;
}
```

## Best Practices

1. **Always use try-catch** khi gọi API methods
2. **Use transformNewsItem()** để transform data
3. **Handle image URLs** properly với getFullImageUrl()
4. **Use fallback data** khi API fails
5. **Cache results** khi cần thiết

## Performance Tips

1. **Pagination**: Sử dụng pagination để giảm tải
2. **Image Optimization**: Sử dụng format phù hợp (medium/small)
3. **Content Preview**: Sử dụng getContentPreview() cho summaries
4. **Caching**: Implement caching cho production
