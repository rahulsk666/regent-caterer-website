// import fs from "fs";
// import path from "path";
// import Database from "better-sqlite3";
import type {
  ContactDetails,
  ContactSubmission,
  GalleryType,
  Review,
  SectionImage,
  SectionKey,
  SectionVideo,
} from "@/lib/types";
import { deleteFile } from "./fileStorage";
// import { testimonials } from "./data";
import { db } from "./turso";

// const DATA_DIR = path.join(process.cwd(), "data");
// const DB_FILE = path.join(DATA_DIR, "db.sqlite");

// function ensureDataDirectory() {
//   if (!fs.existsSync(DATA_DIR)) {
//     fs.mkdirSync(DATA_DIR, { recursive: true });
//   }
// }

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
  url: string;
  section: SectionKey;
  featured: number;
  published: number;
  media_type?: "image" | "video";
  gallery_type?: GalleryType;
}

interface SectionVideoRow {
  id: string;
  url: string;
  section: SectionKey;
  featured: number;
  published: number;
  media_type?: "image" | "video";
  gallery_type?: GalleryType;
}

// interface MenuCategoryRow {
//   id: string;
//   name: string;
//   description?: string | null;
//   image?: string | null;
//   published: number;
// }

// interface MenuItemRow {
//   id: string;
//   categoryId: string;
//   name: string;
//   description?: string | null;
//   price: string;
//   image?: string | null;
//   featured: number;
//   published: number;
// }

// interface ServiceRow {
//   id: string;
//   title: string;
//   description: string;
//   image?: string | null;
//   startingPrice?: string | null;
//   features: string;
//   featured: number;
//   published: number;
// }

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
    url: row.url,
    section: row.section,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    mediaType: row.media_type,
    galleryType: row.gallery_type as GalleryType,
  };
}

function rowToSectionVideo(row: SectionVideoRow): SectionVideo {
  return {
    id: row.id,
    url: row.url,
    section: row.section,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    mediaType: row.media_type,
    galleryType: row.gallery_type as GalleryType,
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

// function seedDatabase(db: Database.Database) {
//   try {
//     // Contact Details
//     const contactCount = (
//       db.prepare("SELECT COUNT(*) as count FROM contact_details").get() as {
//         count: number;
//       }
//     ).count;

//     if (contactCount === 0) {
//       db.prepare(
//         `
//         INSERT INTO contact_details
//         (phone, whatsapp, email, address)
//         VALUES (?, ?, ?, ?)
//       `,
//       ).run(
//         "+91 9876543210",
//         "+91 9876543210",
//         "info@yourbusiness.com",
//         "Thrissur, Kerala",
//       );
//     }

//     // Reviews
//     const reviewCount = (
//       db.prepare("SELECT COUNT(*) as count FROM reviews").get() as {
//         count: number;
//       }
//     ).count;

//     if (reviewCount === 0) {
//       const reviewStmt = db.prepare(`
//         INSERT INTO reviews
//         (name, rating, designation, review, image, highlighted_home, approved)
//         VALUES (?, ?, ?, ?, ?, 1, 1)
//       `);

//       for (const testimonial of testimonials) {
//         reviewStmt.run(
//           testimonial.name,
//           testimonial.rating,
//           testimonial.designation,
//           testimonial.review,
//           testimonial.image,
//         );
//       }
//     }

//     // Section Images
//     const imageCount = (
//       db.prepare("SELECT COUNT(*) as count FROM section_images").get() as {
//         count: number;
//       }
//     ).count;

//     if (imageCount === 0) {
//       const imageStmt = db.prepare(`
//         INSERT INTO section_images
//         (id, image, section, featured, published)
//         VALUES (?, ?, ?, ?, ?)
//       `);

//       // Delightful Moments
//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/delightful/moments-1.jpg",
//         "delightful-moments",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/delightful/moments-2.jpg",
//         "delightful-moments",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/delightful/moments-3.jpg",
//         "delightful-moments",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/delightful/moments-4.jpg",
//         "delightful-moments",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/delightful/moments-5.jpg",
//         "delightful-moments",
//         0,
//         1,
//       );

//       // Signature Collections
//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/signature/food-1.jpg",
//         "signature-collections",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/signature/food-2.jpg",
//         "signature-collections",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/signature/food-3.jpg",
//         "signature-collections",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/signature/food-4.jpg",
//         "signature-collections",
//         0,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/uploads/signature/food-5.jpg",
//         "signature-collections",
//         0,
//         1,
//       );

//       // Gallery
//       imageStmt.run(
//         crypto.randomUUID(),
//         "/images/gallery/1.jpg",
//         "gallery",
//         1,
//         1,
//       );

//       imageStmt.run(
//         crypto.randomUUID(),
//         "/images/gallery/2.jpg",
//         "gallery",
//         1,
//         1,
//       );
//     }

//     // Services
//     const serviceCount = (
//       db.prepare("SELECT COUNT(*) as count FROM services").get() as {
//         count: number;
//       }
//     ).count;

//     if (serviceCount === 0) {
//       const serviceStmt = db.prepare(`
//         INSERT INTO services
//         (id, title, description, startingPrice, features, featured, published)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `);

//       serviceStmt.run(
//         crypto.randomUUID(),
//         "Wedding Catering",
//         "Complete wedding catering solution.",
//         "₹350/person",
//         JSON.stringify(["Buffet Setup", "Live Counters", "Dessert Station"]),
//         1,
//         1,
//       );

//       serviceStmt.run(
//         crypto.randomUUID(),
//         "Corporate Catering",
//         "Corporate events and conferences.",
//         "₹250/person",
//         JSON.stringify(["Lunch Service", "Tea Breaks", "Custom Menu"]),
//         1,
//         1,
//       );
//     }

//     // Menu Categories
//     const categoryCount = (
//       db.prepare("SELECT COUNT(*) as count FROM menu_categories").get() as {
//         count: number;
//       }
//     ).count;

//     if (categoryCount === 0) {
//       const categoryStmt = db.prepare(`
//         INSERT INTO menu_categories
//         (id, name, published)
//         VALUES (?, ?, ?)
//       `);

//       categoryStmt.run(crypto.randomUUID(), "Starters", 1);

//       categoryStmt.run(crypto.randomUUID(), "Main Course", 1);

//       categoryStmt.run(crypto.randomUUID(), "Desserts", 1);

//       categoryStmt.run(crypto.randomUUID(), "Beverages", 1);
//     }
//   } catch (error) {
//     console.error("Failed to seed database:", error);
//   }
// }

// export const db = openDatabase();
// seedDatabase(db);

// ── Contact Details ────────────────────────────────────────────────────────────────

export async function getContactDetails(): Promise<ContactDetails | null> {
  const result = await db.execute("SELECT * FROM contact_details LIMIT 1");

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  return rowToContactDetails(row as unknown as ContactDetailsRow);
}

export async function saveContactDetails(
  details: ContactDetails,
): Promise<void> {
  await db.execute({
    sql: `
      INSERT INTO contact_details
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
      ON CONFLICT(id)
      DO UPDATE SET
        phone = excluded.phone,
        whatsapp = excluded.whatsapp,
        email = excluded.email,
        address = excluded.address,
        instagram = excluded.instagram,
        facebook = excluded.facebook,
        youtube = excluded.youtube,
        mapUrl = excluded.mapUrl
    `,
    args: [
      details.id ?? 1,
      details.phone,
      details.whatsapp ?? "",
      details.email,
      details.address,
      details.instagram ?? "",
      details.facebook ?? "",
      details.youtube ?? "",
      details.mapUrl ?? "",
    ],
  });
}

// ── Reviews ────────────────────────────────────────────────────────────────

export async function getAllReviews(): Promise<Review[]> {
  const result = await db.execute(
    "SELECT * FROM reviews ORDER BY created_at DESC",
  );

  return result.rows.map((row) => rowToReview(row as unknown as ReviewRow));
}

export async function getFeaturedReviews(): Promise<Review[]> {
  try {
    const result = await db.execute({
      sql: `
        SELECT *
        FROM reviews
        WHERE highlighted_home = ? AND approved = ?
        ORDER BY created_at DESC
      `,
      args: [1, 1],
    });

    return result.rows.map((row) => rowToReview(row as unknown as ReviewRow));
  } catch (error) {
    console.error("getFeaturedReviews failed:", error);
    throw error;
  }
}

export async function saveReview(
  review: Omit<Review, "id" | "createdAt">,
): Promise<number> {
  try {
    const result = await db.execute({
      sql: `
      INSERT INTO reviews (
        name,
        email,
        designation,
        rating,
        review,
        image
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
      args: [
        review.name,
        review.email ?? "",
        review.designation ?? "",
        review.rating,
        review.review,
        review.image ?? "",
      ],
    });

    return Number(result.lastInsertRowid);
  } catch (error) {
    console.error("Failed to save review:", review, error);
    throw error;
  }
}

export async function updateReview(
  id: number,
  review: Partial<Review>,
): Promise<void> {
  try {
    const existingResult = await db.execute({
      sql: "SELECT * FROM reviews WHERE id = ?",
      args: [id],
    });

    const existing = existingResult.rows[0] as unknown as ReviewRow;

    if (!existing) return;

    const oldImage =
      review.image && existing.image && review.image !== existing.image
        ? existing.image
        : undefined;

    await db.execute({
      sql: `
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
      args: [
        review.name ?? null,
        review.email ?? null,
        review.designation ?? null,
        review.rating ?? null,
        review.review ?? null,
        review.image ?? null,
        review.highlightedHome === undefined
          ? null
          : review.highlightedHome
            ? 1
            : 0,
        review.approved === undefined ? null : review.approved ? 1 : 0,
        id,
      ],
    });

    // delete old image only after successful DB update
    if (oldImage) {
      try {
        await deleteFile({ url: oldImage });
      } catch (error) {
        console.error("Failed to delete old image:", oldImage, error);
      }
    }
  } catch (error) {
    console.error("Failed to update review:", id, review, error);
    throw error;
  }
}

export async function deleteReview(id: number): Promise<void> {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM reviews WHERE id = ?",
      args: [id],
    });

    const row = result.rows[0];

    if (!row) return;

    const review = row as unknown as ReviewRow;

    // Delete DB record first
    await db.execute({
      sql: "DELETE FROM reviews WHERE id = ?",
      args: [id],
    });

    // Delete image only after successful DB deletion
    if (review.image) {
      try {
        await deleteFile({ url: review.image });
      } catch (error) {
        console.error("Failed to delete review image:", review.image, error);
      }
    }
  } catch (error) {
    console.error(`Failed to delete review ${id}:`, error);

    throw error;
  }
}

// ── Contact Submission ────────────────────────────────────────────────────────────────

export async function saveContact(
  contact: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<number> {
  const result = await db.execute({
    sql: `
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
    args: [
      contact.name,
      contact.phone,
      contact.email ?? "",
      contact.service,
      contact.message,
    ],
  });

  return Number(result.lastInsertRowid);
}

export async function getAllContacts(): Promise<ContactSubmission[]> {
  const result = await db.execute(
    `
      SELECT *
      FROM contact_submissions
      ORDER BY created_at DESC
    `,
  );

  return result.rows.map((row) => rowToContact(row as unknown as ContactRow));
}

export async function updateContact(id: number, read: boolean): Promise<void> {
  await db.execute({
    sql: `
      UPDATE contact_submissions
      SET read = ?
      WHERE id = ?
    `,
    args: [read ? 1 : 0, id],
  });
}

export async function deleteContact(id: number): Promise<void> {
  try {
    await db.execute({
      sql: `
        DELETE FROM contact_submissions
        WHERE id = ?
      `,
      args: [id],
    });
  } catch (error) {
    console.error(`Failed to delete contact ${id}:`, error);

    throw error;
  }
}

// ── Section Videos ────────────────────────────────────────────────────────────────

export async function getAllSectionVideos(): Promise<SectionVideo[]> {
  const result = await db.execute(`
    SELECT *
    FROM section_images
    WHERE media_type = 'video'
    ORDER BY section ASC
  `);

  return result.rows.map((row) =>
    rowToSectionVideo(row as unknown as SectionVideoRow),
  );
}

export async function getSectionVideos(
  galleryType: GalleryType,
): Promise<SectionVideo[]> {
  const result = await db.execute({
    sql: `
        SELECT *
        FROM section_images
        WHERE section = 'gallery'
        AND media_type = 'video'
        AND published = true
        AND gallery_type = ?
      `,
    args: [galleryType],
  });

  return result.rows.map((row) =>
    rowToSectionVideo(row as unknown as SectionVideoRow),
  );
}

export async function saveSectionVideo(video: SectionVideo): Promise<void> {
  const result = await db.execute({
    sql: `
      SELECT *
      FROM section_images
      WHERE id = ?
    `,
    args: [video.id],
  });

  const row = result.rows[0];

  const existing = row ? (row as unknown as SectionVideoRow) : undefined;

  const oldVideo =
    existing && existing.url && existing.url !== video.url
      ? existing.url
      : undefined;

  await db.execute({
    sql: `
      INSERT INTO section_images
      (
        id,
        url,
        section,
        featured,
        published,
        media_type,
        gallery_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id)
      DO UPDATE SET
        url = excluded.url,
        section = excluded.section,
        featured = excluded.featured,
        published = excluded.published,
        media_type = excluded.media_type,
        gallery_type = excluded.gallery_type
    `,
    args: [
      video.id,
      video.url,
      video.section,
      video.featured ? 1 : 0,
      video.published ? 1 : 0,
      video.mediaType || "video",
      video.galleryType || "none",
    ],
  });

  if (oldVideo) {
    try {
      await deleteFile({ url: oldVideo });
    } catch (error) {
      console.error("Failed to delete old video:", oldVideo, error);
    }
  }
}

export async function updateSectionVideo(
  id: string,
  updates: {
    featured?: boolean;
    published?: boolean;
  },
): Promise<void> {
  const result = await db.execute({
    sql: `
      SELECT *
      FROM section_images
      WHERE id = ?
    `,
    args: [id],
  });

  const row = result.rows[0];

  if (!row) {
    throw new Error("Video not found");
  }

  const existing = row as unknown as SectionVideoRow;

  await db.execute({
    sql: `
      UPDATE section_images
      SET
        featured = ?,
        published = ?
      WHERE id = ?
    `,
    args: [
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
    ],
  });
}

export async function deleteSectionVideo(id: string): Promise<void> {
  try {
    const result = await db.execute({
      sql: `
        SELECT *
        FROM section_images
        WHERE id = ?
      `,
      args: [id],
    });

    const row = result.rows[0];

    if (!row) return;

    const video = row as unknown as SectionVideoRow;

    await db.execute({
      sql: `
        DELETE FROM section_images
        WHERE id = ?
      `,
      args: [id],
    });

    if (video.url) {
      try {
        await deleteFile({ url: video.url });
      } catch (error) {
        console.error("Failed to delete video:", video.url, error);
      }
    }
  } catch (error) {
    console.error(`Failed to delete section video ${id}:`, error);

    throw error;
  }
}

// ── Section Images ────────────────────────────────────────────────────────────────

export async function getAllSectionImages(): Promise<SectionImage[]> {
  const result = await db.execute(
    `
      SELECT *
      FROM section_images
      WHERE media_type = 'image'
      ORDER BY section ASC
    `,
  );

  return result.rows.map((row) =>
    rowToSectionImage(row as unknown as SectionImageRow),
  );
}

export async function getSectionImages(
  section: SectionImage["section"],
  galleryType?: GalleryType,
): Promise<SectionImage[]> {
  if (section === "gallery" && galleryType && galleryType !== "none") {
    const result = await db.execute({
      sql: `
      SELECT *
      FROM section_images
      WHERE section = ?
      AND published = true
      AND media_type = 'image'
      AND gallery_type = ?
    `,
      args: [section, galleryType],
    });
    return result.rows.map((row) =>
      rowToSectionImage(row as unknown as SectionImageRow),
    );
  }
  const result = await db.execute({
    sql: `
      SELECT *
      FROM section_images
      WHERE section = ?
      AND published = true
      AND media_type = 'image'
    `,
    args: [section],
  });

  return result.rows.map((row) =>
    rowToSectionImage(row as unknown as SectionImageRow),
  );
}

export async function saveSectionImage(image: SectionImage): Promise<void> {
  const result = await db.execute({
    sql: `
      SELECT *
      FROM section_images
      WHERE id = ?
    `,
    args: [image.id],
  });

  const row = result.rows[0];

  const existing = row ? (row as unknown as SectionImageRow) : undefined;

  const oldImage =
    existing && existing.url && existing.url !== image.url
      ? existing.url
      : undefined;

  await db.execute({
    sql: `
      INSERT INTO section_images
      (
        id,
        url,
        section,
        featured,
        published,
        media_type,
        gallery_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id)
      DO UPDATE SET
        url = excluded.url,
        section = excluded.section,
        featured = excluded.featured,
        published = excluded.published,
        media_type = excluded.media_type,
        gallery_type = excluded.gallery_type
    `,
    args: [
      image.id,
      image.url,
      image.section,
      image.featured ? 1 : 0,
      image.published ? 1 : 0,
      image.mediaType || "image",
      image.galleryType || "none",
    ],
  });

  if (oldImage) {
    try {
      await deleteFile({ url: oldImage });
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
  const result = await db.execute({
    sql: `
      SELECT *
      FROM section_images
      WHERE id = ?
    `,
    args: [id],
  });

  const row = result.rows[0];

  if (!row) {
    throw new Error("Image not found");
  }

  const existing = row as unknown as SectionImageRow;

  await db.execute({
    sql: `
      UPDATE section_images
      SET
        featured = ?,
        published = ?
      WHERE id = ?
    `,
    args: [
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
    ],
  });
}

export async function deleteSectionImage(id: string): Promise<void> {
  try {
    const result = await db.execute({
      sql: `
        SELECT *
        FROM section_images
        WHERE id = ?
      `,
      args: [id],
    });

    const row = result.rows[0];

    if (!row) return;

    const image = row as unknown as SectionImageRow;

    await db.execute({
      sql: `
        DELETE FROM section_images
        WHERE id = ?
      `,
      args: [id],
    });

    if (image.url) {
      try {
        await deleteFile({ url: image.url });
      } catch (error) {
        console.error("Failed to delete image:", image.url, error);
      }
    }
  } catch (error) {
    console.error(`Failed to delete section image ${id}:`, error);

    throw error;
  }
}

// ── Menu Categories ────────────────────────────────────────────────────────────────

// export function getMenuCategories() {
//   return (
//     db
//       .prepare("SELECT * FROM menu_categories ORDER BY name")
//       .all() as MenuCategoryRow[]
//   ).map(rowToMenuCategory);
// }

// export async function saveMenuCategory(category: MenuCategory): Promise<void> {
//   const existing = db
//     .prepare("SELECT * FROM menu_categories WHERE id = ?")
//     .get(category.id) as MenuCategoryRow | undefined;

//   if (existing && existing.image && existing.image !== category.image) {
//     await deleteFile(existing.image);
//   }

//   db.prepare(
//     `
//     INSERT OR REPLACE INTO menu_categories
//     (
//       id,
//       name,
//       description,
//       image,
//       published
//     )
//     VALUES (?, ?, ?, ?, ?)
//   `,
//   ).run(
//     category.id,
//     category.name,
//     category.description ?? "",
//     category.image ?? "",
//     category.published ? 1 : 0,
//   );
// }

// export async function deleteMenuCategory(id: string): Promise<void> {
//   const category = db
//     .prepare("SELECT * FROM menu_categories WHERE id = ?")
//     .get(id) as MenuCategoryRow | undefined;

//   if (!category) return;

//   await deleteFile(category.image || undefined);

//   db.prepare("DELETE FROM menu_categories WHERE id = ?").run(id);
// }

// // ── Menu Items ────────────────────────────────────────────────────────────────
// export function getMenuItems() {
//   return (
//     db.prepare("SELECT * FROM menu_items ORDER BY name").all() as MenuItemRow[]
//   ).map(rowToMenuItem);
// }

// export function getMenuItemsByCategory(categoryId: string) {
//   return (
//     db
//       .prepare("SELECT * FROM menu_items WHERE categoryId = ?")
//       .all(categoryId) as MenuItemRow[]
//   ).map(rowToMenuItem);
// }

// export async function saveMenuItem(item: MenuItem): Promise<void> {
//   const existing = db
//     .prepare("SELECT * FROM menu_items WHERE id = ?")
//     .get(item.id) as MenuItemRow | undefined;

//   if (existing && existing.image && existing.image !== item.image) {
//     await deleteFile(existing.image);
//   }

//   db.prepare(
//     `
//     INSERT OR REPLACE INTO menu_items
//     (
//       id,
//       categoryId,
//       name,
//       description,
//       price,
//       image,
//       featured,
//       published
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `,
//   ).run(
//     item.id,
//     item.categoryId,
//     item.name,
//     item.description ?? "",
//     item.price,
//     item.image ?? "",
//     item.featured ? 1 : 0,
//     item.published ? 1 : 0,
//   );
// }

// export async function deleteMenuItem(id: string): Promise<void> {
//   const item = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(id) as
//     | MenuItemRow
//     | undefined;

//   if (!item) return;

//   await deleteFile(item.image || undefined);

//   db.prepare("DELETE FROM menu_items WHERE id = ?").run(id);
// }

// // ── Services ────────────────────────────────────────────────────────────────

// export function getServices() {
//   return (
//     db.prepare("SELECT * FROM services ORDER BY title").all() as ServiceRow[]
//   ).map(rowToService);
// }

// export async function saveService(service: Service): Promise<void> {
//   const existing = db
//     .prepare("SELECT * FROM services WHERE id = ?")
//     .get(service.id) as ServiceRow | undefined;

//   if (existing && existing.image && existing.image !== service.image) {
//     await deleteFile(existing.image);
//   }

//   db.prepare(
//     `
//     INSERT OR REPLACE INTO services
//     (
//       id,
//       title,
//       description,
//       image,
//       startingPrice,
//       features,
//       featured,
//       published
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `,
//   ).run(
//     service.id,
//     service.title,
//     service.description,
//     service.image ?? "",
//     service.startingPrice ?? "",
//     JSON.stringify(service.features),
//     service.featured ? 1 : 0,
//     service.published ? 1 : 0,
//   );
// }

// export async function deleteService(id: string): Promise<void> {
//   const service = db.prepare("SELECT * FROM services WHERE id = ?").get(id) as
//     | ServiceRow
//     | undefined;

//   if (!service) return;

//   await deleteFile(service.image || undefined);

//   db.prepare("DELETE FROM services WHERE id = ?").run(id);
// }

// ── Dashboard Stats ────────────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [
    reviewsResult,
    pendingReviewsResult,
    contactsResult,
    unreadContactsResult,
    sectionImagesResult,
  ] = await Promise.all([
    db.execute("SELECT COUNT(*) AS count FROM reviews"),
    db.execute("SELECT COUNT(*) AS count FROM reviews WHERE approved = 0"),
    db.execute("SELECT COUNT(*) AS count FROM contact_submissions"),
    db.execute(
      "SELECT COUNT(*) AS count FROM contact_submissions WHERE read = 0",
    ),
    db.execute("SELECT COUNT(*) AS count FROM section_images"),
  ]);

  return {
    reviews: Number(reviewsResult.rows[0]?.count ?? 0),

    pendingReviews: Number(pendingReviewsResult.rows[0]?.count ?? 0),

    contacts: Number(contactsResult.rows[0]?.count ?? 0),

    unreadContacts: Number(unreadContactsResult.rows[0]?.count ?? 0),

    sectionImages: Number(sectionImagesResult.rows[0]?.count ?? 0),
  };
}
