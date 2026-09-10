"use client";

import { useOptimistic, useTransition } from "react";
import { ActionResult, Review } from "@/lib/types";
import { unwrap } from "@/lib/actionResult";
import { StarDisplay } from "../ui/StarRating";
import Toggle from "./Toggle";
import Image from "next/image";
import { IconStar, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import Button from "../ui/CustomButton";

interface AdminReviewsSectionProps {
  reviews: Review[];

  onUpdateReview: (
    id: number,
    updates: {
      approved?: boolean;
      highlightedHome?: boolean;
    },
  ) => Promise<ActionResult>;

  onDeleteReview: (id: number) => Promise<ActionResult>;
}

type ReviewUpdates = { approved?: boolean; highlightedHome?: boolean };

type OptimisticAction =
  | { type: "update"; id: number; updates: ReviewUpdates }
  | { type: "delete"; id: number };

function optimisticReviewsReducer(
  state: Review[],
  action: OptimisticAction,
): Review[] {
  switch (action.type) {
    case "update":
      return state.map((r) =>
        r.id === action.id ? { ...r, ...action.updates } : r,
      );
    case "delete":
      return state.filter((r) => r.id !== action.id);
  }
}

export default function AdminReviewsSection({
  reviews,
  onUpdateReview,
  onDeleteReview,
}: AdminReviewsSectionProps) {
  const [optimisticReviews, applyOptimistic] = useOptimistic(
    reviews,
    optimisticReviewsReducer,
  );
  const [, startTransition] = useTransition();

  const handleReviewUpdate = (id: number, updates: ReviewUpdates) => {
    startTransition(async () => {
      // Must be inside the transition — React discards optimistic updates
      // made outside one.
      applyOptimistic({ type: "update", id, updates });

      const promise = unwrap(
        onUpdateReview(id, updates),
        "Failed to update review",
      );

      toast.promise(promise, {
        loading: "Updating review...",
        success: "Review updated",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to update review",
      });

      // Keep the transition (and the optimistic value) alive until the
      // action and its RSC payload settle. sonner already handles the
      // rejection above, so swallow it here to avoid tripping an error
      // boundary.
      await promise.catch(() => {});
    });
  };

  const handleReviewDelete = (id: number) => {
    startTransition(async () => {
      applyOptimistic({ type: "delete", id });

      const promise = unwrap(onDeleteReview(id), "Failed to delete review");

      toast.promise(promise, {
        loading: "Deleting review...",
        success: "Review deleted",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to delete review",
      });

      await promise.catch(() => {});
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700 font-medium">
            {optimisticReviews.filter((r) => !r.approved).length} pending
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 font-medium">
            {optimisticReviews.filter((r) => r.approved).length} approved
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {optimisticReviews.length === 0 && (
          <p className="text-center py-20 text-slate-400">No reviews yet</p>
        )}
        {(() => {
          const approvedCount = optimisticReviews.filter(
            (r) => r.approved,
          ).length;
          const highlightedCount = optimisticReviews.filter(
            (r) => r.highlightedHome,
          ).length;

          return optimisticReviews.map((r) => {
            const isLastApproved = !!r.approved && approvedCount <= 1;
            const isLastHighlighted =
              !!r.highlightedHome && highlightedCount <= 1;

            return (
              <ReviewRow
                key={r.id}
                review={r}
                isLastApproved={isLastApproved}
                isLastHighlighted={isLastHighlighted}
                deleteDisabled={optimisticReviews.length <= 1}
                onUpdate={handleReviewUpdate}
                onDelete={handleReviewDelete}
              />
            );
          });
        })()}
      </div>
    </div>
  );
}

function ReviewRow({
  review: r,
  isLastApproved,
  isLastHighlighted,
  deleteDisabled,
  onUpdate,
  onDelete,
}: {
  review: Review;
  isLastApproved: boolean;
  isLastHighlighted: boolean;
  deleteDisabled: boolean;
  onUpdate: (id: number, updates: ReviewUpdates) => void;
  onDelete: (id: number) => void;
}) {
  const deleteBlocked = deleteDisabled || isLastApproved || isLastHighlighted;

  return (
    <div
      className={`rounded-3xl border bg-white p-5 shadow-sm ${!r.approved ? "border-amber-200" : "border-slate-200"}`}
    >
      <div className="flex flex-wrap flex-col md:flex-row gap-4 md:items-stretch items-start md:justify-between">
        <div className="relative md:w-35 md:h-40 h-60 w-full min-h-full">
          <Image
            src={r.image || "/images/default-placeholder.jpg"}
            alt={r.name}
            fill
            sizes="(min-width: 768px) 140px, 100vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <div>
              <p className="font-semibold text-sm">{r.name}</p>
              {r.email && <p className="text-xs text-slate-400">{r.email}</p>}
            </div>
            <StarDisplay rating={r.rating} size={12} />
            {!r.approved && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Pending
              </span>
            )}
          </div>
          {r.designation && (
            <p className="text-xs text-slate-400">{r.designation}</p>
          )}
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            {r.review}
          </p>
          {r.createdAt && (
            <p className="text-xs text-slate-400 mt-2">
              {new Date(r.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
            <span className="text-slate-600">
              Approved
              {isLastApproved && (
                <span className="block text-[10px] text-slate-400">
                  Last approved review
                </span>
              )}
            </span>
            <Toggle
              value={!!r.approved}
              disabled={isLastApproved}
              onChange={(v) =>
                onUpdate(r.id!, {
                  approved: v,
                  highlightedHome: false,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
            <span className="text-slate-600">
              <span className="flex items-center gap-1">
                <IconStar className="w-3 h-3" />
                Home
              </span>
              {isLastHighlighted && (
                <span className="block text-[10px] text-slate-400">
                  Last home review
                </span>
              )}
            </span>
            <Toggle
              value={!!r.highlightedHome}
              disabled={!r.approved || isLastHighlighted}
              onChange={(v) =>
                onUpdate(r.id!, {
                  highlightedHome: v,
                })
              }
            />
          </div>
          <Button
            variant="custom"
            disabled={deleteBlocked}
            onClick={() => onDelete(r.id!)}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium ${
              !deleteBlocked
                ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                : "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <IconTrash className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
