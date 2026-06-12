"use server";

import { revalidatePath } from "next/cache";
import { saveReview } from "@/lib/db";
import { saveFile } from "@/lib/fileStorage";

export async function createReviewAction(
  prevState: {
    success: boolean;
    error?: string;
  },
  formData: FormData,
) {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const designation = formData.get("designation")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    const rating = Number(formData.get("rating"));

    if (!name || !message || !rating) {
      return {
        success: false,
        error: "Please fill all required fields.",
      };
    }

    const file = formData.get("file") as File;

    let imagePath = "";

    if (file && file.size > 0) {
      imagePath = await saveFile(file, "reviews");
    }

    await saveReview({
      name,
      email,
      designation,
      rating,
      review: message,
      image: imagePath,
      approved: false,
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to submit review.",
    };
  }
}
