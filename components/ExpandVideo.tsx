"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { log } from "console";

gsap.registerPlugin(ScrollTrigger);

export default function ExpandVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;
    if (!circle || !container) return;

    const mm = gsap.matchMedia();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    console.log(vw);

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1120px)", () => {
        gsap.fromTo(
          circle,
          {
            top: -220,
            right: 150,
            bottom: 0,
            width: "45vw",
            height: "45vw",
            borderRadius: "50%",
            ease: "none",
          },
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: vw,
            height: vh,
            borderRadius: "0",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top 70%",
              end: "+=30%",
              scrub: 1,
              // markers: true,
            },
          },
        );
      });
      mm.add("(min-width: 680px) and (max-width: 1119px)", () => {
        gsap.fromTo(
          circle,
          {
            top: -160,
            right: 150,
            bottom: 0,
            width: "35vw",
            height: "35vw",
            borderRadius: "50%",
            ease: "none",
          },
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: vw,
            height: vh,
            borderRadius: "0",
            ease: "none",
            overflow: "hidden",
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top 50%",
              end: "+=30%",
              scrub: 1,
              // markers: true,
            },
          },
        );
      });
      mm.add("(max-width: 680px)", () => {
        gsap.fromTo(
          circle,
          {
            top: -80,
            right: -120,
            bottom: 0,
            width: "90vw",
            height: "90vw",
            borderRadius: "50%",
            ease: "none",
            overflow: "hidden",
          },
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: vw,
            height: vh,
            borderRadius: "0",
            ease: "none",
            overflow: "hidden",
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top 75%",
              end: "+=20%",
              scrub: 1,
              // markers: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
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
