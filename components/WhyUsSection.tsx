"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";
import PointCard from "./ui/PointCard";
import { points } from "@/lib/data";

export default function WhyUsSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * points.length),
      points.length - 1,
    );
    setActiveIndex(index);
  });

  // const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  // const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

  return (
    <div
      ref={container}
      style={{ height: `${points.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden container-app flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center">
        {/* ── Heading: full width on mobile, left col on desktop ── */}
        <motion.div
          style={
            {
              // scale: headingScale,
              // opacity: headingOpacity,
            }
          }
          className="origin-left pt-12 pb-4  mt-60 md:mt-0 md:py-0 flex flex-col gap-3 md:gap-6"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-9xl leading-none font-galgin font-medium text-golden-500">
            Why Us?
          </h2>
        </motion.div>

        {/* Progress dots */}
        {/* <div className="flex flex-col gap-2 mt-1 md:mt-4">
          {points.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: 8,
                height: i === activeIndex ? 28 : 8,
                backgroundColor:
                  i === activeIndex
                    ? "var(--color-golden-500)"
                    : "var(--color-neutral-300)",
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-2 rounded-full"
            />
          ))}
        </div> */}

        <div className="relative flex-1 md:h-full flex md:items-center">
          {points.map((point, i) => (
            <PointCard
              key={i}
              point={point}
              index={i}
              activeIndex={activeIndex}
              total={points.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
