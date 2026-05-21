import type { MetadataRoute } from 'next';
import { meta } from '@/lib/content';

/**
 * sitemap.xml — generated at build time via the App Router convention.
 * Single-page site for now; if we add /sermons or /events in v2, append here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: meta.canonical,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
