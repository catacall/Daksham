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
      limit: 100,
      select: {
        slug: true,
        publishedAt: true,
      },
    })
    projects = res.docs
  } catch (error) {
    // Fail silently
  }

  const routes = [
    '',
    '/projects',
    '/projects/ongoing',
    '/projects/delivered',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...projectRoutes]
}
