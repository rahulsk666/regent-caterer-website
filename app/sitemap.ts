import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { galleryTypes } from "@/lib/types";

// Gallery URLs are derived from galleryTypes so this list can never drift
// out of sync with the routes that actually exist (app/gallery/[type]).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const galleryUrls: MetadataRoute.Sitemap = galleryTypes
    .filter((item) => item.key !== "none")
    .map((item) => ({
      url: `${SITE_URL}/gallery/${item.key}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery/all`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...galleryUrls,
  ];
}
