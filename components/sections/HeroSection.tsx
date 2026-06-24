import Image from "next/image";
import Link from "next/link";
import HeroContactButtons from "../HeroContactButtons";
import Button from "../ui/CustomButton";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex-1 py-20 bg-cover min-h-screen items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.2)), url('/images/hero-bg.png')`,
      }}
    >
      <div className="container-app relative z-10 w-full p-10 lg:gap-2 gap-5 flex flex-col items-center justify-center">
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
            className="group order-2 md:order-1 text-xl text-white font-medium flex flex-row md:gap-2 gap-1 items-center cursor-pointer"
            href={"/#whyUsSection"}
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
          <Button variant="primary" className="order-1 md:order-2">
            <Link href={"/contact"}>Book Your Event</Link>
          </Button>
        </div>
        <HeroContactButtons />
      </div>
    </section>
  );
}
