"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { Ref } from "react";

export default function ImageColumn({
  images,
  ref,
  y,
  className,
}: {
  images: { src: string }[];
  ref: Ref<HTMLDivElement>;
  y?: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex flex-col gap-[3vw] md:gap-[2vw] will-change-transform 
        flex-1 min-w-0 w-1/2 md:w-1/3 lg:w-1/4 h-full relative 
        nth-of-type-[1]:top-[-45%] nth-of-type-[2]:top-[-45%] nth-of-type-[3]:top-[-45%] nth-of-type-[4]:top-[-70%]
        md:nth-of-type-[1]:top-[-45%] md:nth-of-type-[2]:top-[-95%] md:nth-of-type-[3]:top-[-45%] md:nth-of-type-[4]:top-[-80%]
        ${className}`}
      ref={ref}
      style={{ y }}
    >
      {images.map((image, i) => (
        <div
          key={i}
          className="relative w-full aspect-3/4 overflow-hidden rounded-2xl shrink-0"
        >
          <Image
            src={image.src}
            fill
            alt={"image" + i}
            sizes="(max-width: 679px) 48vw,20vw"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}
