"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Button from "./Button";
import { UnderlineInput, UnderlineTextarea } from "./Input";
import { useActionState, useEffect } from "react";
import { createContactAction } from "@/app/contact/action";
import { toast } from "sonner";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(createContactAction, {
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
  });
  return (
    <form action={formAction} className="space-y-4">
      <UnderlineInput
        name="name"
        defaultValue={state.values?.name}
        error={state.errors?.name?.[0]}
        placeholder="Name"
      />
      <UnderlineInput
        name="email"
        defaultValue={state.values?.email}
        error={state.errors?.email?.[0]}
        placeholder="Email"
      />
      <UnderlineInput
        name="phone"
        defaultValue={state.values?.phone}
        error={state.errors?.phone?.[0]}
        placeholder="Phone"
      />
      <UnderlineInput
        name="service"
        defaultValue={state.values?.service}
        error={state.errors?.service?.[0]}
        placeholder="Service"
      />
      <UnderlineTextarea
        variant="plain"
        rows={3}
        defaultValue={state.values?.message}
        error={state.errors?.message?.[0]}
        placeholder="Message"
        name="message"
      />
      <Button
        type="submit"
        variant="custom"
        disabled={isPending}
        className="group/submit w-full h-10 mb-5 gap-2 rounded-xl bg-golden-200 font-galgin text-2xl disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <p className="text-golden-gradient">Submit</p>
        <IconArrowUpRight className="w-6 h-auto text-golden-400 group-hover/submit:rotate-45 transition-all duration-300 ease-in-out" />
      </Button>
    </form>
  );
}
