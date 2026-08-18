"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps a decorative <video> playing on platforms with restrictive autoplay
 * policies (iOS Safari in Low Power Mode / Low Data Mode / Reduce Motion,
 * which refuse autoplay even for silent, muted, inline video).
 *
 * Strategy: force the muted state imperatively, attempt play(), and if the
 * promise rejects, re-attempt on the next user gesture or when the tab /
 * element becomes visible again. Listeners are one-shot per attempt cycle
 * and self-cleaning.
 */
export function useAutoplayVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelled = false;
    let attached = false;

    // Must be set as DOM *properties*, before every play() attempt, not
    // just once at mount. A rejected play() in Low Power Mode can leave
    // WebKit's internal "user gesture required" restriction set; re-
    // asserting muted state on each retry is what lets a gesture-triggered
    // attempt clear it.
    const forceMuted = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0;
    };

    const attempt = () => {
      if (cancelled) return;
      forceMuted();
      const playPromise = video.play();
      // Older Safari returns undefined rather than a Promise.
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            if (!cancelled) detachRetries();
          })
          .catch(() => {
            // NotAllowedError (policy) or AbortError (interrupted load).
            // Swallow: an unhandled rejection here is a console error on
            // every iOS visit. Retry listeners stay attached.
            if (!cancelled) attachRetries();
          });
      }
    };

    const onGesture = () => attempt();
    const onVisibility = () => {
      if (document.visibilityState === "visible") attempt();
    };

    function attachRetries() {
      if (attached || cancelled) return;
      attached = true;
      document.addEventListener("touchend", onGesture, { passive: true });
      document.addEventListener("pointerup", onGesture, { passive: true });
      document.addEventListener("click", onGesture, { passive: true });
      document.addEventListener("scroll", onGesture, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }
    function detachRetries() {
      attached = false;
      document.removeEventListener("touchend", onGesture);
      document.removeEventListener("pointerup", onGesture);
      document.removeEventListener("click", onGesture);
      document.removeEventListener("scroll", onGesture);
      document.removeEventListener("visibilitychange", onVisibility);
    }

    // If iOS suspends the element mid-scroll (memory pressure, media
    // interruption), resume it.
    const onPause = () => attempt();
    video.addEventListener("pause", onPause);

    // readyState may already be >= HAVE_CURRENT_DATA on a warm cache.
    if (video.readyState >= 2) {
      attempt();
    } else {
      video.addEventListener("loadeddata", attempt, { once: true });
      attempt(); // try anyway; harmless if it rejects
    }

    return () => {
      cancelled = true;
      detachRetries();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadeddata", attempt);
    };
  }, []);

  return ref;
}
