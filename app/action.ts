"use server";

import { revalidatePath } from "next/cache";
import { saveReview } from "@/lib/db";
import { saveFile } from "@/lib/fileStorage";
import { ReviewActionState } from "@/lib/types";
import { reviewSchema } from "@/lib/validations/reviewFormValidation";

export async function createReviewAction(
  prevState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  try {
    const validatedFields = reviewSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      designation: formData.get("designation"),
      message: formData.get("message"),
      rating: Number(formData.get("rating")),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values: {
          name: formData.get("name")?.toString(),
          email: formData.get("email")?.toString(),
          designation: formData.get("designation")?.toString(),
          message: formData.get("message")?.toString(),
          rating: Number(formData.get("rating")?.toString()),
        },
      };
    }
    const data = validatedFields.data;

    const file = formData.get("file") as File;

    let imagePath = "/images/default-placeholder.jpg";

    if (file && file.size > 0) {
      imagePath = await saveFile({
        file,
        folder: "reviews",
        mediaType: "image",
      });
    }

    try {
      await saveReview({
        name: data.name,
        email: data.email,
        designation: data.designation,
        rating: data.rating,
        review: data.message,
        image: imagePath,
        approved: false,
      });
    } catch (error) {
      console.error("saveReview failed", error);
      throw error;
    }

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Review submission error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    };
  }
}
