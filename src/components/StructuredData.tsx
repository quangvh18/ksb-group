import Script from 'next/script'

interface OrganizationData {
  name: string
  description: string
  url: string
  logo: string
  foundingDate?: string
  numberOfEmployees?: string
  industry?: string[]
  address: {
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint: {
    telephone: string
    contactType: string
    email: string
  }
  sameAs: string[]
}

interface BreadcrumbData {
  name: string
  item: string
}

interface NewsArticleData {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    type: string
  }
  publisher: {
    name: string
    logo: {
      url: string
      width: number
      height: number
    }
  }
}

interface StructuredDataProps {
  type: 'organization' | 'breadcrumb' | 'newsArticle' | 'website'
  data?: OrganizationData | BreadcrumbData[] | NewsArticleData
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://ksbgroup.vn'
    
    switch (type) {
      case 'organization':
        const orgData = data as OrganizationData
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": orgData.name,
          "description": orgData.description,
          "url": orgData.url,
          "logo": {
            "@type": "ImageObject",
            "url": orgData.logo,
            "width": 300,
            "height": 100
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": orgData.address.streetAddress,
            "addressLocality": orgData.address.addressLocality,
            "addressCountry": orgData.address.addressCountry
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": orgData.contactPoint.telephone,
            "contactType": orgData.contactPoint.contactType,
            "email": orgData.contactPoint.email
          },
          "sameAs": orgData.sameAs,
          "foundingDate": "2020",
          "numberOfEmployees": "100-500",
          "industry": "Business Services"
        }

      case 'breadcrumb':
        const breadcrumbData = data as BreadcrumbData[]
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbData.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
          }))
        }

      case 'newsArticle':
        const newsData = data as NewsArticleData
        return {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": newsData.headline,
          "description": newsData.description,
          "image": {
            "@type": "ImageObject",
            "url": newsData.image,
            "width": 1200,
            "height": 630
          },
          "datePublished": newsData.datePublished,
          "dateModified": newsData.dateModified,
          "author": {
            "@type": "Person",
            "name": newsData.author.name
          },
          "publisher": {
            "@type": "Organization",
            "name": newsData.publisher.name,
            "logo": {
              "@type": "ImageObject",
              "url": newsData.publisher.logo.url,
              "width": newsData.publisher.logo.width,
              "height": newsData.publisher.logo.height
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": baseUrl
          }
        }

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "KSB Group",
          "description": "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "KSB Group",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/images/logo-header.png`,
              "width": 300,
              "height": 100
            }
          }
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}
