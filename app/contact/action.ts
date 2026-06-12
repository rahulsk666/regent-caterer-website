// app/actions.ts

"use server";

import { saveContact } from "@/lib/db";

export async function createContactAction(
  prevState: {
    success: boolean;
    error?: string;
  },
  formData: FormData,
) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const service = formData.get("service")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !phone || !service || !message) {
    return {
      success: false,
      error: "Please fill all required fields.",
    };
  }

  await saveContact({
    name,
    email,
    phone,
    service,
    message,
    read: false,
  });

  return {
    success: true,
  };
}
