import { ActionResult, Review } from "@/lib/types";
import { StarDisplay } from "../ui/StarRating";
import Toggle from "./Toggle";
import Image from "next/image";
import { IconStar, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";

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

export default function AdminReviewsSection({
  reviews,
  onUpdateReview,
  onDeleteReview,
}: AdminReviewsSectionProps) {
  const handleReviewUpdate = async (
    id: number,
    updates: {
      approved?: boolean;
      highlightedHome?: boolean;
    },
  ) => {
    toast.promise(onUpdateReview(id, updates), {
      loading: "Updating review...",
      success: "Review updated",
      error: "Failed to update review",
    });
  };

  const handleReviewDelete = async (id: number) => {
    toast.promise(onDeleteReview(id), {
      loading: "Deleting review...",
      success: "Review deleted",
      error: "Failed to delete review",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700 font-medium">
            {reviews.filter((r) => !r.approved).length} pending
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 font-medium">
            {reviews.filter((r) => r.approved).length} approved
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {reviews.length === 0 && (
          <p className="text-center py-20 text-slate-400">No reviews yet</p>
        )}
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`rounded-3xl border bg-white p-5 shadow-sm ${!r.approved ? "border-amber-200" : "border-slate-200"}`}
          >
            <div className="flex flex-wrap flex-col md:flex-row gap-4 md:items-stretch items-start md:justify-between">
              <div className="relative md:w-35 md:h-40 h-60 w-full min-h-full">
                {r.image ? (
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 shrink-0">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    {r.email && (
                      <p className="text-xs text-slate-400">{r.email}</p>
                    )}
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
                  <span className="text-slate-600">Approved</span>
                  <Toggle
                    value={!!r.approved}
                    onChange={(v) =>
                      handleReviewUpdate(r.id!, {
                        approved: v,
                        highlightedHome: false,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                  <span className="text-slate-600 flex items-center gap-1">
                    <IconStar className="w-3 h-3" />
                    Home
                  </span>
                  <Toggle
                    value={!!r.highlightedHome}
                    disabled={!r.approved}
                    onChange={(v) =>
                      handleReviewUpdate(r.id!, {
                        highlightedHome: v,
                      })
                    }
                  />
                </div>
                <button
                  onClick={() => handleReviewDelete(r.id!)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  <IconTrash className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
