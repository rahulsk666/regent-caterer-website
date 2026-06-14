"use client";

import Image from "next/image";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { ActionResult, SectionImage } from "@/lib/types";
import Toggle from "./Toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { toast } from "sonner";
import Button from "../ui/Button";

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
  ) => Promise<ActionResult>;
}

const sections: {
  key: SectionImage["section"];
  label: string;
}[] = [
  {
    key: "delightful-moments",
    label: "Delightful Moments",
  },
  {
    key: "signature-collections",
    label: "Signature Collections",
  },
  {
    key: "gallery",
    label: "Gallery",
  },
];

export default function AdminSectionImages({
  images,
  onUpdateImage,
  onDeleteImage,
  onUploadImage,
}: AdminSectionImagesProps) {
  const router = useRouter();

  const [uploading, setUploading] = useState<SectionImage["section"] | null>(
    null,
  );
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const handleUpload = async (section: SectionImage["section"], file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 10 MB");
      return;
    }

    setUploading(section);

    try {
      toast.promise(onUploadImage(section, file), {
        loading: "Uploading image...",
        success: (result) => {
          if (!result.success) {
            throw new Error(result.error);
          }
          return "Image uploaded successfully";
        },
        error: (error) =>
          error instanceof Error ? error.message : "Failed to upload image",
      });
    } finally {
      setUploading(null);
      router.refresh();
    }
  };

  const handleUpdateImage = async (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => {
    const promise = onUpdateImage(id, updates);

    toast.promise(promise, {
      loading: "Updating image...",
      success: (result) => {
        if (!result.success) {
          throw new Error(result.error);
        }

        return "Image updated";
      },
      error: (err) =>
        err instanceof Error ? err.message : "Failed to update image",
    });

    const result = await promise;

    if (result.success) {
      router.refresh();
    }
  };

  const handleDeleteImage = async (id: string) => {
    await toast.promise(onDeleteImage(id), {
      loading: "Deleting image...",
      success: "Image deleted",
      error: "Failed to delete image",
    });
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionImages = images.filter(
          (img) => img.section === section.key,
        );
        const canDelete = sectionImages.length > 5;
        // const isProtectedSection =
        //   section.key === "delightful-moments" ||
        //   section.key === "signature-collections";

        // const featuredCount = sectionImages.filter(
        //   (img) => img.featured,
        // ).length;
        // const canFeature = !isProtectedSection || featuredCount >= 5;

        return (
          <div key={section.key}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{section.label}</h2>

              <div className="flex flex-row items-center justify-center gap-2">
                <div className={uploading === section.key ? "block" : "hidden"}>
                  <Spinner size={24} />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      await handleUpload(section.key, file);

                      e.target.value = "";
                    }}
                  />

                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-medium">
                    <IconUpload size={16} />
                    {/* {uploading === section.key ? "Uploading..." : "Add Image"} */}
                    Add Image
                  </span>
                </label>
              </div>
            </div>

            {sectionImages.length === 0 ? (
              <div className="rounded-3xl border bg-white p-10 text-center text-slate-400">
                No images uploaded
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sectionImages.map((image) => (
                  <div
                    key={image.id}
                    className="rounded-3xl border bg-white p-4 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={image.image}
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
                          disabled={sectionImages.length <= 5}
                          value={!!image.published}
                          onChange={(value) =>
                            handleUpdateImage(image.id, {
                              published: value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                        <span>Home</span>

                        <Toggle
                          value={!!image.featured}
                          disabled={
                            !image.published || sectionImages.length <= 5
                          }
                          onChange={(value) =>
                            handleUpdateImage(image.id, {
                              featured: value,
                            })
                          }
                        />
                      </div>

                      <Button
                        variant="custom"
                        disabled={!canDelete}
                        onClick={() => handleDeleteImage(image.id)}
                        className={`w-full flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium ${
                          canDelete
                            ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            : "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
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
