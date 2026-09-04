import { contact } from "@/lib/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// JSON-LD builders. Every field below is sourced from lib/contact.ts, the
// single source of truth for business facts — nothing here is invented.
// Deliberately omitted: foundingDate (the site's own copy disagrees on the
// year), aggregateRating / review / award (no verifiable source).
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
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
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
      { "@type": "City", name: "Thrissur" },
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

/** Homepage: declares the LocalBusiness + WebSite entities. */
export function homeSchema() {
  return graph(localBusinessSchema(), websiteSchema());
}

/** Contact page: full LocalBusiness details again (see note above) + breadcrumb. */
export function contactSchema() {
  return graph(
    localBusinessSchema(),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  );
}

/** Any other page: just a breadcrumb trail. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return graph(breadcrumbList(items));
}
