"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { stackRotation } from "@/lib/utils";

interface AnimatedImageStackProps {
  images: string[];
  centerIndex?: number;
}

export default function AnimatedImageStack({
  images,
  centerIndex,
}: AnimatedImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);

  // Default to the middle image if no centerIndex provided
  const resolvedIndex = centerIndex ?? Math.floor(images.length / 2);

  useEffect(() => {
    const scroll = () => {
      const container = containerRef.current;
      const centerImage = centerImageRef.current;
      if (!container || !centerImage) return;
      if (window.innerWidth >= 1024) return;

      const containerCenter = container.offsetWidth / 2;
      const imageOffsetLeft = centerImage.offsetLeft;
      const imageHalfWidth = centerImage.offsetWidth / 2;

      container.scrollLeft = imageOffsetLeft - containerCenter + imageHalfWidth;
    };

    // Small timeout ensures layout is painted before we read offsets
    const timer = setTimeout(scroll, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="lg:py-20 py-10 overflow-x-auto overflow-y-hidden lg:overflow-visible scrollbar-none"
    >
      <div className="flex justify-center w-max lg:w-auto">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            ref={idx === resolvedIndex ? centerImageRef : null}
            style={{
              rotate: stackRotation(idx),
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="gallery images"
              width={500}
              height={500}
              loading="eager"
              className="rounded-lg h-40 w-40 md:h-50 md:w-50 lg:h-80 lg:w-80 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
