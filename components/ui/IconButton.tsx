"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  imageSrc: string;
  alt: string;
  classname?: string;
  imageClassname?: string;
}

export default function IconButton({
  link,
  imageSrc,
  alt,
  classname,
  imageClassname,
}: Props) {
  return (
    <Link
      className={`cursor-pointer md:hover:scale-105 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-xs p-2 ${classname}`}
      href={link}
      role="button"
    >
      <div className="rounded-2xl">
        <Image
          src={imageSrc}
          alt={alt}
          width={100}
          height={100}
          className={`w-full h-full rounded-full object-contain md:grayscale md:hover:grayscale-0 transition-all duration-300 ${imageClassname}`}
        />
      </div>
    </Link>
  );
}
