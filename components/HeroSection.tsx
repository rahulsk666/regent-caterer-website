import Image from "next/image";
import Link from "next/link";
import HeroContactButtons from "./HeroContactButtons";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex-1">
      {/* <Navbar /> */}
      {/* Background Image */}
      <div className="absolute -z-10 inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
      <div className="container-app relative z-10 w-full lg:pt-24 md:pt-30 pt-30 px-10 md:gap-5 gap-10 flex flex-col items-center">
        <p className="text-sm font-medium text-white">Quality You Can Trust</p>
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={512}
          height={512}
          className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />
        <div className="flex flex-col lg:text-6xl md:text-5xl sm:text-2xl text-xl tracking-wide whitespace-nowrap leading-none text-white font-semibold font-helmorin">
          <p className="text-center">Regent Catering Service</p>
          <p className="text-center">Excellence in every bite</p>
        </div>
        <p className="lg:text-lg md:text-base text-sm text-center font-light text-white">
          For over two decades, Regent Caterers has transformed celebrations
          into unforgettable dining experiences with exceptional cuisine,
          professional service, and unwavering commitment to quality.
        </p>
        <div className="flex md:flex-row flex-col items-center mt-4 gap-10">
          <Link
            className="order-2 md:order-1 text-xl text-white font-medium flex flex-row md:gap-2 gap-1 items-center"
            href={"/services"}
          >
            Explore our Services
            <Image
              src={"/svg/arrow-up-right.svg"}
              alt="Arrow up right"
              width={10}
              height={10}
              className="w-6 h-6 opacity-90"
            />
          </Link>
          <div className="order-1 md:order-2 bg-white/45 text-foreground-secondary hover:bg-white/70 hover:text-foreground-primary/60 transition-all duration-300 backdrop-blur-xs flex items-center justify-center px-5 py-1 rounded-2xl">
            <Link className="text-2xl font-medium" href={"/contact"}>
              Book You Event
            </Link>
          </div>
        </div>
        <HeroContactButtons />
      </div>
    </section>
  );
}
