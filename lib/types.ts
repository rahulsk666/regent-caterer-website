export type ActionResult = {
  success: boolean;
  error?: string;
};
// ─────────────────────────────
// Reviews
// ─────────────────────────────

export type Review = {
  id?: number;
  name: string;
  email?: string;
  designation: string;
  rating: number;
  review: string;
  image?: string;
  highlightedHome?: boolean;
  approved?: boolean;
  createdAt?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export type ReviewActionState = {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  values?: {
    name?: string;
    email?: string;
    designation?: string;
    message?: string;
    rating?: number;
  };
};

// ─────────────────────────────
// Contact Details
// ─────────────────────────────

export type ContactDetails = {
  id?: number;
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  mapUrl?: string;
};

// ─────────────────────────────
// Contact Form Submissions
// ─────────────────────────────

export type ContactSubmission = {
  id?: number;
  name: string;
  email: string | undefined;
  phone: string;
  service: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

export type ContactActionState = {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  values?: {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
  };
};

// ─────────────────────────────
// Shared Image Sections
// Delightful Moments
// Signature Collections
// Gallery
// Delicious Cuisine
// Luscious Desserts
// Healthy Salad Counters
// Elegant Food Counters
// Premium Cutleries
// ─────────────────────────────

export const sectionKeys = [
  { key: "delightful-moments", label: "Delightful Moments" },
  { key: "signature-collections", label: "Signature Collections" },
  { key: "gallery", label: "Gallery" },
] as const;

export type SectionKey = (typeof sectionKeys)[number]["key"];

// Sections whose published image count the home page depends on and must
// not drop below the minimum. Mirrors app/admin/action.ts deleteSectionImageAction.
export const protectedSections: SectionKey[] = [
  "delightful-moments",
  "signature-collections",
];
export const MIN_PROTECTED_SECTION_IMAGES = 5;

export type SectionImage = {
  id: string;
  url: string;
  section: SectionKey;
  featured?: boolean;
  published?: boolean;
  mediaType?: "image" | "video";
  galleryType?: GalleryType;
};

export type SectionVideo = {
  id: string;
  url: string;
  section: SectionKey;
  featured?: boolean;
  published?: boolean;
  mediaType?: "image" | "video";
  galleryType?: GalleryType;
};

export const galleryTypes = [
  { key: "none", label: "All Gallery" },
  {
    key: "delicious-cuisine",
    label: "Delicious Cuisine",
  },
  {
    key: "luscious-desserts",
    label: "Luscious Desserts",
  },
  {
    key: "healthy-salad-counters",
    label: "Healthy Salad Counters",
  },
  {
    key: "elegant-food-counters",
    label: "Elegant Food Counters",
  },
  {
    key: "premium-cutleries",
    label: "Premium Cutleries",
  },
] as const;

export type GalleryType = "none" | (typeof galleryTypes)[number]["key"];

export type MediaType = "image" | "video";

// ─────────────────────────────
// Menu
// ─────────────────────────────

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  published?: boolean;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: string;
  image?: string;
  featured?: boolean;
  published?: boolean;
};

// ─────────────────────────────
// Services
// ─────────────────────────────

export type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
  startingPrice?: string;
  features: string[];
  featured?: boolean;
  published?: boolean;
};

// ─────────────────────────────
// Admin Dashboard
// ─────────────────────────────

export type AdminsSection =
  | "overview"
  | "Menu"
  | "images"
  | "videos"
  | "services"
  | "reviews"
  | "contacts";

export type DashboardStats = {
  reviews: number;
  pendingReviews: number;
  contacts: number;
  unreadContacts: number;
};
