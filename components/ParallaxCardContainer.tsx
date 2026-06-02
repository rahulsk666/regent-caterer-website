"use client";
import { useEffect, useRef } from "react";
import ParallaxCard from "./ui/ParallaxCard";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const projects = [
  {
    title: "Premium Cutlery",
    description:
      "A refined collection of luxury cutlery crafted with precision and elegance. Designed to elevate modern dining experiences with timeless aesthetics and premium-quality finishes.",
    src: "cutlery-1.jpg",
    link: "https://example.com/premium-cutlery",
    color: "#D8C3A5", // Warm champagne beige
  },
  {
    title: "Food Counter",
    description:
      "An inviting live food counter experience featuring freshly prepared dishes, interactive serving stations, and a contemporary culinary presentation tailored for premium events and restaurants.",
    src: "counter-1.jpg",
    link: "https://example.com/food-counter",
    color: "#8E6E53", // Rich walnut brown
  },
  {
    title: "Food",
    description:
      "A curated showcase of gourmet cuisine featuring rich flavors, artistic plating, and high-quality ingredients that bring together taste and visual storytelling.",
    src: "food.jpg",
    link: "https://example.com/food",
    color: "#C75B39", // Deep terracotta
  },
  {
    title: "Desserts",
    description:
      "An indulgent dessert collection blending delicate textures, handcrafted sweets, and premium ingredients to create memorable finishing touches for every dining experience.",
    src: "desert-1.jpg",
    link: "https://example.com/desserts",
    color: "#E0B04B", // Golden caramel
  },
  {
    title: "Salads",
    description:
      "Fresh and vibrant salad creations made with seasonal ingredients, balanced flavors, and elegant presentation for a healthy yet premium culinary experience.",
    src: "salad.jpg",
    link: "https://example.com/salads",
    color: "#5E8B4A", // Fresh olive green
  },
];

export default function ParallaxCardContainer() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // ── Init Lenis ──────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // ── Sync Lenis raf with GSAP ticker ─────────────────────────────────
    // This is critical — without this, ScrollTrigger and Lenis fight each other
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000); // gsap time is in seconds, lenis expects ms
    });

    // Disable gsap's default lagSmoothing so Lenis controls the feel
    gsap.ticker.lagSmoothing(0);

    // ── Tell ScrollTrigger to use Lenis scroll position ─────────────────
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div ref={container} className="h-full">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <ParallaxCard
            key={i}
            i={i}
            {...project}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}
