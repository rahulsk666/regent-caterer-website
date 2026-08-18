"use client";

import { IconTrash, IconUpload } from "@tabler/icons-react";

import { ActionResult, GalleryType, galleryTypes, SectionVideo } from "@/lib/types";
import { unwrap } from "@/lib/actionResult";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import Toggle from "./Toggle";
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Button from "../ui/CustomButton";
import { Button as ShadCnButton } from "@/components/ui/button";
import { UnderlineFileUpload } from "../ui/Input";

interface AdminSectionVideoProps {
  videos: SectionVideo[];

  onUpdateVideo: (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => Promise<ActionResult>;

  onDeleteVideo: (id: string) => Promise<ActionResult>;

  onUploadVideo: (
    section: SectionVideo["section"],
    file: File,
    galleryType?: GalleryType,
  ) => Promise<ActionResult>;
}

function AdminVideoTile({ video }: { video: SectionVideo }) {
  const videoRef = useAutoplayVideo();

  return (
    <video
      ref={videoRef}
      src={video.url}
      className="pointer-events-none object-cover h-full w-full"
      playsInline
      autoPlay
      muted
      loop
      controls={false}
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      x-webkit-airplay="deny"
      tabIndex={-1}
      data-chromeless-video=""
    />
  );
}

interface MediaGroupProps {
  label: string;
  items: SectionVideo[];
  locked: boolean;
  uploading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitUpload: (file: File) => Promise<void>;
  onToggleApprove: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}

function MediaGroup({
  label,
  items,
  locked,
  uploading,
  isOpen,
  onOpenChange,
  onSubmitUpload,
  onToggleApprove,
  onDelete,
}: MediaGroupProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="md:text-xl text-lg font-semibold">{label}</h3>

        <div className="flex flex-row items-center justify-center gap-2">
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>
              <span className="cursor-pointer inline-flex items-center gap-2 text-xs rounded-full bg-slate-900 text-white px-4 py-2 md:text-sm font-medium">
                <IconUpload size={16} className="" />
                Add Video
              </span>
            </DialogTrigger>
            <DialogContent showCloseButton={!uploading}>
              <DialogHeader>
                <DialogTitle>Upload Video</DialogTitle>
                <DialogDescription>
                  Upload the video you want to add to {label}.
                </DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);
                  const video = formData.get("video") as File;

                  if (!video || video.size === 0) {
                    toast.error("Please select a video");
                    return;
                  }

                  await onSubmitUpload(video);
                }}
              >
                <div className="space-y-2">
                  <UnderlineFileUpload
                    label="Video"
                    accept="video/*"
                    name="video"
                    required
                    disabled={uploading}
                    className="w-full"
                  />
                </div>

                <DialogFooter>
                  <ShadCnButton
                    onClick={() => onOpenChange(false)}
                    type="button"
                    variant="outline"
                    disabled={uploading}
                  >
                    Cancel
                  </ShadCnButton>

                  <ShadCnButton type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </ShadCnButton>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-400">
          No videos uploaded
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((video) => (
            <div
              key={video.id}
              className="rounded-3xl border bg-white p-4 shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <AdminVideoTile video={video} />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                  <span>Approved</span>

                  <Toggle
                    disabled={video.published && locked}
                    value={!!video.published}
                    onChange={(value) => onToggleApprove(video.id, value)}
                  />
                </div>

                <Button
                  variant="custom"
                  disabled={video.published && locked}
                  onClick={() => onDelete(video.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium ${
                    video.published && locked
                      ? "border border-slate-200 bg-slate-100 hover:bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  <IconTrash size={14} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type OptimisticAction =
  | {
      type: "update";
      id: string;
      updates: { featured?: boolean; published?: boolean };
    }
  | { type: "delete"; id: string };

function optimisticVideosReducer(
  state: SectionVideo[],
  action: OptimisticAction,
): SectionVideo[] {
  switch (action.type) {
    case "update":
      return state.map((v) =>
        v.id === action.id ? { ...v, ...action.updates } : v,
      );
    case "delete":
      return state.filter((v) => v.id !== action.id);
  }
}

export default function AdminSectionVideo({
  videos,
  onUpdateVideo,
  onDeleteVideo,
  onUploadVideo,
}: AdminSectionVideoProps) {
  const [optimisticVideos, applyOptimistic] = useOptimistic(
    videos,
    optimisticVideosReducer,
  );
  const [, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [openTarget, setOpenTarget] = useState<string | null>(null);
  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  const handleUpload = async (
    section: SectionVideo["section"],
    file: File,
    galleryType?: GalleryType,
  ) => {
    try {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Video size must be less than 100 MB");
        return;
      }
      setUploading(true);

      const promise = unwrap(
        onUploadVideo(section, file, galleryType),
        "Failed to upload video",
      );

      toast.promise(promise, {
        loading: "Uploading video...",
        success: "Video uploaded successfully",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to upload video",
      });

      await promise;
      setOpenTarget(null);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateVideo = (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => {
    startTransition(async () => {
      applyOptimistic({ type: "update", id, updates });

      const promise = unwrap(onUpdateVideo(id, updates), "Failed to update video");

      toast.promise(promise, {
        loading: "Updating video...",
        success: "Video updated",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to update video",
      });

      await promise.catch(() => {});
    });
  };

  const handleDeleteVideo = (id: string) => {
    startTransition(async () => {
      applyOptimistic({ type: "delete", id });

      const promise = unwrap(onDeleteVideo(id), "Failed to delete video");

      toast.promise(promise, {
        loading: "Deleting video...",
        success: "Video deleted",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to delete video",
      });

      await promise.catch(() => {});
    });
  };

  return (
    <div className="space-y-8">
      {galleryTypes.map((type) => {
        const target = `gallery:${type.key}`;
        const typeVideos = optimisticVideos.filter(
          (video) =>
            video.section === "gallery" &&
            (video.galleryType ?? "none") === type.key,
        );
        const approvedVideos = typeVideos.filter((video) => video.published);

        return (
          <MediaGroup
            key={target}
            label={type.label}
            items={typeVideos}
            locked={approvedVideos.length <= 1}
            uploading={uploading}
            isOpen={openTarget === target}
            onOpenChange={(open) => setOpenTarget(open ? target : null)}
            onSubmitUpload={(file) => handleUpload("gallery", file, type.key)}
            onToggleApprove={(id, value) =>
              handleUpdateVideo(id, { published: value })
            }
            onDelete={handleDeleteVideo}
          />
        );
      })}
    </div>
  );
}
