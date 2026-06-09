"use client";

import React, { useState } from "react";
import { UnderlineInput, UnderlineSelect, UnderlineTextarea } from "./ui/Input";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export default function ContactFormV2() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.service.trim()) newErrors.services = "Service is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await Promise.allSettled([
        // emailjs.send(
        //   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        //   process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        //   {
        //     from_name: form.name,
        //     from_email: form.email,
        //     phone: form.phone,
        //     services: form.service,
        //     message: form.message,
        //     to_email: "[EMAIL_ADDRESS]",
        //   },
        //   process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        // ),
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
      ]);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Contact error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6 m-2 p-4 bg-background-elevated rounded-2xl"
    >
      <div className="grid grid-cols-1 gap-8 h-full mt-10 mb-0">
        {/* Full Name */}
        <div className="space-y-2 w-full">
          <UnderlineInput
            name="name"
            value={form.name}
            onChange={handleChange}
            label="Full Name"
            placeholder="John Doe"
            required
            error={errors.name}
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-4"> */}

        {/* Phone Number */}
        <div className="space-y-2 w-full">
          <UnderlineInput
            label="Phone"
            name="phone"
            value={form.phone}
            required
            onChange={handleChange}
            placeholder="+91 9263815374"
            type="tel"
            error={errors.phone}
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2 w-full">
          <UnderlineInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            type="email"
          />
        </div>

        {/* </div> */}

        {/* Services */}
        <div className="space-y-2 w-full">
          <UnderlineSelect
            name="service"
            value={form.service}
            onChange={handleChange}
            label="Services"
            placeholder="Select a service"
            options={[
              { value: "Birthday", label: "Birthday" },
              { value: "Corporate", label: "Corporate" },
              { value: "Wedding", label: "Wedding" },
              { value: "Other", label: "Other" },
            ]}
            error={errors.service}
          />
        </div>

        {/* Message */}
        <div className="space-y-2 w-full">
          <UnderlineTextarea
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
            error={errors.message}
            rows={6}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 mb-5 rounded-xl bg-golden-400 text-white font-medium text-sm shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
