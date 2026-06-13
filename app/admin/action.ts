// lib/actions.ts
"use server";

import {
  deleteContact,
  deleteReview,
  deleteSectionImage,
  saveSectionImage,
  updateContact,
  updateReview,
  updateSectionImage,
} from "@/lib/db";
import { saveFile } from "@/lib/fileStorage";
import { SectionImage } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateReviewAction(
  id: number,
  updates: {
    approved?: boolean;
    highlightedHome?: boolean;
  },
) {
  await updateReview(id, updates);

  revalidatePath("/admin");
}

export async function deleteReviewAction(id: number) {
  await deleteReview(id);

  revalidatePath("/admin");
}

export async function markContactReadAction(id: number, read: boolean) {
  await updateContact(id, read);

  revalidatePath("/admin");
}

export async function deleteContactAction(id: number) {
  await deleteContact(id);

  revalidatePath("/admin");
}

export async function saveSectionImageAction(
  section: SectionImage["section"],
  file: File,
) {
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
) {
  await updateSectionImage(id, updates);

  revalidatePath("/admin");
}

export async function deleteSectionImageAction(id: string) {
  await deleteSectionImage(id);

  revalidatePath("/admin");
}
