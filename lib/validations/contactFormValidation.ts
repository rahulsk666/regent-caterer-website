// lib/validations/review.ts

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .or(z.literal("")),

  phone: z.string().trim().min(1, "Please enter your phone number."),

  service: z.string().trim().min(1, "Please enter your service."),

  message: z
    .string()
    .trim()
    .min(5, "Please share a bit more about your experience."),
});
