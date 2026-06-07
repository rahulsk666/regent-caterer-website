"use client";
import { useEffect, useRef } from "react";
import ParallaxCard from "./ui/CardStack";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { features } from "@/lib/data";
import CardStacks from "./ui/CardStack";

gsap.registerPlugin(ScrollTrigger);

export default function CardStacksContainer() {
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
    <div
      ref={container}
      className="h-full w-full gap-10"
      style={{ height: `${features.length * 80}vh` }}
    >
      {features.map((feature, i) => {
        const targetScale = 1 - (features.length - i) * 0.05;

        return (
          <CardStacks
            key={feature.title}
            i={i}
            title={feature.title}
            description={feature.description}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}
