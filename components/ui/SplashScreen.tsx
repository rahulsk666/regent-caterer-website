"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Frozen at first mount: this component lives in the root layout and never
  // unmounts across client navigations, so later route changes to "/" must
  // not re-trigger the splash.
  const [showSplash, setShowSplash] = useState(pathname === "/");
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!showSplash) return;

      const dismiss = () => setShowSplash(false);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ onComplete: dismiss })
          .fromTo(
            ".splash-logo",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          )
          .fromTo(
            ".splash-text",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "<0.15",
          )
          .to(
            rootRef.current,
            { opacity: 0, duration: 0.5, ease: "power2.inOut" },
            "+=0.4",
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.delayedCall(1.2, dismiss);
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [showSplash] },
  );

  useEffect(() => {
    if (!showSplash) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [showSplash]);

  return (
    <>
      {children}
      {showSplash && (
        <div
          ref={rootRef}
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[110] flex flex-col gap-2 justify-center items-center bg-golden-50"
        >
          <Image
            src="/svg/logo.svg"
            alt=""
            width={1920}
            height={1080}
            loading="eager"
            className="w-20 splash-logo h-auto object-cover"
          />
          <p className="splash-text text-4xl font-galgin text-golden-gradient">
            Regent Caterers
          </p>
        </div>
      )}
    </>
  );
}
