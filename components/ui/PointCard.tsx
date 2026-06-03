"use client";

import { PointCardProps } from "@/lib/types";
import { motion } from "framer-motion";

export default function PointCard({
  point,
  index,
  activeIndex,
  total,
}: PointCardProps) {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  return (
    <motion.div
      className="absolute w-full px-0"
      animate={{
        y: isActive ? 0 : isPast ? -50 : 50,
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.97,
        // filter: isActive ? "blur(0px)" : "blur(3px)",
      }}
      transition={{
        duration: 0.55,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {/* Counter */}
      <p className="text-xs sm:text-sm font-medium text-neutral-400 mb-3 md:mb-4 tracking-widest uppercase">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {/* Title */}
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-galgin font-medium text-golden-500 mb-4 md:mb-6 leading-tight">
        {point.title}
      </h3>

      {/* Animated divider */}
      <motion.div
        className="h-px bg-golden-500 mb-4 md:mb-6"
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
      />

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-md">
        {point.description}
      </p>
    </motion.div>
  );
}
