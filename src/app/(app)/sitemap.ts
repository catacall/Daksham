import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dakshamdevelopers.com'

  let projects: { slug: string; publishedAt?: string }[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'projects' as any,
      limit: 200,
      select: {
        slug: true,
        publishedAt: true,
      },
    })
    projects = res.docs
  } catch {
    // Fail silently — sitemap will still include static routes
  }

  // Static routes with intentional priority weights
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/ongoing`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/delivered`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
