"use client";

import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "./ImageLightBox";

type Props = {
  images: string[];
  title: string;
};

export default function ClientGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="aspect-3/4 overflow-hidden rounded-xl cursor-zoom-in"
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={src}
              alt=""
              width={100}
              height={100}
              className="w-full h-full object-cover hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <ImageLightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
          title={title}
        />
      )}
    </>
  );
}
