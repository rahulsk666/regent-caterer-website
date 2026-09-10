"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Button from "./CustomButton";
import { UnderlineInput, UnderlineTextarea } from "./Input";
import { useActionState, useEffect } from "react";
import { createContactAction } from "@/app/contact/action";
import { toast } from "sonner";
import { ContactActionState } from "@/lib/types";
import emailjs from "@emailjs/browser";

async function submitContact(
  prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const result = await createContactAction(prevState, formData);

  if (result.success) {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
    } catch (error) {
      console.error("Failed to send contact email notification:", error);
    }
  }

  return result;
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, {
    success: false,
    error: undefined,
    errors: {},
    values: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        "Thank you for contacting us! We will get back to you soon.",
      );
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form noValidate action={formAction} className="space-y-4">
      <UnderlineInput
        name="name"
        defaultValue={state.values?.name}
        error={state.errors?.name?.[0]}
        placeholder="Name"
        className="font-monteserrat"
        required
      />
      <UnderlineInput
        name="email"
        defaultValue={state.values?.email}
        error={state.errors?.email?.[0]}
        className="font-monteserrat"
        placeholder="Email"
      />
      <UnderlineInput
        name="phone"
        defaultValue={state.values?.phone}
        error={state.errors?.phone?.[0]}
        className="font-monteserrat"
        placeholder="Phone"
        required
      />
      <UnderlineInput
        name="service"
        defaultValue={state.values?.service}
        error={state.errors?.service?.[0]}
        className="font-monteserrat"
        placeholder="Service"
        required
      />
      <UnderlineTextarea
        variant="plain"
        rows={3}
        defaultValue={state.values?.message}
        error={state.errors?.message?.[0]}
        className="font-monteserrat"
        placeholder="Message"
        name="message"
        required
      />
      <Button
        type="submit"
        variant="custom"
        disabled={isPending}
        className="group/submit w-full h-10 py-7 mb-5 gap-2 rounded-full font-galgin text-2xl disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background:
            "linear-gradient(108.46deg, rgba(241, 214, 143, 0.33) 0%, rgba(250, 241, 218, 0.33) 100% )",
        }}
      >
        <p className="text-golden-gradient">Send</p>
        <IconArrowUpRight className="w-6 h-auto text-golden-400 group-hover/submit:rotate-45 transition-all duration-300 ease-in-out" />
      </Button>
    </form>
  );
}
