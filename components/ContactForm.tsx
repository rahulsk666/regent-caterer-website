"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    setSubmitStatus("idle");

    try {
      await Promise.allSettled([
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
            to_email: "websitemedjourney@gmail.com",
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        ),
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
      ]);

      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Contact error:", error);
      setSubmitStatus("error");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="lg:col-span-3 md:col-span-3 sm:col-span-2 bg-background-elevated rounded-3xl p-6 sm:p-10 shadow-sm border border-foreground-primary/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="md:text-sm text-xs font-medium theme-text-primary"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-golden-300 transition ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-200 focus:border-golden-300"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="md:text-sm text-xs font-medium theme-text-primary"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-golden-300 transition ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-200 focus:border-golden-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium theme-text-primary"
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-golden-300 transition"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium theme-text-primary"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-golden-300 transition ${
                errors.subject
                  ? "border-red-500"
                  : "border-gray-200 focus:border-golden-300"
              }`}
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs">{errors.subject}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium theme-text-primary"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-golden-300 transition resize-none ${
              errors.message
                ? "border-red-500"
                : "border-gray-200 focus:border-golden-300"
            }`}
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message}</p>
          )}
        </div>

        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 text-sm">
            Message sent successfully! We will get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
            Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-golden-500 py-3.5 rounded-xl font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
