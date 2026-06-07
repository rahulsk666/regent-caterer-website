"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

interface CardStacksProps {
  i: number;
  title: string;
  description: string;
  range: number[];
  targetScale: number;
  progress: MotionValue<number>;
}

export default function CardStacks({
  i,
  title,
  description,
  range,
  targetScale,
  progress,
}: CardStacksProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="sticky top-0 flex justify-center px-2"
      style={{
        paddingTop: `${i * 20}px`,
      }}
    >
      <motion.div
        style={{
          scale,
          zIndex: 100 - i,
        }}
        className="w-full"
      >
        <div className="rounded-2xl bg-card-background p-4 shadow-lg">
          <p className="font-bold text-xl text-foreground-golden">{title}</p>

          <p className="text-lg">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}
