// lib/actions.ts
"use server";

import {
  deleteContact,
  deleteReview,
  updateContact,
  updateReview,
} from "@/lib/db";
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
