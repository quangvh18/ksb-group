import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
        '*.json$',
        '*.xml$',
      ],
    },
    sitemap: 'https://ksbgroup.vn/sitemap.xml',
    host: 'https://ksbgroup.vn',
  }
}
