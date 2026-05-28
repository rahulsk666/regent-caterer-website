"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDimension } from "@/hooks/useDimension";

gsap.registerPlugin(ScrollTrigger);

export default function ExpandVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const { height: vh, width: vw } = useDimension();

  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;
    if (!circle || !container) return;

    // ── All values derived from live viewport at call time ──────────
    const getConfig = () => {
      if (vw >= 1120)
        return {
          size: vw * 0.4,
          top: -(vh * 0.25),
          right: vw * 0.1,
          endHeight: vh * 0.8,
          triggerStart: "top 75%",
        };
      if (vw >= 680)
        return {
          size: vw * 0.4,
          top: -(vh * 0.2),
          right: vw * 0.05,
          endHeight: vh * 0.5,
          triggerStart: "top 55%",
        };
      return {
        size: vw * 0.9,
        top: -(vh * 0.12),
        right: -(vw * 0.4),
        endHeight: vh * 0.5,
        triggerStart: "top 70%",
      };
    };

    const mm = gsap.matchMedia();

    const buildAnimation = (query: string) => {
      mm.add(query, () => {
        const { size, top, right, endHeight, triggerStart } = getConfig();
        const vw = window.innerWidth;

        // Set FROM state with live values
        gsap.set(circle, {
          position: "absolute",
          width: size,
          height: size,
          top,
          right,
          left: "auto",
          bottom: "auto",
          borderRadius: "50%",
        });

        gsap.to(circle, {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: vw,
          height: endHeight,
          borderRadius: "0",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: triggerStart,
            end: "+=40%",
            scrub: true,
            markers: process.env.NODE_ENV === "development",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const updatedSize =
                size > vw * self.progress ? size : vw * self.progress;
              gsap.to(circle, {
                width: self.progress > 0.98 ? vw : updatedSize,
                height: self.progress > 0.98 ? endHeight : updatedSize,
                borderRadius: self.progress > 0.98 ? "0" : "50%",
              });
            },
          },
        });

        return () => gsap.set(circle, { clearProps: "all" });
      });
    };

    buildAnimation("(min-width: 1120px)");
    buildAnimation("(min-width: 680px) and (max-width: 1119px)");
    buildAnimation("(max-width: 679px)");

    const handleRefreshInit = () => {
      const { size, top, right } = getConfig();
      gsap.set(circle, { width: size, height: size, top, right });
    };

    // Fires before every ScrollTrigger refresh — recalculates FROM state
    ScrollTrigger.addEventListener("refreshInit", handleRefreshInit);

    return () => {
      mm.revert();
      ScrollTrigger.removeEventListener("refreshInit", handleRefreshInit);
      gsap.set(circle, { clearProps: "all" });
    };
  }, [vh, vw]);

  return (
    <div ref={containerRef} className="relative overflow-x-clip">
      <div
        ref={circleRef}
        className="absolute rounded-full overflow-hidden"
        style={{ willChange: "top, right, width, height, border-radius" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
