import { contact } from "@/lib/contact";
import { features } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// JSON-LD builders. Every field below is sourced from lib/contact.ts, the
// single source of truth for business facts — nothing here is invented.
// foundingDate comes from the site's "Since 1996" copy (lib/data.ts stats).
// Deliberately omitted: aggregateRating / review / award (testimonials are
// on-site samples, not a verifiable third-party source).
//
// Each page renders its own <script> tag, so a stable "@id" is reused
// across pages for entity identity — but "@id" only dereferences within a
// single document's @graph, never across separate page loads. Any page that
// needs the business's contact details must include the full object again,
// not a bare { "@id": ... } pointer.

const LOCAL_BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function localBusinessSchema() {
  return {
    "@type": "Caterer",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.webp`,
    image: [
      `${SITE_URL}/opengraph-image`,
      `${SITE_URL}/images/card/delicious_cuisine.jpeg`,
    ],
    description:
      "Wedding and event catering in Thrissur, Kerala, with multi-cuisine menus, live counters and trained service staff.",
    foundingDate: "1996",
    servesCuisine: ["Kerala", "Indian", "Multi-cuisine"],
    hasMap: `https://www.google.com/maps?q=${contact.geo.lat},${contact.geo.lng}`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.phoneDisplay,
      email: contact.email,
      areaServed: "IN",
      availableLanguage: ["English", "Malayalam"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering services",
      itemListElement: features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature.title,
          description: feature.description,
          url: `${SITE_URL}${feature.url}`,
          provider: { "@id": LOCAL_BUSINESS_ID },
        },
      })),
    },
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.streetAddress,
      addressLocality: contact.locality,
      addressRegion: contact.region,
      postalCode: contact.postalCode,
      addressCountry: contact.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: contact.locality },
      { "@type": "State", name: "Kerala" },
    ],
    sameAs: [contact.instagramUrl, contact.facebookUrl],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": LOCAL_BUSINESS_ID },
  };
}

export type BreadcrumbItem = { name: string; path: string };

function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Wraps one or more schema.org nodes into a single @graph document. */
function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function webPage({
  path,
  name,
  description,
  type = "WebPage",
  breadcrumb,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ContactPage" | "CollectionPage";
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path === "/" ? "" : path}/#webpage`,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": LOCAL_BUSINESS_ID },
    ...(breadcrumb ? { breadcrumb: breadcrumbList(breadcrumb) } : {}),
  };
}

/** Homepage: declares the LocalBusiness + WebSite entities. */
export function homeSchema() {
  return graph(
    localBusinessSchema(),
    websiteSchema(),
    webPage({
      path: "/",
      name: "Regent Caterers | Catering Services in Thrissur, Kerala",
      description:
        "Wedding and event catering in Thrissur, Kerala. Regent Caterers serves multi-cuisine menus, live counters and trained service staff for every celebration.",
    }),
  );
}

/** Contact page: full LocalBusiness details again (see note above) + breadcrumb. */
export function contactSchema() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  return graph(
    localBusinessSchema(),
    websiteSchema(),
    webPage({
      path: "/contact",
      name: "Contact Us",
      description:
        "Get in touch with Regent Caterers in Thrissur, Kerala for wedding and event catering.",
      type: "ContactPage",
      breadcrumb: trail,
    }),
  );
}

/** Any other page: just a breadcrumb trail. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return graph(breadcrumbList(items));
}

/** Gallery page: breadcrumb + CollectionPage + ImageGallery of published images. */
export function gallerySchema({
  path,
  name,
  description,
  trail,
  imageUrls,
}: {
  path: string;
  name: string;
  description: string;
  trail: BreadcrumbItem[];
  imageUrls: string[];
}) {
  return graph(
    webPage({
      path,
      name,
      description,
      type: "CollectionPage",
      breadcrumb: trail,
    }),
    {
      "@type": "ImageGallery",
      name,
      description,
      url: `${SITE_URL}${path}`,
      isPartOf: { "@id": WEBSITE_ID },
      author: { "@id": LOCAL_BUSINESS_ID },
      image: imageUrls.slice(0, 30).map((url, index) => ({
        "@type": "ImageObject",
        contentUrl: url,
        caption: `${name} - Regent Caterers Thrissur, photo ${index + 1}`,
      })),
    },
  );
}
