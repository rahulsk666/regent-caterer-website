"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "./ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav
      id="Header"
      className="container-app flex flex-row md:justify-center justify-end items-center"
    >
      <div className="m-2 lg:p-4 p-3 hidden md:flex flex-row justify-center items-center w-full gap-8 lg:text-lg text-base text-foreground-secondary/75 font-medium bg-linear-to-br from-white/20 to-white/5 backdrop-blur-[20px] rounded-2xl">
        <Link href="/" className="hover:text-foreground-secondary">
          Menu
        </Link>
        <Link href="/" className="hover:text-foreground-secondary">
          Services
        </Link>
        <Link href="/" className="hover:text-foreground-secondary">
          Home
        </Link>
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={512}
          height={512}
          loading="eager"
          className="w-8 lg:w-10 h-auto"
        />
        <Link href="/" className="hover:text-foreground-secondary">
          Why Us
        </Link>
        <Link href="/" className="hover:text-foreground-secondary">
          Gallery
        </Link>
        <Link href="/" className="hover:text-foreground-secondary">
          Contact Us
        </Link>
      </div>

      <div className="mt-2 py-2 md:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-end gap-2 py-2 rounded-lg "
        >
          <span className="w-2 h-0.5 bg-secondary" />
          <span className="w-4 h-0.5 bg-secondary" />
          <span className="w-6 h-0.5 bg-secondary" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-linear-to-br from-white/20 to-white/5 backdrop-blur-[20px]">
          <div className="p-6 m-2">
            <div className="flex flex-row justify-center w-full">
              <Image
                src={"/svg/logo-white.svg"}
                alt="logo-white"
                width={10}
                height={10}
                className="object-contain sm:w-24 xs:w-20 h-auto"
              />
              <p className="font-galgin sm:text-5xl xs:text-4xl text-foreground-secondary">
                Regent Caterers
              </p>

              <Button
                variant="rounded"
                onClick={toggleMenu}
                className="sm:size-12 xs:size-10 m-0"
              >
                ✕
              </Button>
            </div>
            <div className="flex flex-col gap-10 sm:text-4xl xs:text-3xl mt-10 m-5 font-caveat text-foreground-secondary">
              <Link href="/" className="">
                Home
              </Link>
              <Link href="/" className="">
                About US
              </Link>
              <Link href="/" className="">
                Why Us
              </Link>
              <Link href="/" className="">
                Testomonials
              </Link>
              <Link href="/" className="">
                Gallery
              </Link>
              <Link href="/contact" className="">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
