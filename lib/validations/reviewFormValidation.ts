// lib/validations/review.ts

import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .or(z.literal("")),

  designation: z.string().trim().min(1, "Please enter your designation."),

  message: z
    .string()
    .trim()
    .min(5, "Please share a bit more about your experience."),

  rating: z
    .number()
    .min(1, "Please select a rating.")
    .max(5, "Rating must be between 1 and 5."),
});
