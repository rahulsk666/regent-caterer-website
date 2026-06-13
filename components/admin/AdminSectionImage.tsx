"use client";

import Image from "next/image";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { SectionImage } from "@/lib/types";
import Toggle from "./Toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { toast } from "sonner";

interface AdminSectionImagesProps {
  images: SectionImage[];

  onUpdateImage: (
    id: string,
    updates: {
      featured?: boolean;
      published?: boolean;
    },
  ) => Promise<void>;

  onDeleteImage: (id: string) => Promise<void>;

  onUploadImage: (
    section: SectionImage["section"],
    file: File,
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;
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
  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionImages = images.filter(
          (img) => img.section === section.key,
        );

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
                      if (file.size > MAX_FILE_SIZE) {
                        toast.error("Image size must be less than 10 MB");
                        e.target.value = "";
                        return;
                      }
                      try {
                        setUploading(section.key);
                        const result = await onUploadImage(section.key, file);
                        if (!result.success) {
                          toast.error(result.error || "Upload failed");
                          return;
                        }
                        toast.success("Image uploaded");
                        router.refresh();
                      } catch (error) {
                        console.error(error);
                        toast.error("Upload failed");
                      } finally {
                        setUploading(null);
                      }
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
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                        <span>Approved</span>

                        <Toggle
                          value={!!image.published}
                          onChange={(value) =>
                            onUpdateImage(image.id, {
                              published: value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs">
                        <span>Home</span>

                        <Toggle
                          value={!!image.featured}
                          disabled={!image.published}
                          onChange={(value) =>
                            onUpdateImage(image.id, {
                              featured: value,
                            })
                          }
                        />
                      </div>

                      <button
                        onClick={() => onDeleteImage(image.id)}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        <IconTrash size={14} />
                        Delete
                      </button>
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
