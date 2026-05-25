"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GsapMagneticCursor from "./GsapMagneticCursor";

gsap.registerPlugin(useGSAP);

export default function BookButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // entrance animation — use class selectors since refs are taken by MagneticCursor
      gsap.from(".book-ball, .book-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="lg:mt-10 mt-6">
      <GsapMagneticCursor strength={0.1}>
        <div
          className="flex items-center relative w-100"
          onClick={() => console.log("book your event")}
        >
          <div className="book-ball rounded-full bg-peach-500 w-20 h-20" />
          <p className="book-text absolute left-9 lg:text-4xl md:text-3xl text-2xl font-galgin">
            Book Your Event
          </p>
        </div>
      </GsapMagneticCursor>
    </div>
  );
}
