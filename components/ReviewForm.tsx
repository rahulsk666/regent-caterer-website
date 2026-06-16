"use client";

import Button from "./ui/Button";
import { IconPencilFilled } from "@tabler/icons-react";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  UnderlineFileUpload,
  UnderlineInput,
  UnderlineRating,
  UnderlineTextarea,
} from "./ui/Input";
import { createReviewAction } from "@/app/action";
import { toast } from "sonner";

export default function ReviewForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const [state, formAction, isPending] = useActionState(createReviewAction, {
    success: false,
    error: undefined,
    errors: {},
    values: {
      name: "",
      email: "",
      designation: "",
      message: "",
      rating: 0,
    },
  });

  useEffect(() => {
    if (state.success) {
      setIsFormOpen(false);
      setRating(0);
      formRef.current?.reset();
      setResetKey((v) => v + 1);
      toast.success("Review submitted successfully!");
    }

    if (state.error) {
      toast.error("Failed to submit review.");
    }
  }, [state]);

  return (
    <div className="flex h-full w-full items-center justify-center m-10 container-app">
      {!isFormOpen ? (
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="custom"
          className="bg-linear-[108deg] from-golden-200 from-0% to-golden-100 to-100% px-20 gap-2"
        >
          <p className="text-golden-gradient lg:text-3xl md:text-xl text-xl">
            Write a Review
          </p>
          <IconPencilFilled className="lg:w-8 w-6 h-auto text-golden-500" />
        </Button>
      ) : (
        <div className="lg:w-[75%] w-full h-full">
          <p className="text-golden-gradient py-10 text-4xl font-galgin text-center">
            Share Your Experience
          </p>
          <form
            ref={formRef}
            noValidate
            action={formAction}
            className="space-y-6 m-2 px-4 py-6 bg-background-elevated rounded-2xl"
          >
            <div className="grid grid-cols-1 gap-8 h-full mt-10 mb-0">
              {/* Name */}
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-8">
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                    defaultValue={state.values?.name}
                    error={state?.errors?.name?.[0]}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    label="Email"
                    name="email"
                    defaultValue={state.values?.email}
                    error={state.values?.email}
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-8">
                {/* Designation */}
                <div className="space-y-2 w-full">
                  <UnderlineInput
                    name="designation"
                    label="Designation"
                    placeholder="Event Host"
                    required
                    defaultValue={state.values?.designation}
                    error={state?.errors?.designation?.[0]}
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-2 w-full">
                  <UnderlineRating
                    value={rating}
                    onChange={setRating}
                    label="Star Rating"
                    required
                    size={32}
                    error={state?.errors?.rating?.[0]}
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
                  required
                  defaultValue={state.values?.message}
                  error={state?.errors?.message?.[0]}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2 w-full md:w-[50%]">
                <UnderlineFileUpload
                  key={resetKey}
                  accept="image/*"
                  name="file"
                  label="Your Photo"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-10 px-3 my-3 rounded-xl bg-golden-400 text-white font-medium text-sm shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
