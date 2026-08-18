// lib/actions.ts
"use server";

import {
  deleteContact,
  deleteReview,
  deleteSectionImage,
  deleteSectionVideo,
  getAllSectionImages,
  getAllSectionVideos,
  saveSectionImage,
  saveSectionVideo,
  updateContact,
  updateReview,
  updateSectionImage,
  updateSectionVideo,
} from "@/lib/db";
import { saveFile } from "@/lib/fileStorage";
import {
  ActionResult,
  GalleryType,
  SectionImage,
  SectionVideo,
} from "@/lib/types";
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
    revalidatePath("/");

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
    revalidatePath("/");

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
  galleryType: GalleryType,
): Promise<ActionResult> {
  try {
    const filePath = await saveFile({
      file,
      folder: section,
      mediaType: "image",
    });

    await saveSectionImage({
      id: crypto.randomUUID(),
      url: filePath,
      section,
      featured: false,
      published: true,
      mediaType: "image",
      galleryType,
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

export async function saveSectionVideoAction(
  section: SectionVideo["section"],
  file: File,
  galleryType?: GalleryType,
): Promise<ActionResult> {
  try {
    const filePath = await saveFile({
      file,
      folder: section,
      mediaType: "video",
    });

    await saveSectionVideo({
      id: crypto.randomUUID(),
      url: filePath,
      section,
      featured: false,
      published: true,
      mediaType: "video",
      galleryType,
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

export async function updateSectionVideoAction(
  id: string,
  updates: {
    featured?: boolean;
    published?: boolean;
  },
): Promise<ActionResult> {
  try {
    await updateSectionVideo(id, updates);

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

export async function deleteSectionVideoAction(
  id: string,
): Promise<ActionResult> {
  try {
    const videos = await getAllSectionVideos();

    const video = videos.find((video) => video.id === id);

    if (!video) {
      return {
        success: false,
        error: "Video not found",
      };
    }

    await deleteSectionVideo(id);

    revalidatePath("/admin");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete video",
    };
  }
}
