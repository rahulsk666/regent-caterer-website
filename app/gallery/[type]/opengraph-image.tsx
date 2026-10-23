import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";
import { galleryTypes } from "@/lib/types";

export const alt = "Regent Caterers catering gallery, Thrissur, Kerala";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const PHOTOS: Record<string, string> = {
  "delicious-cuisine": "delicious_cuisine",
  "luscious-desserts": "luscious_desserts",
  "healthy-salad-counters": "healthy_salad_counters",
  "elegant-food-counters": "elegant_food_counters",
  "premium-cutleries": "premium_cutleries",
};

export default async function GalleryOpengraphImage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const label =
    galleryTypes.find((item) => item.key === type && item.key !== "none")
      ?.label ?? "Catering Gallery";
  const file = PHOTOS[type] ?? "delicious_cuisine";

  return renderOgCard({
    photo: `images/card/${file}.jpeg`,
    title: label,
    subtitle: "Regent Caterers · Thrissur, Kerala",
  });
}
