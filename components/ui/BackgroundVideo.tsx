"use client";

import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  type?: string;
};

/**
 * Full-bleed decorative background video. Always autoplays, loops, and
 * never shows native media chrome (play button, controls, AirPlay) even
 * when the platform initially refuses autoplay — see useAutoplayVideo and
 * the [data-chromeless-video] rules in app/globals.css.
 */
export default function BackgroundVideo({
  src,
  poster,
  className,
  type = "video/mp4",
}: Props) {
  const ref = useAutoplayVideo();

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      autoPlay
      playsInline
      controls={false}
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      x-webkit-airplay="deny"
      aria-hidden="true"
      tabIndex={-1}
      data-chromeless-video=""
      className={cn("pointer-events-none select-none", className)}
    >
      <source src={src} type={type} />
    </video>
  );
}
