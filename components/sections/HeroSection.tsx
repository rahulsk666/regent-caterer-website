"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import HeroContactButtons from "../HeroContactButtons";
import { baseStyles, buttonVariants } from "../ui/CustomButton";
import { scrollToSection } from "@/lib/scroll";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex-1 py-20 min-h-screen items-center justify-center"
    >
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2))",
        }}
      />
      <div className="container-app relative z-10 w-full p-10 lg:gap-2 gap-5 flex flex-col items-center justify-center">
        <div className="text-sm font-medium text-white flex flex-col items-center justify-center">
          <p>Quality You Can Taste</p>
          <p>Service You Can Trust</p>
        </div>
        <Image
          src={"/images/logo.webp"}
          alt="Regent Caterers"
          width={512}
          height={512}
          loading="eager"
          className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />
        <h1 className="flex flex-col lg:text-6xl md:text-5xl sm:text-3xl text-2xl tracking-wide whitespace-nowrap leading-none text-white font-semibold font-helmorin">
          <span className="text-center">Regent Catering Service</span>
        </h1>
        <p className=" text-lg text-center font-light text-white">
          Since 1996, Regent Caterers served countless events across Kerala,
          transforming celebrations into unforgettable dining experiences with
          exceptional cuisine, professional service, and unwavering commitment
          to quality.
        </p>
        <div className="flex md:flex-row flex-col items-center mt-4 gap-10">
          <Link
            className="group order-2 md:order-1 text-xl text-white font-medium flex flex-row md:gap-2 gap-1 items-center cursor-pointer"
            href={"/#whyUsSection"}
            onClick={scrollToSection("whyUsSection")}
          >
            Explore our Services
            <Image
              src={"/svg/arrow-up-right.svg"}
              alt="Arrow up right"
              width={24}
              height={24}
              className="w-6 h-6 opacity-90 transform group-hover:rotate-45 transition-all duration-300 ease-in-out"
            />
          </Link>
          <Link
            href={"/contact"}
            className={twMerge(
              baseStyles,
              buttonVariants.primary,
              "order-1 md:order-2",
            )}
          >
            Book Your Event
          </Link>
        </div>
        <HeroContactButtons />
      </div>
    </section>
  );
}
