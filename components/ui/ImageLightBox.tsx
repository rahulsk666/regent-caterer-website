"use client";

import { useEffect } from "react";

type Props = {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function ImageLightbox({
  images,
  index,
  title,
  onClose,
  onChange,
}: Props) {
  const src = images[index];
  const total = images.length;

  // Preload next & previous
  useEffect(() => {
    new Image().src = images[(index + 1) % total];
    new Image().src = images[(index - 1 + total) % total];
  }, [index, images, total]);

  // Keyboard + scroll lock
  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, total, onClose, onChange]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      {/* LEFT CLICK ZONE */}
      <div
        className="absolute left-0 top-0 h-full w-1/2 cursor-w-resize"
        onClick={() => onChange((index - 1 + total) % total)}
      />

      {/* RIGHT CLICK ZONE */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 cursor-e-resize"
        onClick={() => onChange((index + 1) % total)}
      />

      {/* LEFT ARROW */}
      <button
        onClick={() => onChange((index - 1 + total) % total)}
        className="
          fixed left-6 top-1/2 -translate-y-1/2
          z-[110]
          w-12 h-12
          rounded-full
          bg-white/80 text-black
          flex items-center justify-center
          text-2xl
          hover:bg-white
          transition
        "
        aria-label="Previous image"
      >
        ←
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => onChange((index + 1) % total)}
        className="
          fixed right-6 top-1/2 -translate-y-1/2
          z-[110]
          w-12 h-12
          rounded-full
          bg-white/80 text-black
          flex items-center justify-center
          text-2xl
          hover:bg-white
          transition
        "
        aria-label="Next image"
      >
        →
      </button>

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="
          fixed top-6 right-6 z-[110]
          w-10 h-10 rounded-full
          bg-white text-black
          flex items-center justify-center text-xl
        "
        aria-label="Close"
      >
        ✕
      </button>

      {/* IMAGE */}
      <div className="relative z-[105]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={`${title} ${index + 1}`}
          className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
        />
      </div>

      {/* COUNTER */}
      <div className="fixed bottom-6 z-[110] text-white text-sm tracking-wide">
        {index + 1} / {total}
      </div>
    </div>
  );
}
