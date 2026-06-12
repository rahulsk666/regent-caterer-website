import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import type {
  ContactDetails,
  ContactSubmission,
  MenuCategory,
  MenuItem,
  Review,
  SectionImage,
  Service,
} from "@/lib/types";
import { deleteFile } from "./fileStorage";
import { testimonials } from "./data";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.sqlite");

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

interface ReviewRow {
  id: number;
  name: string;
  email?: string | null;
  designation: string;
  rating: number;
  review: string;
  image?: string | null;
  highlighted_home: number;
  approved: number;
  created_at: string;
}

interface ContactRow {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  message: string;
  read: number;
  created_at: string;
}

interface SectionImageRow {
  id: string;
  image: string;
  section: "delightful-moments" | "signature-collections" | "gallery";
  featured: number;
  published: number;
}

interface MenuCategoryRow {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  published: number;
}

interface MenuItemRow {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  price: string;
  image?: string | null;
  featured: number;
  published: number;
}

interface ServiceRow {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  startingPrice?: string | null;
  features: string;
  featured: number;
  published: number;
}

interface ContactDetailsRow {
  id: number;
  phone: string;
  whatsapp?: string | null;
  email: string;
  address: string;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  mapUrl?: string | null;
}

function rowToReview(row: ReviewRow): Review {
  return {
    id: row.id,
    name: row.name,
    email: row.email || undefined,
    designation: row.designation,
    rating: row.rating,
    review: row.review,
    image: row.image || undefined,
    highlightedHome: Boolean(row.highlighted_home),
    approved: Boolean(row.approved),
    createdAt: row.created_at,
  };
}

function rowToContact(row: ContactRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email || undefined,
    service: row.service,
    message: row.message,
    read: Boolean(row.read),
    createdAt: row.created_at,
  };
}

function rowToSectionImage(row: SectionImageRow): SectionImage {
  return {
    id: row.id,
    image: row.image,
    section: row.section,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
  };
}

function rowToMenuCategory(row: MenuCategoryRow): MenuCategory {
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    image: row.image || undefined,
    published: Boolean(row.published),
  };
}

function rowToMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    categoryId: row.categoryId,
    name: row.name,
    description: row.description || undefined,
    price: row.price,
    image: row.image || undefined,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
  };
}

function rowToService(row: ServiceRow): Service {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image || undefined,
    startingPrice: row.startingPrice || undefined,
    features: JSON.parse(row.features),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
  };
}

function rowToContactDetails(row: ContactDetailsRow): ContactDetails {
  return {
    id: row.id,
    phone: row.phone,
    whatsapp: row.whatsapp || undefined,
    email: row.email,
    address: row.address,
    instagram: row.instagram || undefined,
    facebook: row.facebook || undefined,
    youtube: row.youtube || undefined,
    mapUrl: row.mapUrl || undefined,
  };
}

function openDatabase() {
  ensureDataDirectory();

  const db = new Database(DB_FILE);

  db.exec(`
    -- Contact Details
    CREATE TABLE IF NOT EXISTS contact_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      whatsapp TEXT,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      instagram TEXT,
      facebook TEXT,
      youtube TEXT,
      mapUrl TEXT
    );

    -- Reviews
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT DEFAULT '',
      designation TEXT DEFAULT '',
      rating REAL NOT NULL,
      review TEXT NOT NULL,
      image TEXT DEFAULT '',
      highlighted_home INTEGER DEFAULT 0,
      approved INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Contact Form Submissions
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT DEFAULT '',
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Delightful Moments / Signature Collections / Gallery
    CREATE TABLE IF NOT EXISTS section_images (
      id TEXT PRIMARY KEY,
      image TEXT NOT NULL,
      section TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    -- Menu Categories
    CREATE TABLE IF NOT EXISTS menu_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      published INTEGER DEFAULT 1
    );

    -- Menu Items
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      categoryId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT NOT NULL,
      image TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      FOREIGN KEY(categoryId) REFERENCES menu_categories(id)
    );

    -- Services
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      startingPrice TEXT,
      features TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );
  `);

  return db;
}

function seedDatabase(db: Database.Database) {
  try {
    // Contact Details
    const contactCount = (
      db.prepare("SELECT COUNT(*) as count FROM contact_details").get() as {
        count: number;
      }
    ).count;

    if (contactCount === 0) {
      db.prepare(
        `
        INSERT INTO contact_details
        (phone, whatsapp, email, address)
        VALUES (?, ?, ?, ?)
      `,
      ).run(
        "+91 9876543210",
        "+91 9876543210",
        "info@yourbusiness.com",
        "Thrissur, Kerala",
      );
    }

    // Reviews
    const reviewCount = (
      db.prepare("SELECT COUNT(*) as count FROM reviews").get() as {
        count: number;
      }
    ).count;

    if (reviewCount === 0) {
      const reviewStmt = db.prepare(`
        INSERT INTO reviews
        (name, rating, designation, review, image, highlighted_home, approved)
        VALUES (?, ?, ?, ?, ?, 1, 1)
      `);

      for (const testimonial of testimonials) {
        reviewStmt.run(
          testimonial.name,
          testimonial.rating,
          testimonial.designation,
          testimonial.review,
          testimonial.image,
        );
      }
    }

    // Section Images
    const imageCount = (
      db.prepare("SELECT COUNT(*) as count FROM section_images").get() as {
        count: number;
      }
    ).count;

    if (imageCount === 0) {
      const imageStmt = db.prepare(`
        INSERT INTO section_images
        (id, image, section, featured, published)
        VALUES (?, ?, ?, ?, ?)
      `);

      // Delightful Moments
      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/delightful/moments-1.jpg",
        "delightful-moments",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/delightful/moments-2.jpg",
        "delightful-moments",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/delightful/moments-3.jpg",
        "delightful-moments",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/delightful/moments-4.jpg",
        "delightful-moments",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/delightful/moments-5.jpg",
        "delightful-moments",
        0,
        1,
      );

      // Signature Collections
      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/signature/food-1.jpg",
        "signature-collections",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/signature/food-2.jpg",
        "signature-collections",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/signature/food-3.jpg",
        "signature-collections",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/signature/food-4.jpg",
        "signature-collections",
        0,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/uploads/signature/food-5.jpg",
        "signature-collections",
        0,
        1,
      );

      // Gallery
      imageStmt.run(
        crypto.randomUUID(),
        "/images/gallery/1.jpg",
        "gallery",
        1,
        1,
      );

      imageStmt.run(
        crypto.randomUUID(),
        "/images/gallery/2.jpg",
        "gallery",
        1,
        1,
      );
    }

    // Services
    const serviceCount = (
      db.prepare("SELECT COUNT(*) as count FROM services").get() as {
        count: number;
      }
    ).count;

    if (serviceCount === 0) {
      const serviceStmt = db.prepare(`
        INSERT INTO services
        (id, title, description, startingPrice, features, featured, published)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      serviceStmt.run(
        crypto.randomUUID(),
        "Wedding Catering",
        "Complete wedding catering solution.",
        "₹350/person",
        JSON.stringify(["Buffet Setup", "Live Counters", "Dessert Station"]),
        1,
        1,
      );

      serviceStmt.run(
        crypto.randomUUID(),
        "Corporate Catering",
        "Corporate events and conferences.",
        "₹250/person",
        JSON.stringify(["Lunch Service", "Tea Breaks", "Custom Menu"]),
        1,
        1,
      );
    }

    // Menu Categories
    const categoryCount = (
      db.prepare("SELECT COUNT(*) as count FROM menu_categories").get() as {
        count: number;
      }
    ).count;

    if (categoryCount === 0) {
      const categoryStmt = db.prepare(`
        INSERT INTO menu_categories
        (id, name, published)
        VALUES (?, ?, ?)
      `);

      categoryStmt.run(crypto.randomUUID(), "Starters", 1);

      categoryStmt.run(crypto.randomUUID(), "Main Course", 1);

      categoryStmt.run(crypto.randomUUID(), "Desserts", 1);

      categoryStmt.run(crypto.randomUUID(), "Beverages", 1);
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

export const db = openDatabase();
seedDatabase(db);

// ── Contact Details ────────────────────────────────────────────────────────────────

export function getContactDetails() {
  const row = db.prepare("SELECT * FROM contact_details LIMIT 1").get() as
    | ContactDetailsRow
    | undefined;

  return row ? rowToContactDetails(row) : null;
}

export function saveContactDetails(details: ContactDetails): void {
  db.prepare(
    `
    INSERT OR REPLACE INTO contact_details
    (
      id,
      phone,
      whatsapp,
      email,
      address,
      instagram,
      facebook,
      youtube,
      mapUrl
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(
    details.id ?? 1,
    details.phone,
    details.whatsapp ?? "",
    details.email,
    details.address,
    details.instagram ?? "",
    details.facebook ?? "",
    details.youtube ?? "",
    details.mapUrl ?? "",
  );
}

// ── Reviews ────────────────────────────────────────────────────────────────

export function getAllReviews(): Review[] {
  return (
    db
      .prepare("SELECT * FROM reviews ORDER BY created_at DESC")
      .all() as ReviewRow[]
  ).map(rowToReview);
}

export function getFeaturedReviews(): Review[] {
  return (
    db
      .prepare(
        "SELECT * FROM reviews WHERE highlighted_home = 1 AND approved = 1 ORDER BY created_at DESC",
      )
      .all() as ReviewRow[]
  ).map(rowToReview);
}

export function saveReview(review: Omit<Review, "id" | "createdAt">): number {
  const result = db
    .prepare(
      `
      INSERT INTO reviews (
        name,
        email,
        designation,
        rating,
        review,
        image,
        highlighted_home,
        approved
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    )
    .run(
      review.name,
      review.email ?? "",
      review.designation ?? "",
      review.rating,
      review.review,
      review.image ?? "",
      review.highlightedHome ? 1 : 0,
      review.approved ? 1 : 0,
    );

  return result.lastInsertRowid as number;
}

export async function updateReview(
  id: number,
  review: Partial<Review>,
): Promise<void> {
  const existing = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
    | ReviewRow
    | undefined;

  if (!existing) return;

  if (review.image && existing.image && review.image !== existing.image) {
    await deleteFile(existing.image);
  }

  db.prepare(
    `
    UPDATE reviews
    SET
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      designation = COALESCE(?, designation),
      rating = COALESCE(?, rating),
      review = COALESCE(?, review),
      image = COALESCE(?, image),
      highlighted_home = COALESCE(?, highlighted_home),
      approved = COALESCE(?, approved)
    WHERE id = ?
  `,
  ).run(
    review.name,
    review.email,
    review.designation,
    review.rating,
    review.review,
    review.image,
    review.highlightedHome === undefined
      ? null
      : review.highlightedHome
        ? 1
        : 0,
    review.approved === undefined ? null : review.approved ? 1 : 0,
    id,
  );
}

export async function deleteReview(id: number): Promise<void> {
  const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(id) as
    | ReviewRow
    | undefined;

  if (!review) return;

  await deleteFile(review.image || undefined);

  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
}

// ── Contact Submission ────────────────────────────────────────────────────────────────

export function saveContact(
  contact: Omit<ContactSubmission, "id" | "createdAt">,
) {
  db.prepare(
    `
    INSERT INTO contact_submissions
    (
      name,
      phone,
      email,
      service,
      message
    )
    VALUES (?, ?, ?, ?, ?)
  `,
  ).run(
    contact.name,
    contact.phone,
    contact.email ?? "",
    contact.service,
    contact.message,
  );
}

export function getAllContacts() {
  return (
    db
      .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC")
      .all() as ContactRow[]
  ).map(rowToContact);
}

export function updateContact(id: number, read: boolean) {
  db.prepare(
    `
    UPDATE contact_submissions
    SET read = ?
    WHERE id = ?
  `,
  ).run(read ? 1 : 0, id);
}

export function deleteContact(id: number) {
  db.prepare("DELETE FROM contact_submissions WHERE id = ?").run(id);
}

// ── Section Images ────────────────────────────────────────────────────────────────

export function getAllSectionImages(): SectionImage[] {
  return (
    db
      .prepare("SELECT * FROM section_images ORDER BY section ASC")
      .all() as SectionImageRow[]
  ).map(rowToSectionImage);
}

export function getSectionImages(
  section: SectionImage["section"],
): SectionImage[] {
  return (
    db
      .prepare("SELECT * FROM section_images WHERE section = ?")
      .all(section) as SectionImageRow[]
  ).map(rowToSectionImage);
}

export async function saveSectionImage(image: SectionImage): Promise<void> {
  const existing = db
    .prepare("SELECT * FROM section_images WHERE id = ?")
    .get(image.id) as SectionImageRow | undefined;

  const oldImage =
    existing && existing.image && existing.image !== image.image
      ? existing.image
      : undefined;

  const saveTransaction = db.transaction((image: SectionImage) => {
    db.prepare(
      `
        INSERT OR REPLACE INTO section_images
        (
          id,
          image,
          section,
          featured,
          published
        )
        VALUES (?, ?, ?, ?, ?)
      `,
    ).run(
      image.id,
      image.image,
      image.section,
      image.featured ? 1 : 0,
      image.published ? 1 : 0,
    );
  });

  // If this throws, nothing after it runs
  saveTransaction(image);

  // Only delete old file after successful commit
  if (oldImage) {
    try {
      await deleteFile(oldImage);
    } catch (error) {
      console.error("Failed to delete old image:", oldImage, error);
    }
  }
}

export async function updateSectionImage(
  id: string,
  updates: {
    featured?: boolean;
    published?: boolean;
  },
): Promise<void> {
  const existing = db
    .prepare("SELECT * FROM section_images WHERE id = ?")
    .get(id) as SectionImageRow | undefined;

  if (!existing) {
    throw new Error("Image not found");
  }

  db.prepare(
    `
    UPDATE section_images
    SET
      featured = ?,
      published = ?
    WHERE id = ?
  `,
  ).run(
    updates.featured === undefined
      ? existing.featured
      : updates.featured
        ? 1
        : 0,

    updates.published === undefined
      ? existing.published
      : updates.published
        ? 1
        : 0,

    id,
  );
}

export async function deleteSectionImage(id: string): Promise<void> {
  const image = db
    .prepare("SELECT * FROM section_images WHERE id = ?")
    .get(id) as SectionImageRow | undefined;

  if (!image) return;

  await deleteFile(image.image);

  db.prepare("DELETE FROM section_images WHERE id = ?").run(id);
}

// ── Menu Categories ────────────────────────────────────────────────────────────────

export function getMenuCategories() {
  return (
    db
      .prepare("SELECT * FROM menu_categories ORDER BY name")
      .all() as MenuCategoryRow[]
  ).map(rowToMenuCategory);
}

export async function saveMenuCategory(category: MenuCategory): Promise<void> {
  const existing = db
    .prepare("SELECT * FROM menu_categories WHERE id = ?")
    .get(category.id) as MenuCategoryRow | undefined;

  if (existing && existing.image && existing.image !== category.image) {
    await deleteFile(existing.image);
  }

  db.prepare(
    `
    INSERT OR REPLACE INTO menu_categories
    (
      id,
      name,
      description,
      image,
      published
    )
    VALUES (?, ?, ?, ?, ?)
  `,
  ).run(
    category.id,
    category.name,
    category.description ?? "",
    category.image ?? "",
    category.published ? 1 : 0,
  );
}

export async function deleteMenuCategory(id: string): Promise<void> {
  const category = db
    .prepare("SELECT * FROM menu_categories WHERE id = ?")
    .get(id) as MenuCategoryRow | undefined;

  if (!category) return;

  await deleteFile(category.image || undefined);

  db.prepare("DELETE FROM menu_categories WHERE id = ?").run(id);
}

// ── Menu Items ────────────────────────────────────────────────────────────────
export function getMenuItems() {
  return (
    db.prepare("SELECT * FROM menu_items ORDER BY name").all() as MenuItemRow[]
  ).map(rowToMenuItem);
}

export function getMenuItemsByCategory(categoryId: string) {
  return (
    db
      .prepare("SELECT * FROM menu_items WHERE categoryId = ?")
      .all(categoryId) as MenuItemRow[]
  ).map(rowToMenuItem);
}

export async function saveMenuItem(item: MenuItem): Promise<void> {
  const existing = db
    .prepare("SELECT * FROM menu_items WHERE id = ?")
    .get(item.id) as MenuItemRow | undefined;

  if (existing && existing.image && existing.image !== item.image) {
    await deleteFile(existing.image);
  }

  db.prepare(
    `
    INSERT OR REPLACE INTO menu_items
    (
      id,
      categoryId,
      name,
      description,
      price,
      image,
      featured,
      published
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(
    item.id,
    item.categoryId,
    item.name,
    item.description ?? "",
    item.price,
    item.image ?? "",
    item.featured ? 1 : 0,
    item.published ? 1 : 0,
  );
}

export async function deleteMenuItem(id: string): Promise<void> {
  const item = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(id) as
    | MenuItemRow
    | undefined;

  if (!item) return;

  await deleteFile(item.image || undefined);

  db.prepare("DELETE FROM menu_items WHERE id = ?").run(id);
}

// ── Services ────────────────────────────────────────────────────────────────

export function getServices() {
  return (
    db.prepare("SELECT * FROM services ORDER BY title").all() as ServiceRow[]
  ).map(rowToService);
}

export async function saveService(service: Service): Promise<void> {
  const existing = db
    .prepare("SELECT * FROM services WHERE id = ?")
    .get(service.id) as ServiceRow | undefined;

  if (existing && existing.image && existing.image !== service.image) {
    await deleteFile(existing.image);
  }

  db.prepare(
    `
    INSERT OR REPLACE INTO services
    (
      id,
      title,
      description,
      image,
      startingPrice,
      features,
      featured,
      published
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(
    service.id,
    service.title,
    service.description,
    service.image ?? "",
    service.startingPrice ?? "",
    JSON.stringify(service.features),
    service.featured ? 1 : 0,
    service.published ? 1 : 0,
  );
}

export async function deleteService(id: string): Promise<void> {
  const service = db.prepare("SELECT * FROM services WHERE id = ?").get(id) as
    | ServiceRow
    | undefined;

  if (!service) return;

  await deleteFile(service.image || undefined);

  db.prepare("DELETE FROM services WHERE id = ?").run(id);
}

// ── Dashboard Stats ────────────────────────────────────────────────────────────────

export function getDashboardStats() {
  return {
    reviews: (
      db.prepare("SELECT COUNT(*) as count FROM reviews").get() as {
        count: number;
      }
    ).count,

    pendingReviews: (
      db
        .prepare("SELECT COUNT(*) as count FROM reviews WHERE approved = 0")
        .get() as { count: number }
    ).count,

    contacts: (
      db.prepare("SELECT COUNT(*) as count FROM contact_submissions").get() as {
        count: number;
      }
    ).count,

    unreadContacts: (
      db
        .prepare(
          "SELECT COUNT(*) as count FROM contact_submissions WHERE read = 0",
        )
        .get() as { count: number }
    ).count,

    services: (
      db.prepare("SELECT COUNT(*) as count FROM services").get() as {
        count: number;
      }
    ).count,

    menuItems: (
      db.prepare("SELECT COUNT(*) as count FROM menu_items").get() as {
        count: number;
      }
    ).count,

    galleryImages: (
      db.prepare("SELECT COUNT(*) as count FROM section_images").get() as {
        count: number;
      }
    ).count,
  };
}
