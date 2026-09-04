// Canonical production origin. Deliberately a constant rather than an env
// var: metadataBase, robots.ts and sitemap.ts all depend on it, and a
// missing/misconfigured NEXT_PUBLIC_SITE_URL would silently fall back to
// localhost with no build error. The domain is stable.
export const SITE_URL = "https://www.regentcaterers.com";
export const SITE_NAME = "Regent Caterers";
