// lib/actions.ts
"use server";

import {
  deleteContact,
  deleteReview,
  deleteSectionImage,
  getAllSectionImages,
  saveSectionImage,
  updateContact,
  updateReview,
  updateSectionImage,
} from "@/lib/db";
import { saveFile } from "@/lib/fileStorage";
import { ActionResult, SectionImage } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateReviewAction(
  id: number,
  updates: {
    approved?: boolean;
    highlightedHome?: boolean;
  },
) {
  try {
    await updateReview(id, updates);

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update review",
    };
  }
}

export async function deleteReviewAction(id: number) {
  try {
    await deleteReview(id);

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete review",
    };
  }
}

export async function markContactReadAction(
  id: number,
  read: boolean,
): Promise<ActionResult> {
  try {
    await updateContact(id, read);

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update contact",
    };
  }
}

export async function deleteContactAction(id: number): Promise<ActionResult> {
  try {
    await deleteContact(id);

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete contact",
    };
  }
}

export async function saveSectionImageAction(
  section: SectionImage["section"],
  file: File,
): Promise<ActionResult> {
  try {
    const filePath = await saveFile(file, section);

    await saveSectionImage({
      id: crypto.randomUUID(),
      image: filePath,
      section,
      featured: false,
      published: true,
    });

    revalidatePath("/admin");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

export async function updateSectionImageAction(
  id: string,
  updates: {
    featured?: boolean;
    published?: boolean;
  },
): Promise<ActionResult> {
  try {
    if (updates.featured === true) {
      const images = await getAllSectionImages(); // all images

      const currentImage = images.find((img) => img.id === id);

      if (!currentImage) {
        return {
          success: false,
          error: "Image not found",
        };
      }

      const protectedSection =
        currentImage.section === "delightful-moments" ||
        currentImage.section === "signature-collections";

      if (protectedSection) {
        const featuredCount = images.filter(
          (img) =>
            img.section === currentImage.section &&
            img.featured &&
            img.id !== id,
        ).length;

        console.log(featuredCount);

        if (featuredCount <= 5) {
          return {
            success: false,
            error: "Atleast 5 featured images are required",
          };
        }
      }
    }

    await updateSectionImage(id, updates);

    revalidatePath("/admin");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update image",
    };
  }
}

export async function deleteSectionImageAction(
  id: string,
): Promise<ActionResult> {
  try {
    const images = await getAllSectionImages();

    const image = images.find((img) => img.id === id);

    if (!image) {
      return {
        success: false,
        error: "Image not found",
      };
    }

    const protectedSection =
      image.section === "delightful-moments" ||
      image.section === "signature-collections";

    if (protectedSection) {
      const sectionCount = images.filter(
        (img) => img.section === image.section,
      ).length;

      if (sectionCount <= 5) {
        return {
          success: false,
          error: `At least 5 images are required in ${image.section}`,
        };
      }
    }

    await deleteSectionImage(id);

    revalidatePath("/admin");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}
