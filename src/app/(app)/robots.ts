import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dakshamdevelopers.com'
  
  return {
    rules: [
      {
        // Google, Bing, Brave (Brave uses its own bot but also Googlebot-compatible)
        userAgent: ['Googlebot', 'Bingbot', 'bingbot'],
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      {
        // All other crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
