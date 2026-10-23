"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const SESSION_KEY = "splashShown";

// Timings mirror the previous GSAP timeline exactly:
// logo fades in over 1s, text starts 0.15s later (also 1s), then a 0.5s
// fade-out begins 0.4s after the text tween finishes — so total dismissal
// is unchanged at ~2.05s. See globals.css for the matching @keyframes.
const TEXT_DELAY_MS = 150;
const ENTER_DURATION_MS = 1000;
const FADE_START_MS = TEXT_DELAY_MS + ENTER_DURATION_MS + 400; // 1550ms
const FADE_DURATION_MS = 500;
const TOTAL_DURATION_MS = FADE_START_MS + FADE_DURATION_MS; // 2050ms
const REDUCED_MOTION_DURATION_MS = 1200; // matches the old delayedCall(1.2, …)

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Frozen at first mount: this component lives in the root layout and never
  // unmounts across client navigations, so later route changes to "/" must
  // not re-trigger the splash. The initial value matches the server-rendered
  // markup exactly (sessionStorage isn't available during SSR) — the layout
  // effect below corrects it before paint if the splash already played this
  // session, so repeat homepage visits skip it with no flash.
  const [showSplash, setShowSplash] = useState(pathname === "/");
  const [isDismissing, setIsDismissing] = useState(false);

  useLayoutEffect(() => {
    // Deliberate effect, not derivable during render: sessionStorage only
    // exists client-side, and this must run before paint (useLayoutEffect)
    // to avoid a flash on repeat visits — see the comment above.
    if (showSplash && sessionStorage.getItem(SESSION_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSplash(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showSplash) return;

    const dismiss = () => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShowSplash(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(dismiss, REDUCED_MOTION_DURATION_MS);
      return () => clearTimeout(timer);
    }

    const fadeTimer = setTimeout(() => setIsDismissing(true), FADE_START_MS);
    const dismissTimer = setTimeout(dismiss, TOTAL_DURATION_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [showSplash]);

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
          role="status"
          aria-label="Loading"
          className={`splash-root fixed inset-0 z-[110] flex flex-col gap-2 justify-center items-center bg-golden-50 ${isDismissing ? "is-dismissing" : ""}`}
        >
          <Image
            src="/images/logo.webp"
            alt=""
            width={359}
            height={330}
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
