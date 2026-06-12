"use client";

import Link from "next/link";
import Button from "./ui/Button";
import { IconPencilFilled } from "@tabler/icons-react";
import { useActionState, useRef, useState } from "react";
import {
  UnderlineFileUpload,
  UnderlineInput,
  UnderlineRating,
  UnderlineTextarea,
} from "./ui/Input";
import { createReviewAction } from "@/app/action";

export default function ReviewForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const [state, formAction, isPending] = useActionState(createReviewAction, {
    success: false,
  });
  return (
    <div className="flex h-full w-full items-center justify-center m-10 container-app">
      {!isFormOpen ? (
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="custom"
          className="bg-linear-[108deg] from-golden-200 from-0% to-golden-100 to-100% px-20"
        >
          <Link
            className="flex flex-row justify-center items-center gap-2"
            href={"/"}
          >
            <p className="text-golden-gradient lg:text-3xl md:text-xl text-xl">
              Write a Review
            </p>
            <IconPencilFilled className="lg:w-8 w-6 h-auto text-golden-500" />
          </Link>
        </Button>
      ) : (
        <div className="lg:w-[75%] w-full h-full">
          <p className="text-golden-gradient py-10 text-4xl font-galgin text-center">
            Share Your Experience
          </p>
          <form
            ref={formRef}
            noValidate
            action={async (formData) => {
              await formAction(formData);
              formRef.current?.reset();
              setRating(0);
              setResetKey((v) => v + 1);
            }}
            className="space-y-6 m-2 px-4 py-6 bg-background-elevated rounded-2xl"
          >
            <div className="grid grid-cols-1 gap-8 h-full mt-10 mb-0">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    label="Email"
                    name="email"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Designation */}
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    name="designation"
                    label="Designation"
                    placeholder="Event Host"
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-2 w-full">
                  <UnderlineRating
                    value={rating}
                    onChange={setRating}
                    label="Star Rating"
                  />
                  <input type="hidden" name="rating" value={rating} />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 w-full">
                <UnderlineTextarea
                  label="Message"
                  name="message"
                  placeholder="Type your message here..."
                  rows={6}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2 w-full">
                <UnderlineFileUpload
                  key={resetKey}
                  name="file"
                  label="Upload Images"
                />
              </div>
            </div>

            {state.error && (
              <p className="pt-5 text-sm text-red-500">{state.error}</p>
            )}

            {state.success && (
              <p className="pt-5 text-sm text-green-500">
                Review submitted successfully!
              </p>
            )}
            <button
              type="submit"
              className="w-full h-10 m-5 rounded-xl bg-golden-400 text-white font-medium text-sm shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
