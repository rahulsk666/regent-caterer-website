import Image from "next/image";
import Link from "next/link";
import HeroContactButtons from "./HeroContactButtons";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex-1 bg-cover"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2)), url('/images/hero-bg.png')`,
      }}
    >
      {/* <Navbar /> */}
      {/* Background Image */}
      {/* <div className="absolute -z-10 inset-0 bg-cover bg-center" /> */}
      <div className="container-app relative z-10 w-full lg:pt-24 md:pt-30 pt-30 px-10 md:gap-2 gap-10 flex flex-col items-center">
        <p className="text-sm font-medium text-white">Quality You Can Trust</p>
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={512}
          height={512}
          loading="eager"
          className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />
        <div className="flex flex-col lg:text-6xl md:text-5xl sm:text-3xl text-2xl tracking-wide whitespace-nowrap leading-none text-white font-semibold font-helmorin">
          <p className="text-center">Regent Catering Service</p>
          <p className="text-center">Excellence in every bite</p>
        </div>
        <p className=" text-lg text-center font-light text-white">
          For over two decades, Regent Caterers has transformed celebrations
          into unforgettable dining experiences with exceptional cuisine,
          professional service, and unwavering commitment to quality.
        </p>
        <div className="flex md:flex-row flex-col items-center mt-4 gap-10">
          <Link
            className="group order-2 md:order-1 text-xl text-white font-medium flex flex-row md:gap-2 gap-1 items-center"
            href={"/services"}
          >
            Explore our Services
            <Image
              src={"/svg/arrow-up-right.svg"}
              alt="Arrow up right"
              width={10}
              height={10}
              className="w-6 h-6 opacity-90 transform group-hover:rotate-45 transition-all duration-300 ease-in-out"
            />
          </Link>
          <Link
            href="/contact"
            className="order-1 md:order-2 flex items-center justify-center rounded-full px-10 py-4 text-2xl font-medium text-foreground-secondary transition-all duration-200 ease-in-out bg-linear-to-br from-white/40 to-white/5 hover:bg-linear-to-bl hover:from-white/40 hover:to-white/5 backdrop-blur-[20px]"
          >
            Book Your Event
          </Link>
        </div>
        <HeroContactButtons />
      </div>
    </section>
  );
}
