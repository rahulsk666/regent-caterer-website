"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  index: number;
  bgImage?: string;
  title: string;
  description: string;
  icon?: string;
  className?: string;
  url?: string;
};

export default function FeatureCard({
  index,
  title,
  description,
  bgImage = `/images/card/card-bg.jpeg`,
  icon = "/svg/star.svg",
  className = "",
  url = "#",
}: FeatureCardProps) {
  return (
    <Link
      key={index}
      href={url}
      className={twMerge(
        `
          group relative
          flex flex-col
          gap-3
          w-full
          h-full
          min-h-55
          sm:min-h-57.5
          md:min-h-60
          p-4
          sm:p-5
          md:p-5
          rounded-2xl
          bg-card-background
          shadow-lg
          overflow-hidden
          transition-all
          duration-300
          ease-out
          active:scale-[0.98]
          md:hover:-translate-y-1
          md:hover:shadow-xl
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-golden-500
          focus-visible:ring-offset-2
        `,
        className,
      )}
    >
      {/* Static Background Image */}
      <div
        aria-hidden="true"
        className={cn(
          `
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          rounded-3xl
          contrast-90
          `,
        )}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2)),url('${bgImage}')`,
        }}
      />

      {/* Background Overlay */}
      {/* <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-card-background/5
          pointer-events-none
        "
      /> */}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col gap-3 h-full">
        {/* Card Icon */}
        <div className="m-1">
          <Image
            src={icon}
            alt={title}
            width={28}
            height={28}
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              md:w-9 md:h-9
              object-contain
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
            font-bold
            text-lg
            sm:text-xl
            md:text-xl
            lg:text-xl
            leading-tight
            text-white
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="
            text-base
            sm:text-lg
            md:text-lg
            lg:text-lg
            leading-relaxed
            pr-14
            pb-8
            text-white
          "
        >
          {description}
        </p>

        {/* Navigate Button */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            right-0
            flex
            items-center
            justify-center
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-full
            bg-golden-600
            text-white
            shadow-md
            transition-all
            duration-300
            ease-out
            group-active:scale-90
            md:group-hover:scale-110
            md:group-hover:bg-golden-500
          "
        >
          <ArrowUpRight
            strokeWidth={2.5}
            className="
              w-4.25
              h-4.25
              sm:w-4.75
              sm:h-4.75
              transition-transform
              duration-300
              md:group-hover:translate-x-1
              md:group-hover:-translate-y-1
            "
          />
        </span>
      </div>
    </Link>
  );
}
