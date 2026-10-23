"use client";

import Image from "next/image";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import {
  ActionResult,
  GalleryType,
  galleryTypes,
  MIN_PROTECTED_SECTION_IMAGES,
  protectedSections,
  SectionImage,
  sectionKeys,
} from "@/lib/types";
import { unwrap } from "@/lib/actionResult";
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

interface AdminSectionImagesProps {
  images: SectionImage[];

  onUpdateImage: (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => Promise<ActionResult>;

  onDeleteImage: (id: string) => Promise<ActionResult>;

  onUploadImage: (
    section: SectionImage["section"],
    file: File,
    galleryType: GalleryType,
  ) => Promise<ActionResult>;
}

interface MediaGroupProps {
  label: string;
  items: SectionImage[];
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
        <h3 className="text-xl font-semibold">{label}</h3>

        <div className="flex flex-row items-center justify-center gap-2">
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>
              <span className="cursor-pointer inline-flex items-center gap-2 text-xs rounded-full bg-slate-900 text-white px-4 py-2 md:text-sm font-medium">
                <IconUpload size={16} className="" />
                Add Image
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogDescription>
                  Upload the image you want to add to {label}.
                </DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);
                  const image = formData.get("image") as File;

                  if (!image || image.size === 0) {
                    toast.error("Please select an image");
                    return;
                  }

                  await onSubmitUpload(image);
                }}
              >
                <div className="space-y-2">
                  <UnderlineFileUpload
                    label="Image"
                    accept="image/*"
                    name="image"
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
          No images uploaded
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((image) => (
            <div
              key={image.id}
              className="rounded-3xl border bg-white p-4 shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src={image.url}
                  alt="images"
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                  <span>Approved</span>

                  <Toggle
                    disabled={image.published && locked}
                    value={!!image.published}
                    onChange={(value) => onToggleApprove(image.id, value)}
                  />
                </div>

                <Button
                  variant="custom"
                  disabled={image.published && locked}
                  onClick={() => onDelete(image.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium ${
                    image.published && locked
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

function optimisticImagesReducer(
  state: SectionImage[],
  action: OptimisticAction,
): SectionImage[] {
  switch (action.type) {
    case "update":
      return state.map((img) =>
        img.id === action.id ? { ...img, ...action.updates } : img,
      );
    case "delete":
      return state.filter((img) => img.id !== action.id);
  }
}

export default function AdminSectionImages({
  images,
  onUpdateImage,
  onDeleteImage,
  onUploadImage,
}: AdminSectionImagesProps) {
  const [optimisticImages, applyOptimistic] = useOptimistic(
    images,
    optimisticImagesReducer,
  );
  const [, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [openTarget, setOpenTarget] = useState<string | null>(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleUpload = async (
    section: SectionImage["section"],
    file: File,
    galleryType: GalleryType,
  ) => {
    try {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size must be less than 10 MB");
        return;
      }
      setUploading(true);

      const promise = unwrap(
        onUploadImage(section, file, galleryType),
        "Failed to upload image",
      );

      toast.promise(promise, {
        loading: "Uploading image...",
        success: "Image uploaded successfully",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to upload image",
      });

      await promise;
      setOpenTarget(null);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateImage = (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => {
    startTransition(async () => {
      applyOptimistic({ type: "update", id, updates });

      const promise = unwrap(onUpdateImage(id, updates), "Failed to update image");

      toast.promise(promise, {
        loading: "Updating image...",
        success: "Image updated",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to update image",
      });

      await promise.catch(() => {});
    });
  };

  const handleDeleteImage = (id: string) => {
    startTransition(async () => {
      applyOptimistic({ type: "delete", id });

      const promise = unwrap(onDeleteImage(id), "Failed to delete image");

      toast.promise(promise, {
        loading: "Deleting image...",
        success: "Image deleted",
        error: (e: unknown) =>
          e instanceof Error ? e.message : "Failed to delete image",
      });

      await promise.catch(() => {});
    });
  };

  return (
    <div className="space-y-10">
      {sectionKeys.map((section) => {
        if (section.key !== "gallery") {
          const sectionImages = optimisticImages.filter(
            (img) => img.section === section.key,
          );
          const approvedImages = sectionImages.filter((img) => img.published);
          const locked =
            protectedSections.includes(section.key) &&
            approvedImages.length <= MIN_PROTECTED_SECTION_IMAGES;

          return (
            <MediaGroup
              key={section.key}
              label={section.label}
              items={sectionImages}
              locked={locked}
              uploading={uploading}
              isOpen={openTarget === section.key}
              onOpenChange={(open) =>
                setOpenTarget(open ? section.key : null)
              }
              onSubmitUpload={(file) =>
                handleUpload(section.key, file, "none")
              }
              onToggleApprove={(id, value) =>
                handleUpdateImage(id, { published: value })
              }
              onDelete={handleDeleteImage}
            />
          );
        }

        return (
          <div key="gallery" className="space-y-6">
            <h2 className="text-2xl font-bold">Gallery</h2>
            <div className="space-y-8 pl-0 md:pl-6 md:border-l md:border-border">
              {galleryTypes.map((type) => {
                const target = `gallery:${type.key}`;
                const typeImages = optimisticImages.filter(
                  (img) =>
                    img.section === "gallery" &&
                    (img.galleryType ?? "none") === type.key,
                );

                return (
                  <MediaGroup
                    key={target}
                    label={type.label}
                    items={typeImages}
                    locked={false}
                    uploading={uploading}
                    isOpen={openTarget === target}
                    onOpenChange={(open) =>
                      setOpenTarget(open ? target : null)
                    }
                    onSubmitUpload={(file) =>
                      handleUpload("gallery", file, type.key)
                    }
                    onToggleApprove={(id, value) =>
                      handleUpdateImage(id, { published: value })
                    }
                    onDelete={handleDeleteImage}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
