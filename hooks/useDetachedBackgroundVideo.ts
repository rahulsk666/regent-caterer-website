"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Video URL. Only ever fetched client-side; never appears in SSR output. */
  src: string;
  /** How long to wait for PROOF of real playback before giving up on one attempt. */
  confirmTimeoutMs?: number;
  /**
   * iOS refuses autoplay outright under Reduce Motion, so probing there only
   * burns bandwidth. Set false if you would rather try anyway.
   */
  respectReducedMotion?: boolean;
};

/**
 * Plays a decorative background video WITHOUT ever letting iOS Safari draw its
 * system "start playback" overlay.
 *
 * The invariant: a <video> element is in the document IF AND ONLY IF it is
 * currently playing. iOS draws (and hit-tests) that overlay at the system
 * level for any rendered, paused <video>; no CSS reaches it. An element with
 * no renderer cannot draw anything, so the element is built detached, proven
 * to be playing while still detached, appended only then, and removed again
 * the instant playback stops.
 *
 * Returns a ref for the mount container plus a flag for `data-` attributes /
 * debugging. The poster <Image> is the caller's responsibility and must stay
 * mounted permanently underneath.
 */
export function useDetachedBackgroundVideo({
  src,
  confirmTimeoutMs = 2000,
  respectReducedMotion = true,
}: Options) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [videoActive, setVideoActive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (
      respectReducedMotion &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      // Never create the element at all: no request, no decoder, no overlay.
      return;
    }

    let disposed = false;
    let attached = false; // is the <video> currently in the document?
    let gesturesBound = false;
    let confirmInFlight = false;
    let confirmTimer: number | undefined;
    let retryTimer: number | undefined;
    let attemptSeq = 0;

    // ---- build it detached -------------------------------------------------
    const video = document.createElement("video");

    // Muted state must be set as DOM *properties* AND as the content
    // attribute; WebKit reads different ones on different code paths.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");

    video.loop = true;
    video.controls = false;
    video.preload = "auto";
    video.tabIndex = -1;
    video.disablePictureInPicture = true;
    video.disableRemotePlayback = true;

    // Deliberately NOT autoplay: we drive play() ourselves. The attribute
    // would let WebKit start playback on its own after append, on a path
    // gated by MediaElementSession::autoplayPermitted() that we don't
    // control.
    video.autoplay = false;

    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", ""); // legacy iOS
    video.setAttribute("x-webkit-airplay", "deny");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("data-chromeless-video", ""); // belt & braces vs. Chrome

    // Static class defined in globals.css, NOT composed Tailwind utilities:
    // this string never passes through Tailwind's source scanner as part of
    // a JSX className, so relying on utility generation here would be
    // fragile.
    video.className = "bg-video-layer";
    video.dataset.ready = "false";

    video.src = src;
    video.load();

    // ---- attach / detach ---------------------------------------------------
    const attach = () => {
      if (disposed || attached) return;
      attached = true;
      mount.appendChild(video);
      // Two frames: the initial opacity:0 must be committed before we flip
      // it, otherwise the transition is skipped and the video pops in.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!disposed && attached) video.dataset.ready = "true";
        });
      });
      setVideoActive(true);
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      video.dataset.ready = "false";
      // Synchronous, no fade-out. A paused element lingering on screen for
      // the duration of a transition is exactly the state that draws the
      // overlay.
      video.remove();
      setVideoActive(false);
    };

    // ---- proof of genuine playback ----------------------------------------
    const confirm = (seq: number) => {
      const baseline = video.currentTime;
      const deadline = performance.now() + confirmTimeoutMs;
      confirmInFlight = true;

      const tick = () => {
        if (disposed || seq !== attemptSeq || attached) {
          confirmInFlight = false;
          return;
        }
        const running =
          !video.paused &&
          !video.ended &&
          video.readyState >= 3 && // HAVE_FUTURE_DATA => a decodable frame exists
          video.currentTime > baseline;

        if (running) {
          confirmInFlight = false;
          unbindGestures();
          attach();
          return;
        }
        if (performance.now() >= deadline) {
          // No proof. Stay detached, keep the poster, wait for a gesture.
          // Appending a non-playing <video> is the whole bug.
          confirmInFlight = false;
          bindGestures();
          return;
        }
        confirmTimer = window.setTimeout(tick, 120);
      };

      window.clearTimeout(confirmTimer);
      confirmTimer = window.setTimeout(tick, 120);
    };

    // ---- attempt -----------------------------------------------------------
    const attempt = () => {
      if (disposed || attached || confirmInFlight) return;

      // Re-assert before EVERY attempt: a rejected play() can leave WebKit's
      // "user gesture required" restriction set, and re-asserting muted
      // state is what lets the next, gesture-backed attempt clear it.
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;

      const seq = ++attemptSeq;

      let p: Promise<void> | undefined;
      try {
        // MUST be synchronous in a gesture handler -- no await above this
        // line, or the user-activation token is gone by the time we call
        // play().
        p = video.play();
      } catch {
        bindGestures();
        return;
      }

      if (p && typeof p.then === "function") {
        p.catch(() => {
          // NotAllowedError (policy) or AbortError (interrupted load).
          // Swallowed: an unhandled rejection here is a console error on
          // every iOS visit. The confirm poll below decides the outcome
          // either way.
          if (!disposed && seq === attemptSeq) bindGestures();
        });
      }

      // Scheduled unconditionally, NOT inside .then(): on a detached
      // element the promise can resolve without a frame, and can also
      // never settle at all.
      confirm(seq);
    };

    // ---- interruption ------------------------------------------------------
    const onInterrupted = () => {
      if (disposed) return;
      detach(); // immediate -- this is the safety property
      bindGestures();
      // Debounced so a fast scroll past the section cannot thrash
      // attach/detach (WebKit pauses video scrolled out of the viewport).
      window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(attempt, 300);
    };
    video.addEventListener("pause", onInterrupted);
    video.addEventListener("error", onInterrupted);
    video.addEventListener("emptied", onInterrupted);
    // NOTE: no "waiting" listener -- a buffer stall keeps paused === false
    // and shows a spinner, not the start-playback overlay.

    // ---- retries -----------------------------------------------------------
    const onGesture = () => attempt();
    const onVisibility = () => {
      if (document.visibilityState === "visible") attempt();
      else detach(); // backgrounded tabs pause media; retreat pre-emptively
    };

    function bindGestures() {
      if (gesturesBound || disposed) return;
      gesturesBound = true;
      // touchend / pointerup / click carry user activation, which is what
      // actually clears the Low Power Mode restriction. scroll does not,
      // but it recovers the "was allowed, then paused for visibility" case.
      document.addEventListener("touchend", onGesture, { passive: true });
      document.addEventListener("pointerup", onGesture, { passive: true });
      document.addEventListener("click", onGesture, { passive: true });
      document.addEventListener("scroll", onGesture, { passive: true });
    }
    function unbindGestures() {
      gesturesBound = false;
      document.removeEventListener("touchend", onGesture);
      document.removeEventListener("pointerup", onGesture);
      document.removeEventListener("click", onGesture);
      document.removeEventListener("scroll", onGesture);
    }

    // visibilitychange stays bound for the effect's whole life so we can
    // retreat on backgrounding even while playing.
    document.addEventListener("visibilitychange", onVisibility);

    attempt();

    return () => {
      disposed = true;
      window.clearTimeout(confirmTimer);
      window.clearTimeout(retryTimer);
      unbindGestures();
      document.removeEventListener("visibilitychange", onVisibility);
      // Remove the element's own listeners BEFORE pausing, or the teardown
      // pause() re-enters onInterrupted.
      video.removeEventListener("pause", onInterrupted);
      video.removeEventListener("error", onInterrupted);
      video.removeEventListener("emptied", onInterrupted);
      video.pause();
      video.removeAttribute("src"); // NOT src = "" -- that requests the page URL
      video.srcObject = null;
      video.load(); // tears down the AVPlayer; iOS has very few decode slots
      video.remove();
    };
  }, [src, confirmTimeoutMs, respectReducedMotion]);

  return { mountRef, videoActive };
}
