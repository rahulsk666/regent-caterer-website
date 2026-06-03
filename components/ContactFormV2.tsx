import React from "react";
import { UnderlineInput, UnderlineSelect, UnderlineTextarea } from "./ui/Input";

export default function ContactFormV2() {
  return (
    <form className="space-y-6 m-2 p-4 bg-background-elevated rounded-2xl">
      <div className="grid grid-cols-1 gap-10 h-full">
        {/* Full Name */}
        <div className="space-y-2 w-full">
          <UnderlineInput label="Full Name" placeholder="John Doe" required />
          {/* {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>} */}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Email Address */}
          <div className="space-y-2 w-full">
            <UnderlineInput
              label="Email"
              placeholder="email@example.com"
              //   required
              type="email"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2 w-full">
            <UnderlineInput
              label="Phone"
              placeholder="+91 1322123"
              required
              type="tel"
            />
          </div>
        </div>

        {/* Services */}
        <div className="space-y-2 w-full">
          <UnderlineSelect
            label="Services"
            placeholder="Services"
            required
            options={[
              { value: "Birthday", label: "Birthday" },
              { value: "Corporate", label: "Corporate" },
              { value: "Wedding", label: "Wedding" },
              { value: "Other", label: "Other" },
            ]}
          />
        </div>

        {/* Message */}
        <div className="space-y-2 w-full">
          <UnderlineTextarea
            label="Message"
            placeholder="Type your message here..."
            required
            rows={5}
          />
        </div>
      </div>
    </form>
  );
}
