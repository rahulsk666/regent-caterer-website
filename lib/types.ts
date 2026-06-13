export interface Point {
  title: string;
  description: string;
}

export interface PointCardProps {
  point: Point;
}

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
// ─────────────────────────────

export type SectionImage = {
  id: string;
  image: string;
  section: "delightful-moments" | "signature-collections" | "gallery";
  featured?: boolean;
  published?: boolean;
};

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
  | "services"
  | "reviews"
  | "contacts";

export type DashboardStats = {
  reviews: number;
  pendingReviews: number;
  contacts: number;
  unreadContacts: number;
};
