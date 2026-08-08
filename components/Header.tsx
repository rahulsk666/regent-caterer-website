"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/CustomButton";
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

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `/#${id}`);
    }
  };

  useEffect(() => {
    let lastDirection = 0;
    const mm = gsap.matchMedia();

    mm.add("(max-width: 680px)", () => {
      ScrollTrigger.create({
        start: 10,
        scrub: 1,
        onUpdate: (self) => {
          if (self.direction === lastDirection) return;
          lastDirection = self.direction;

          if (self.direction === 1) {
            // scrolling down
            gsap.to(".nav-mob", {
              y: -120,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // scrolling up
            gsap.to(".nav-mob", {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },

        // onEnter: () => {
        //   gsap.to(".nav-mob", {
        //     translateX: 100,
        //     opacity: 0,
        //   });
        // },
        // onLeaveBack: () => {
        //   gsap.to(".nav-mob", {
        //     translateX: 0,
        //     opacity: 1,
        //   });
        // },
      });
    });

    if (variant == "dark") {
      return;
    }

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
      className="container-app fixed z-100 right-0 left-0 flex flex-row md:justify-center justify-end items-center"
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
        <Link href="/" className="hover:text-foreground-secondary">
          Home
        </Link>

        <Link
          href="/#whyUsSection"
          onClick={scrollToSection("whyUsSection")}
          className="hover:text-foreground-secondary"
        >
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
        <Link href="/gallery/all" className="hover:text-foreground-secondary">
          Gallery
        </Link>
        <Link href="/contact" className="hover:text-foreground-secondary">
          Contact Us
        </Link>
      </div>

      <div className="nav-mob mt-2 py-2 md:hidden">
        <button
          onClick={toggleMenu}
          className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full bg-golden-500"
        >
          <span className="h-0.5 w-4 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-between bg-white/95 backdrop-blur-[20px]">
          <div className="p-6 m-2">
            <div className="flex flex-row justify-end w-full">
              <Button
                variant="rounded"
                onClick={toggleMenu}
                className="sm:size-12 xs:size-10 m-0 text-foreground-primary"
              >
                ✕
              </Button>
            </div>
            <div className="flex flex-col gap-10 sm:text-4xl xs:text-3xl mt-10 m-5 font-galgin text-foreground-primary">
              <Link href="/" onClick={toggleMenu} className="">
                Home
              </Link>
              <Link
                href="/#aboutSection"
                onClick={(e) => {
                  scrollToSection("aboutSection")(e);
                  toggleMenu();
                }}
                className=""
              >
                About US
              </Link>
              <Link
                href="/#whyUsSection"
                onClick={(e) => {
                  scrollToSection("whyUsSection")(e);
                  toggleMenu();
                }}
                className=""
              >
                Why Us
              </Link>
              <Link
                href="/#testimonialsSections"
                onClick={(e) => {
                  scrollToSection("testimonialsSections")(e);
                  toggleMenu();
                }}
                className=""
              >
                Testomonials
              </Link>
              <Link href="/gallery/all" className="">
                Gallery
              </Link>
              <Link href="/contact" className="">
                Contact Us
              </Link>
            </div>
          </div>

          <p className="pb-6 text-center text-sm text-foreground-muted">
            ©{new Date().getFullYear()} Regent Caterers. All rights reserved.
          </p>
        </div>
      )}
    </nav>
  );
}
