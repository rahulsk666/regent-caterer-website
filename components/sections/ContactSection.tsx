import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function ContactSection() {
  return (
    <section
      id="contactSection"
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2))",
      }}
    >
      <video
        loop
        muted
        autoPlay
        playsInline
        className="absolute z-[-1] object-cover w-full h-full"
      >
        <source src="/videos/contact-bg.mp4" type="video/mp4" />
      </video>
      <div className="relative h-full w-full mx-auto flex flex-col lg:pt-50 pt-20 lg:gap-20 gap-70  items-center justify-center">
        <p className="text-golden-gradient font-galgin lg:text-6xl md:text-5xl text-3xl">
          Let’s plan together
        </p>
        <div className="flex flex-col items-center justify-center lg:gap-20 md:gap-10 gap-5">
          <Button variant="primary" className="lg:w-3xl md:w-xl w-70">
            <Link
              href={
                "https://wa.me/919876543210?text=Hi%20I'd%20like%20to%20know%20more%20about%20your%20services"
              }
              className="flex items-center gap-5"
            >
              <p className="lg:text-6xl md:text-4xl text-xl font-galgin text-foreground-secondary">
                Chat on WhatsApp
              </p>
              <Image
                src={"/svg/whatsapp.svg"}
                width={50}
                height={50}
                alt="whatsapp"
                className="lg:w-18 md:w-12 w-5 h-auto"
              />
            </Link>
          </Button>
          <Button variant="primary" className="lg:w-3xl md:w-xl w-70 group">
            <Link href={"/contact"} className="flex items-center gap-5">
              <p className="lg:text-6xl md:text-4xl text-xl font-galgin text-foreground-secondary">
                Contact Us Now
              </p>
              <IconArrowUpRight className="lg:w-18 md:w-12 w-5 h-auto transform  transition-all duration-300 group-hover:rotate-45" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
