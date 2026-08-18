"use client";

import { features, stats } from "@/lib/data";
import StatItem from "../ui/StatItem";
import FeatureCard from "../ui/FeatureCard";
import Image from "next/image";
import { useRef } from "react";

// Mobile/tablet card-stack scroll animation disabled — was scroll-jacking
// the section (1500px pin) and breaking on resize/rotate. Cards now render
// as a plain list instead (see .feature-stack in the JSX below).
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // useGSAP(
  //   () => {
  //     const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
  //     const cardHeight = cards[0]?.offsetHeight ?? 0;
  //
  //     const mm = gsap.matchMedia();
  //     mm.add("(max-width: 680px)", () => {
  //       const INITIAL_GAP = 40;
  //       // Set initial position — stack all cards below the first one
  //       cards.forEach((card, index) => {
  //         gsap.set(card, {
  //           y: index === 0 ? 0 : index * (cardHeight + INITIAL_GAP),
  //           left: 0,
  //           right: 0,
  //         });
  //         gsap.set(".feature-stack", {
  //           height: "50vh",
  //         });
  //         gsap.set(".stats-stack", {
  //           opacity: 0,
  //         });
  //       });
  //
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: `+=1500`,
  //           pin: true,
  //           scrub: 1,
  //           // pinSpacing: false,
  //           anticipatePin: 1, // prevents jump when pin kicks in
  //         },
  //       });
  //
  //       cards.forEach((card, index) => {
  //         if (index === 0) return;
  //         tl.to(card, {
  //           y: index * 20,
  //           zIndex: index + 1,
  //           ease: "none",
  //           duration: 1,
  //         });
  //       });
  //
  //       tl.to(".feature-stack", {
  //         height: "48vh",
  //       });
  //
  //       tl.to(".stats-stack", {
  //         opacity: 1,
  //       });
  //     });
  //
  //     mm.add("(max-width: 1120px) and (min-width: 680px)", () => {
  //       // Set initial position — stack all cards below the first one
  //       cards.forEach((card, index) => {
  //         const INITIAL_GAP = 40;
  //         gsap.set(card, {
  //           y: index === 0 ? 0 : index * (cardHeight + INITIAL_GAP),
  //           left: 0,
  //           right: 0,
  //         });
  //         gsap.set(".feature-stack", {
  //           height: "40vh",
  //         });
  //         gsap.set(".stats-stack", {
  //           opacity: 0,
  //         });
  //       });
  //
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: `+=1500`,
  //           pin: true,
  //           scrub: 1,
  //           // pinSpacing: false,
  //           anticipatePin: 1, // prevents jump when pin kicks in
  //         },
  //       });
  //
  //       cards.forEach((card, index) => {
  //         if (index === 0) return;
  //         tl.to(card, {
  //           y: index * 20,
  //           zIndex: index + 1,
  //           ease: "none",
  //           duration: 1,
  //         });
  //       });
  //
  //       tl.to(".feature-stack", {
  //         height: "35vh",
  //       });
  //
  //       tl.to(".stats-stack", {
  //         opacity: 1,
  //       });
  //     });
  //   },
  //   { scope: sectionRef },
  // );
  return (
    <section ref={sectionRef} id="whyUsSection" className="bg-white">
      <div className="container-app min-h-screen py-10">
        <div className="flex flex-row lg:ml-9 items-center justify-start">
          <div className="px-2">
            <p className="font-kapakana text-foreground-golden md:text-9xl text-6xl">
              Why us
            </p>
          </div>
        </div>
        <div className="bento-grid">
          <div className="item hero">
            <p className="font-red-hat-display lg:text-xl md:text-lg text-base">
              It&apos;s not just a brand, but the quality you can taste and the
              service you can trust. Our Professional chefs will make sure that,
              your every bite is memorable. Our trained service team will
              guarantee your satisfaction with the excellent service . With
              years of experience in this field, we have earned lots of love and
              respect from our beloved clients. Our team is well established and
              has the full source and potential to make your function
              spectacular.
            </p>
          </div>

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`item stat${index + 1} flex items-center justify-start`}
            >
              <StatItem label={stat.label} value={stat.value} />
            </div>
          ))}

          {features.map((feature, index) => (
            <div key={feature.title} className={`item feature${index + 1}`}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                url={feature.url}
              />
            </div>
          ))}

          <div className="lg:hidden w-20 item star items-center justify-center">
            <Image
              src="/svg/star.svg"
              alt="star"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:hidden flex flex-col gap-4">
          <p className="font-red-hat-display my-5 md:text-xl text-sm">
            It&apos;s not just a brand, but the quality you can taste and the
            service you can trust. Our Professional chefs will make sure that,
            your every bite is memorable. Our trained service team will
            guarantee your satisfaction with their excellent service . With
            years of experience in this field, we have earned lots of love and
            respect from our beloved clients. Our team is well established and
            has the full source and potential to make your event spectacular.
          </p>
          <div>
            <div className="feature-stack relative p-2 px-5 flex flex-col w-full gap-4">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  url={feature.url}
                  className="feature-card border"
                />
              ))}
            </div>
          </div>
          <div className="stats-stack grid grid-cols-2 gap-5 my-10 items-center justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className={``}>
                <StatItem label={stat.label} value={stat.value} />
              </div>
            ))}
            <div className="">
              <Image
                src="/svg/star.svg"
                alt="star"
                width={20}
                height={20}
                className="w-15 h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
