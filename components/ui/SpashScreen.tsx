"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    gsap.fromTo(
      ".splash-logo",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.Out",
      },
    );
    gsap.fromTo(
      ".splash-text",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    );
  }, []);

  useEffect(() => {
    // Set duration for the splash screen view (e.g., 2.5 seconds)
    const timeout = setTimeout(() => {
      setIsMounted(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  if (isMounted) {
    return (
      <div className="h-screen flex flex-col gap-2 justify-center items-center bg-golden-50">
        <Image
          src="/svg/logo.svg"
          alt="Regent Splash Screen"
          width={1920}
          height={1080}
          loading="eager"
          className="w-20 splash-logo h-auto object-cover z-50"
        />
        <p className="splash-text text-4xl font-galgin text-golden-gradient">
          Regent Caterers
        </p>
      </div>
    );
  }

  return children;
}
