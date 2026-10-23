// app/actions.ts

"use server";

import { saveContact } from "@/lib/db";
import { ContactActionState } from "@/lib/types";
import { contactSchema } from "@/lib/validations/contactFormValidation";

export async function createContactAction(
  prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    const values = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
      service: formData.get("service")?.toString(),
      message: formData.get("message")?.toString(),
    };
    const validatedFields = contactSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values,
      };
    }

    await saveContact({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      phone: validatedFields.data.phone,
      service: validatedFields.data.service,
      message: validatedFields.data.message,
      read: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Contact submission error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    };
  }
}
