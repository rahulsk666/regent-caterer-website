"use client";

import { IconTrash, IconUpload } from "@tabler/icons-react";

import {
  ActionResult,
  GalleryType,
  galleryTypes,
  SectionVideo,
} from "@/lib/types";
import Toggle from "./Toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const sections: {
  key: GalleryType;
  label: string;
}[] = [
  {
    key: "none",
    label: "All Gallery",
  },
  {
    key: "events-celebrations",
    label: "Events & Celebrations",
  },
  {
    key: "food-presentation",
    label: "Food Presentation",
  },
  {
    key: "hospitality",
    label: "Hospitality",
  },
  {
    key: "service-excellence",
    label: "Service Excellence",
  },
  {
    key: "ingredients",
    label: "Ingredients",
  },
];

export default function AdminSectionVideo({
  videos,
  onUpdateVideo,
  onDeleteVideo,
  onUploadVideo,
}: AdminSectionVideoProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [openSection, setOpenSection] = useState<GalleryType | null>(null);
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

      toast.promise(onUploadVideo(section, file, galleryType as GalleryType), {
        loading: "Uploading video...",
        success: (result) => {
          if (!result.success) {
            throw new Error(result.error);
          }
          setUploading(false);
          setOpenSection(null);
          router.refresh();
          return "Video uploaded successfully";
        },
        error: (error) => {
          console.error(
            error instanceof Error ? error.message : "Failed to upload video",
          );
          return "Failed to upload video";
        },
      });
    } catch (error) {
      toast.error("Failed to upload video");
      setUploading(false);
      console.error(error);
    }
  };

  const handleUpdateVideo = async (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => {
    try {
      setUpdating(true);
      const promise = onUpdateVideo(id, updates);

      toast.promise(promise, {
        loading: "Updating video...",
        success: (result) => {
          if (!result.success) {
            throw new Error(result.error);
          }
          setUpdating(false);

          return "Video updated";
        },
        error: (err) =>
          err instanceof Error ? err.message : "Failed to update video",
      });

      const result = await promise;

      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update video");
      console.error(error);
      setUpdating(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      setDeleting(true);

      const promise = onDeleteVideo(id);
      await toast.promise(promise, {
        loading: "Deleting video...",
        success: (result) => {
          if (!result.success) {
            throw new Error(result.error);
          }
          setDeleting(false);

          return "Image updated";
        },
        error: (err) =>
          err instanceof Error ? err.message : "Failed to update image",
      });
      const result = await promise;
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete image");
      setDeleting(false);
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionVideos = videos.filter(
          (img) => img.galleryType === section.key,
        );
        const approvedVideos = sectionVideos.filter((img) => img.published);

        return (
          <div key={section.key}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="md:text-2xl text-xl font-bold">{section.label}</h2>

              <div className="flex flex-row items-center justify-center gap-2">
                <Dialog
                  open={openSection === section.key}
                  onOpenChange={(open) =>
                    setOpenSection(open ? section.key : null)
                  }
                >
                  <DialogTrigger>
                    <span className="cursor-pointer inline-flex items-center gap-2 text-xs rounded-full bg-slate-900 text-white px-4 py-2 md:text-sm font-medium">
                      <IconUpload size={16} className="" />
                      Add Video
                    </span>
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={!uploading}
                    // onInteractOutside={(e: MouseEvent) => {
                    //   if (uploading) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    // onKeyDown={(e) => {
                    //   if (uploading) {
                    //     if (e.key === "Escape") {
                    //       e.preventDefault();
                    //     }
                    //   }
                    // }}
                    // onPointerDown={(e) => {
                    //   if (uploading) {
                    //     if (e.target == e.currentTarget) {
                    //       e.preventDefault();
                    //     }
                    //   }
                    // }}
                  >
                    <DialogHeader>
                      <DialogTitle>Upload Video</DialogTitle>
                      <DialogDescription>
                        Upload the video you want to add to the section.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);

                        const galleryType = section.key;

                        const video = formData.get("video") as File;

                        if (!video || video.size === 0) {
                          toast.error("Please select a video");
                          return;
                        }

                        await handleUpload(
                          "gallery",
                          video,
                          galleryType || "none",
                        );
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
                          onClick={() => setOpenSection(null)}
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

            {sectionVideos.length === 0 ? (
              <div className="rounded-3xl border bg-white p-10 text-center text-slate-400">
                No videos uploaded
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sectionVideos.map((video) => (
                  <div
                    key={video.id}
                    className="rounded-3xl border bg-white p-4 shadow-sm"
                  >
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                      <video
                        src={video.url}
                        className="object-cover h-full w-full"
                        playsInline
                        autoPlay
                        muted
                        loop
                      >
                        <source src={video.url} />
                      </video>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                        <span>Gallery Type</span>
                        <span>
                          {
                            galleryTypes.find(
                              (item) => item.key === video.galleryType,
                            )?.label
                          }
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                        <span>Approved</span>

                        <Toggle
                          disabled={
                            updating ||
                            (video.published && approvedVideos.length <= 1)
                          }
                          value={!!video.published}
                          onChange={(value) =>
                            handleUpdateVideo(video.id, {
                              published: value,
                            })
                          }
                        />
                      </div>

                      <Button
                        variant="custom"
                        disabled={
                          deleting ||
                          (video.published && approvedVideos.length <= 1)
                        }
                        onClick={() => handleDeleteVideo(video.id)}
                        className={`w-full flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium ${
                          (video.published && approvedVideos.length <= 1) ||
                          deleting
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
      })}
    </div>
  );
}
