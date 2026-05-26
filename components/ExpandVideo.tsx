"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExpandVideo() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1120px)", () => {
        gsap.fromTo(
          circle,
          {
            top: 500,
            right: 120,
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
            width: "100%",
            height: "100%",
            borderRadius: "0",
            ease: "none",
            scrollTrigger: {
              trigger: circle,
              start: "top 50%",
              end: "+=30%",
              scrub: 1.2,
              //   markers: true,
            },
          },
        );
      });
      mm.add("(min-width: 680px) and (max-width: 1119px)", () => {
        gsap.fromTo(
          circle,
          {
            top: 400,
            right: 100,
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
            width: "100%",
            height: "100%",
            borderRadius: "0",
            ease: "none",
            overflow: "hidden",
            scrollTrigger: {
              trigger: circle,
              start: "top 40%",
              end: "+=30%",
              scrub: 1.2,
              //   markers: true,
            },
          },
        );
      });
      mm.add("(max-width: 680px)", () => {
        gsap.fromTo(
          circle,
          {
            top: 600,
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
            width: "100%",
            height: "100%",
            borderRadius: "0",
            ease: "none",
            overflow: "hidden",
            scrollTrigger: {
              trigger: circle,
              start: "top 0%",
              end: "+=50%",
              scrub: 1.2,
              // markers: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={circleRef}
      className="fixed rounded-full overflow-hidden"
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
  );
}
