import { cloudinary } from "./cloudinary";

export async function saveFile(file: File, folder: string): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `regent-caterers/${folder}`,
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Failed to save file to Cloudinary:", error);
    throw error;
  }
}

export async function deleteFile(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const parts = imageUrl.split("/upload/")[1];

    if (!parts) return;

    const publicId = parts.replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.error("Failed to delete Cloudinary image:", error);
  }
}
