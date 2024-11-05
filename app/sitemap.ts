import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://arabclinic.net',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://arabclinic.net/clinets',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
