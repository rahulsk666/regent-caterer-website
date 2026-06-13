"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

interface HeaderProps {
  variant?: "light" | "dark";
}
gsap.registerPlugin(ScrollTrigger);

export default function Header({ variant = "light" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (variant == "dark") {
      return;
    }
    let lastDirection = 0;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 680px)", () => {
      ScrollTrigger.create({
        start: 850,
        onEnter: () => {
          gsap.to(".nav-inner", {
            backgroundColor: "#ECC869",
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(".nav-inner", {
            backgroundColor: "rgba(255,255,255,.1)",
            duration: 0.3,
          });
        },
      });

      ScrollTrigger.create({
        start: 30,
        end: "max",
        scrub: 2,
        onUpdate: (self) => {
          if (self.direction === lastDirection) return;
          lastDirection = self.direction;

          if (self.direction === 1) {
            // scrolling down
            gsap.to(".nav-inner", {
              y: -120,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // scrolling up
            gsap.to(".nav-inner", {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
    });

    mm.add("(max-width: 680px)", () => {
      ScrollTrigger.create({
        start: 10,
        scrub: 1,
        onEnter: () => {
          gsap.to(".nav-mob", {
            translateX: 100,
            opacity: 0,
          });
        },
        onLeaveBack: () => {
          gsap.to(".nav-mob", {
            translateX: 0,
            opacity: 1,
          });
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, [variant]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  return (
    <nav
      id="Header"
      className="container-app fixed z-1000 right-0 left-0 flex flex-row md:justify-center justify-end items-center"
    >
      <div
        className={twMerge(
          "nav-inner",
          "m-2 lg:p-4 p-3 hidden md:flex flex-row justify-center items-center w-full gap-8 lg:text-lg text-base font-medium rounded-2xl",
          variant === "light"
            ? "text-foreground-secondary/75 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-[20px]"
            : "text-foreground-secondary/75 bg-linear-to-r from-golden-500 from-0% via-golden-300 via-50% to-golden-400 to-100%",
        )}
      >
        {/* <Link href="/" className="hover:text-foreground-secondary">
          Menu
        </Link>
        <Link href="/" className="hover:text-foreground-secondary">
          Services
        </Link> */}
        <Link href="/" className="hover:text-foreground-secondary">
          Home
        </Link>

        <Link href="/#whyUsSection" className="hover:text-foreground-secondary">
          Why Us
        </Link>
        {/* Logo */}
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={512}
          height={512}
          loading="eager"
          className="w-8 lg:w-10 h-auto "
        />
        <Link href="/" className="hover:text-foreground-secondary">
          Gallery
        </Link>
        <Link href="/contact" className="hover:text-foreground-secondary">
          Contact Us
        </Link>
      </div>

      <div className="nav-mob mt-2 py-2 md:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-end gap-2 py-2 rounded-lg "
        >
          <span
            className={`w-2 h-0.5 ${
              variant === "light" ? "bg-secondary" : "bg-golden-500"
            }`}
          />
          <span
            className={`w-4 h-0.5 ${
              variant === "light" ? "bg-secondary" : "bg-golden-500"
            }`}
          />
          <span
            className={`w-6 h-0.5 ${
              variant === "light" ? "bg-secondary" : "bg-golden-500"
            }`}
          />
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
              <Link href="/#aboutSection" className="">
                About US
              </Link>
              <Link href="/#whyUsSection" className="">
                Why Us
              </Link>
              <Link href="/#testimonialsSections" className="">
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
