import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// ImageResponse can't decode webp, so cards use the jpeg photos under
// public/images/card. The file is inlined as a data URL at render time.
async function photoDataUrl(file: string) {
  const buf = await readFile(path.join(process.cwd(), "public", file));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

export async function renderOgCard({
  photo,
  title,
  subtitle,
}: {
  photo: string;
  title: string;
  subtitle: string;
}) {
  const bg = await photoDataUrl(photo);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#2a210a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#f1d68f",
              letterSpacing: -2,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
