"use client";

import { useEffect, useRef } from "react";
import ImageColumn from "./ImageColumn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useDimension } from "@/hooks/useDimension";

gsap.registerPlugin(ScrollTrigger);

const images1 = [
  { src: "/images/1.JPG" },
  { src: "/images/2.JPG" },
  { src: "/images/3.JPG" },
  { src: "/images/4.JPG" },
];
const images2 = [
  { src: "/images/5.JPG" },
  { src: "/images/6.JPG" },
  { src: "/images/7.jpeg" },
  { src: "/images/8.jpeg" },
];
const images3 = [
  { src: "/images/9.jpeg" },
  { src: "/images/10.jpeg" },
  { src: "/images/1.JPG" },
  { src: "/images/2.JPG" },
];

export default function ImageScrollParallax() {
  const { width, height } = useDimension();
  const galleryRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const isMobile = width < 680;
  const isMd = width < 1120;

  // const colWidth = isMobile ? width * 0.48 : width * 0.24;
  // const imageHeight = colWidth * (4 / 3); // aspect-[3/4]
  // const gap = isMobile ? width * 0.03 : width * 0.02;
  // const colTotal = imageHeight * 4 + gap * 3; // total column content height
  // const galleryHeight = isMobile ? height * 0.8 : height * 1.75;
  // const maxTravel = colTotal - galleryHeight;

  // const y1 = useTransform(scrollYProgress, [0, 1], [0, maxTravel * 0.5]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, maxTravel * 0.9]);
  // const y3 = useTransform(scrollYProgress, [0, 1], [0, maxTravel * 0.4]);
  // const y4 = useTransform(scrollYProgress, [0, 1], [0, maxTravel * 0.75]);

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 0.4 : isMd ? 0.5 : 1)],
  );

  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 0.5 : isMd ? 0.8 : 2.3)],
  );

  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 0.37 : isMd ? 1.2 : 1.25)],
  );

  const y4 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 0.7 : isMd ? 0.7 : 2)],
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // 3. Sync Lenis with GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Add Lenis to GSAP's requestAnimationFrame (ticker)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 5. Turn off GSAP's lag smoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <div className="mx-2">
      <div className="h-[40vh] md:h-[50vh]" />
      <div
        ref={galleryRef}
        className="relative h-[50vh] md:h-[175vh] flex flex-row gap-[2vw] md:gap-[2vw] p-[1vw] md:p-[2vw] overflow-hidden"
      >
        <ImageColumn ref={col1Ref} images={images1} y={y1} />
        <ImageColumn ref={col2Ref} images={images2} y={y2} />
        <ImageColumn ref={col3Ref} images={images3} y={y3} />
        <ImageColumn ref={col4Ref} images={images1} y={y4} />
      </div>
      <div className="h-[40vh] md:h-[50vh]" />
    </div>
  );
}
