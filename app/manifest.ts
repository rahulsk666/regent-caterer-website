import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | Catering Services in Thrissur, Kerala`,
    short_name: SITE_NAME,
    description:
      "Wedding and event catering in Thrissur, Kerala, with multi-cuisine menus, live counters and trained service staff.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#e7ba44",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
