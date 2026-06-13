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
      };
    }
    const data = validatedFields.data;

    const file = formData.get("file") as File;

    let imagePath = "";

    if (file && file.size > 0) {
      imagePath = await saveFile(file, "reviews");
    }

    try {
      const id = await saveReview({
        name: data.name,
        email: data.email,
        designation: data.designation,
        rating: data.rating,
        review: data.message,
        image: imagePath,
        approved: false,
      });

      console.log("Review saved", id);
    } catch (error) {
      console.error("saveReview failed", error);
      throw error;
    }

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
