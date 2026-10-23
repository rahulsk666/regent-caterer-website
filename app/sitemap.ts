import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { galleryTypes } from "@/lib/types";

// Bump when page content meaningfully changes. A stable date (instead of
// `new Date()` on every request) keeps lastModified trustworthy for crawlers.
const LAST_UPDATED = new Date("2026-10-23");

// Gallery URLs are derived from galleryTypes so this list can never drift
// out of sync with the routes that actually exist (app/gallery/[type]).
export default function sitemap(): MetadataRoute.Sitemap {
  const galleryUrls: MetadataRoute.Sitemap = galleryTypes
    .filter((item) => item.key !== "none")
    .map((item) => ({
      url: `${SITE_URL}/gallery/${item.key}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/images/hero-bg.webp`,
        `${SITE_URL}/images/about-us-bg-1.webp`,
      ],
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery/all`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...galleryUrls,
  ];
}
