"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface ParallaxCardProps {
  i: number;
  title: string;
  description: string;
  link: string;
  src: string;
  color: string;
  range: Array<number>;
  targetScale: number;
  progress: MotionValue<number>;
}

export default function ParallaxCard({
  i,
  title,
  description,
  link,
  src,
  color,
  range,
  targetScale,
  progress,
}: ParallaxCardProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex justify-center items-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-10% + ${i * 25}px)`,
        }}
        className="w-5xl h-[500px] rounded-2xl relative top-[-10%] items-center flex flex-col p-2"
      >
        <h1 className="text-5xl font-galgin font-medium p-2 mt-2">{title}</h1>
        <div className="grid grid-cols-3 h-full gap-4 m-2 p-4">
          <div className="col-span-2">
            <p className="text-lg">{description}</p>
            <Link href={link}>
              <span className="flex flex-row gap-1 items-center cursor-pointer">
                <span className="text-sm">See More</span>

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="black"
                  />
                </svg>
              </span>
            </Link>
          </div>
          <div className="relative col-span-1 w-full h-full overflow-hidden rounded-lg">
            <motion.div
              style={{ scale: imageScale }}
              className="relative w-[80%] h-full"
            >
              <Image
                src={`/images/${src}`}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
