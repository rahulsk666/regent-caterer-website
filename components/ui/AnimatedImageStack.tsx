"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedImageStackProps {
  images: string[];
}

export default function AnimatedImageStack({
  images,
}: AnimatedImageStackProps) {
  return (
    <div className="lg:py-20 py-10 overflow-x-auto overflow-y-hidden lg:overflow-visible scrollbar-none">
      <div className="flex justify-center md:justify-center w-max lg:w-auto">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            style={{
              rotate: Math.random() * 20 - 10,
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
