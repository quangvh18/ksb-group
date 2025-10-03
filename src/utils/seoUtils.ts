// SEO utility functions

export interface SEOKeywords {
  primary: string[]
  secondary: string[]
  longTail: string[]
}

export const KSB_SEO_KEYWORDS: SEOKeywords = {
  primary: [
    'KSB Group',
    'tập đoàn KSB',
    'hệ sinh thái kinh doanh',
    'công ty Việt Nam',
    'dịch vụ doanh nghiệp'
  ],
  secondary: [
    'tin tức KSB',
    'tuyển dụng KSB',
    'đối tác KSB',
    'sustainability',
    'business ecosystem',
    'phát triển bền vững',
    'kinh doanh bền vững'
  ],
  longTail: [
    'KSB Group tuyển dụng việc làm',
    'KSB Group tin tức cập nhật',
    'tập đoàn KSB hệ sinh thái kinh doanh',
    'KSB Group đối tác chiến lược',
    'công ty KSB Group Việt Nam',
    'KSB Group dịch vụ tư vấn doanh nghiệp',
    'tập đoàn KSB phát triển bền vững'
  ]
}

export function generateMetaDescription(
  title: string,
  keywords: string[],
  maxLength: number = 160
): string {
  const baseDescription = `KSB Group - ${title}. ${keywords.slice(0, 3).join(', ')}. Khám phá dịch vụ chuyên nghiệp và cơ hội nghề nghiệp hấp dẫn.`
  
  if (baseDescription.length <= maxLength) {
    return baseDescription
  }
  
  return baseDescription.substring(0, maxLength - 3) + '...'
}

export function generatePageTitle(
  pageName: string,
  includeBrand: boolean = true,
  maxLength: number = 60
): string {
  const brand = 'KSB Group'
  const title = includeBrand ? `${pageName} | ${brand}` : pageName
  
  if (title.length <= maxLength) {
    return title
  }
  
  return pageName.length <= maxLength ? pageName : pageName.substring(0, maxLength - 3) + '...'
}

export function generateCanonicalUrl(path: string): string {
  const baseUrl = 'https://ksbgroup.vn'
  return `${baseUrl}${path === '/' ? '' : path}`
}

export function generateOpenGraphImage(
  pageName: string,
  width: number = 1200,
  height: number = 630
): string {
  // In a real implementation, you would generate dynamic OG images
  // For now, return a placeholder
  return `https://ksbgroup.vn/images/og-${pageName.toLowerCase().replace(/\s+/g, '-')}-${width}x${height}.jpg`
}

export function generateStructuredDataBreadcrumb(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KSB Group",
    "description": "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững",
    "url": "https://ksbgroup.vn",
    "logo": "https://ksbgroup.vn/images/logo-header.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Terra An Hồng - Tòa nhà Hồng",
      "addressLocality": "Hà Nội",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-24-1234-5678",
      "contactType": "customer service",
      "email": "info@ksbgroup.vn"
    },
    "sameAs": [
      "https://www.facebook.com/ksbgroup",
      "https://www.linkedin.com/company/ksb-group",
      "https://twitter.com/ksbgroup"
    ],
    "foundingDate": "2020",
    "numberOfEmployees": "100-500",
    "industry": "Business Services"
  }
}

export function optimizeContentForSEO(content: string, keywords: string[]): string {
  // This is a basic implementation - in a real scenario, you'd want more sophisticated optimization
  let optimizedContent = content
  
  // Ensure primary keywords appear in the first 100 characters
  if (keywords.length > 0) {
    const firstKeyword = keywords[0]
    if (!optimizedContent.toLowerCase().includes(firstKeyword.toLowerCase())) {
      optimizedContent = `${firstKeyword} - ${optimizedContent}`
    }
  }
  
  // Ensure keywords appear naturally throughout the content
  keywords.forEach(keyword => {
    const keywordCount = (optimizedContent.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
    if (keywordCount === 0) {
      // Add keyword naturally if not present
      optimizedContent += ` ${keyword}.`
    }
  })
  
  return optimizedContent
}

export function generateSitemapPriority(path: string): number {
  const priorityMap: Record<string, number> = {
    '/': 1.0,
    '/about': 0.8,
    '/news': 0.9,
    '/contact': 0.7,
    '/careers': 0.8,
    '/partners': 0.6,
    '/ecosystem': 0.7
  }
  
  return priorityMap[path] || 0.5
}

export function generateChangeFrequency(path: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  const frequencyMap: Record<string, 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'> = {
    '/': 'daily',
    '/about': 'monthly',
    '/news': 'daily',
    '/contact': 'monthly',
    '/careers': 'weekly',
    '/partners': 'monthly',
    '/ecosystem': 'monthly'
  }
  
  return frequencyMap[path] || 'monthly'
}
