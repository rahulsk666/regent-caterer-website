"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { horizontalLoop } from "@/hooks/useHorizontalLoop";

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextProps {
  items: string[];
  speed?: number;
  separator?: string; // e.g. "✦" or "·" or ""
  separatorClassname?: string;
  className?: string; // forwarded to each h4
  reverse?: boolean;
}

export default function ScrollingText({
  items,
  speed = 1,
  separator = "✦",
  className = "",
  separatorClassname = "text-golden-500",
  reverse = false,
}: ScrollingTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const els = gsap.utils.toArray<Element>(
      rail.querySelectorAll(".scroll-text"),
    );

    const ctx = gsap.context(() => {
      const tl = horizontalLoop(els, { repeat: -1, speed, reversed: reverse });
      gsap.set(tl, { timeScale: reverse ? -1 : 1 });
      let speedTween: gsap.core.Timeline | null = null;

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        markers: process.env.NODE_ENV === "development",
        onUpdate: (self) => {
          if (speedTween) {
            speedTween.kill();
          }
          const dir = reverse ? -self.direction : self.direction;

          speedTween = gsap
            .timeline()
            .to(tl, { timeScale: 3 * dir, duration: 0.25 })
            .to(tl, { timeScale: 1 * dir, duration: 1.5 }, "+=0.5");
        },
      });
    }, section);

    return () => ctx.revert();
  }, [items, speed, reverse]); // re-run if items or speed change

  // Duplicate so the loop always has enough width to fill the screen
  const doubled = [...items, ...items];

  return (
    <div ref={sectionRef} className="overflow-hidden py-4">
      <div ref={railRef} className="flex gap-10 whitespace-nowrap w-max">
        {doubled.map((text, i) => (
          <div
            key={i}
            className="scroll-text gap-10 flex flex-row items-center"
          >
            <p className={`text-3xl tracking-widest ${className}`}>{text}</p>
            {separator && (
              <span className={`md:mx-6 mx-4 text-4xl ${separatorClassname}`}>
                {separator}
              </span>
            )}
          </div>
        ))}
        x
      </div>
    </div>
  );
}
