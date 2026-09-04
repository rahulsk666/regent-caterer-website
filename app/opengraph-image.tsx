import { ImageResponse } from "next/og";

// Generated rather than a static file: every existing public/ image is
// 2-4MB and the wrong aspect ratio for a social share card. This can be
// swapped for a photograph later by replacing this file with a static
// opengraph-image.jpg/png of the same name.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf8ec 0%, #f1d68f 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#5c4a1b",
            letterSpacing: -2,
          }}
        >
          Regent Caterers
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "#8b7029",
          }}
        >
          Wedding &amp; Event Catering · Thrissur, Kerala
        </div>
      </div>
    ),
    { ...size },
  );
}
