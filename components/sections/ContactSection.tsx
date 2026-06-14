import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { DecorativeStar } from "../ui/DecorativeStar";

export default function ContactSection() {
  return (
    <section
      id="contactSection"
      className="relative md:min-h-screen min-h-[700px]"
      style={{
        background: "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2))",
      }}
    >
      <video
        loop
        muted
        autoPlay
        playsInline
        className="absolute -z-10 object-cover w-full h-full"
      >
        <source src="/videos/contact-bg.mp4" type="video/mp4" />
      </video>
      <div className="relative md:h-screen h-[700px] w-full mx-auto flex flex-col lg:gap-20 gap-70  items-center md:justify-center justify-between">
        <DecorativeStar
          alt="star-1"
          className="absoluter lg:w-10 md:w-10 w-10 lg:top-[12%] lg:left-[26%] md:top-[18%] md:left-[15%] top-[15%] left-[5%]  opacity-60"
        />
        <DecorativeStar
          alt="star-2"
          className="absoluter lg:w-4 md:w-4 w-4 lg:top-[11%] lg:left-[28%] md:top-[17%] md:left-[14%] top-[13%] left-[3%]  opacity-40"
        />
        <DecorativeStar
          alt="star-3"
          className="absoluter lg:w-10 md:w-10 w-10 lg:top-[30%] lg:right-[25%] md:top-[32%] md:right-[15%] top-[32%] right-[7%]  opacity-60"
        />
        <DecorativeStar
          alt="star-4"
          className="absoluter lg:w-4 md:w-4 w-4 lg:top-[29%] lg:right-[27%] md:top-[31%] md:right-[19%] top-[30%] right-[5%] opacity-40"
        />

        <p className="text-golden-gradient font-galgin lg:text-6xl md:text-5xl text-3xl md:pt-0 pt-40">
          Let’s plan together
        </p>
        <div className="flex flex-col items-center justify-center my-10 lg:gap-20 md:gap-10 gap-5">
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
