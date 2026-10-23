import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt =
  "Regent Caterers - Wedding & Event Catering in Thrissur, Kerala";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgCard({
    photo: "images/card/delicious_cuisine.jpeg",
    title: "Regent Caterers",
    subtitle: "Wedding & Event Catering · Thrissur, Kerala",
  });
}
