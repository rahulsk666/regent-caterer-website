// lib/file-storage.ts

import fs from "fs/promises";
import path from "path";

export async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${crypto.randomUUID()}-${file.name}`;

  const dir = path.join(process.cwd(), "public", "uploads", folder);

  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

export async function deleteFile(relativePath?: string): Promise<void> {
  if (!relativePath) return;

  try {
    await fs.unlink(
      path.join(process.cwd(), "public", relativePath.replace(/^\//, "")),
    );
  } catch {
    // ignore
  }
}
