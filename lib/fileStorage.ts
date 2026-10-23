import { ResourceType } from "cloudinary";
import { cloudinary } from "./cloudinary";
import { MediaType } from "./types";

export async function saveFile({
  file,
  folder,
  mediaType = "image",
}: {
  file: File;
  folder: string;
  mediaType?: MediaType;
}): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `regent-caterers/${folder}`,
      resource_type: mediaType || "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Failed to save file to Cloudinary:", error);
    throw error;
  }
}

export async function deleteFile({
  url,
  type = "image",
}: {
  url?: string;
  type?: ResourceType;
}): Promise<void> {
  if (!url) return;

  try {
    const parts = url.split("/upload/")[1];

    if (!parts) return;

    const publicId = parts
      .split("/")
      .filter((segment) => !segment.startsWith("v"))
      .join("/")
      .replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });
  } catch (error) {
    console.error("Failed to delete Cloudinary image:", error);
  }
}
