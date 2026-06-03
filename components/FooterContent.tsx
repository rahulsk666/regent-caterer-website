"use client";

import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

export default function FooterContent() {
  const container = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ─────────────────────────────────────
      // Nav Hover Animation
      // ─────────────────────────────────────
      const textElements = gsap.utils.toArray<HTMLElement>(".text");

      textElements.forEach((el) => {
        const split = SplitText.create(el, { type: "chars" });

        const enter = () =>
          gsap.to(split.chars, {
            y: -6,
            color: "#e7ba44",
            stagger: 0.02,
            duration: 0.3,
            ease: "power1.out",
          });

        const leave = () =>
          gsap.to(split.chars, {
            y: 0,
            color: "#ffffff",
            stagger: 0.02,
            duration: 0.3,
            ease: "power2.out",
          });

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);

        return () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
          split.revert();
        };
      });

      // ─────────────────────────────────────
      // Character Reveal — rises from behind the line
      // ─────────────────────────────────────
      // const splitTitle = SplitText.create(titleRef.current!, {
      //   type: "chars",
      // });

      // gsap.set(splitTitle.chars, {
      //   yPercent: 0,
      //   rotationX: 0,
      // });

      // gsap.from(splitTitle.chars, {
      //   duration: 1,
      //   yPercent: 100,
      //   rotationX: -70,
      //   stagger: 0.05,
      //   ease: "power2.inOut",
      //   delay: 0.2,
      //   scrollTrigger: {
      //     trigger: titleRef.current,
      //     start: "center top",
      //     end: "bottom bottom",
      //     scrub: 1,
      //     markers: true,
      //     toggleActions: "play none none reverse",
      //   },
      // });
    }, container);

    return () => ctx.revert();
  }, []);

  const navigateTo = (id: string) => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: id, autoKill: true },
      ease: "power2",
    });
  };

  return (
    <footer
      ref={container}
      className="relative w-full overflow-hidden text-white gap-5"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-20 px-6 py-16 md:px-12">
        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigateTo("#Header");
            }}
            className="text text-lg md:text-xl w-fit"
          >
            Home
          </a>
          <a href="" className="text text-lg md:text-xl w-fit">
            Services
          </a>
          <a href="" className="text text-lg md:text-xl w-fit">
            Gallery
          </a>
          <Link href="/contact" className="text text-lg md:text-xl w-fit">
            Contact
          </Link>
        </div>

        {/* Right Content */}
        <div className="max-w-md flex flex-col gap-6">
          <p className="text-white/70 text-sm uppercase tracking-[0.2em]">
            Regent Caterers
          </p>
          <p className="text-white/90 text-lg leading-relaxed">
            Excellence in every bite. Premium catering experiences crafted for
            weddings, events, celebrations, and unforgettable gatherings.
          </p>
        </div>
      </div>

      {/* ── Logo Reveal Section ─────────────────────────────────────────────── */}
      <div
        ref={titleContainerRef}
        className="relative w-full flex justify-center pb-4"
      >
        <div className="relative w-[95%]">
          {/*
            overflow-hidden = the mask.
            Height matches the text so nothing bleeds out below the line.
            Chars start at yPercent:105 (below this box) and slide up.
            */}
          <div
            className="overflow-hidden h-[11vw]"
            style={{ perspective: "800px" }}
          >
            <p
              ref={titleRef}
              className="text-[9vw] text-center leading-none whitespace-nowrap font-galgin text-white"
              style={{ transformStyle: "preserve-3d" }}
            >
              Regent Caterers
            </p>
          </div>
          {/* White line sits Below the mask — acts as the "reveal edge" */}
          <div className="w-full h-px bg-white" />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-5 mt-4 my-4 mx-5 p-2">
        <div className="flex flex-row md:gap-2 md:justify-start justify-center gap-5 text -sm text-white">
          <a className="text" href="">
            Privacy Policy
          </a>
          <span className="text-gray-500">|</span>
          <a className="text" href="">
            Terms of Use
          </a>
        </div>
        <div>
          <p className="text-sm text-white/70 text-center md:text-left hidden md:block">
            © {new Date().getFullYear()} Regent Caterers. All rights reserved.
          </p>
        </div>
        <div className="flex flex-row gap-4 mr-5 items-center justify-center">
          <a href="">
            <Image
              src={"svg/insta-bw.svg"}
              alt="insta"
              width={25}
              height={25}
              className="object-contain"
            />
          </a>
          <a href="">
            <Image
              src={"svg/fb-bw.svg"}
              alt="insta"
              width={25}
              height={25}
              className="object-contain"
            />
          </a>
          <a href="">
            <Image
              src={"svg/yt-bw.svg"}
              alt="insta"
              width={25}
              height={25}
              className="object-contain"
            />
          </a>
        </div>
        <div className="block md:hidden">
          <p className="text-sm text-white/70 text-center md:text-left ">
            © {new Date().getFullYear()} Regent Caterers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
