"use client";

import Image from "next/image";
import { useDetachedBackgroundVideo } from "@/hooks/useDetachedBackgroundVideo";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  /**
   * REQUIRED. The always-present base layer, and the permanent fallback on
   * any device that refuses autoplay.
   */
  poster: string;
  /** Positioning for the full-bleed wrapper, e.g. "absolute -z-10 w-full h-full". */
  className?: string;
  /** next/image `sizes`; full-bleed by default. */
  sizes?: string;
};

/**
 * Full-bleed decorative background.
 *
 * The poster <Image> is the base layer and is NEVER unmounted. The <video>
 * is created imperatively (see useDetachedBackgroundVideo), so it is absent
 * from SSR output and from the DOM at mount, and is only inserted once
 * playback is proven to be running -- which is what makes it impossible for
 * iOS Safari to draw its system start-playback overlay.
 */
export default function BackgroundVideo({
  src,
  poster,
  className,
  sizes = "100vw",
}: Props) {
  const { mountRef, videoActive } = useDetachedBackgroundVideo({ src });

  return (
    <div
      aria-hidden="true"
      data-video-active={videoActive ? "true" : "false"}
      className={cn(
        "overflow-hidden pointer-events-none select-none",
        className,
      )}
    >
      <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
}
