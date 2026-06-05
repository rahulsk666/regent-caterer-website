import Image from "next/image";
import React from "react";

export default function AboutSection() {
  return (
    <section className="">
      <div className="container-app h-full p-2 md:mt-10 m-7">
        <div className="text-7xl lg:h-20 w-full md:text-9xl font-kapakana text-left text-foreground-golden">
          <p>About Us</p>
        </div>
        <div className="lg:my-20 md:mt-10 md:mb-20 my-5 w-full md:w-2/3 ml-auto text-sm lg:text-3xl md:text-xl text-right font-red-hat-display">
          <p>
            At Regent Caterers, we believe food is more than a meal. It is the
            centerpiece of every celebration. We combine authentic flavors,
            premium ingredients, elegant presentation, and professional
            hospitality to create unforgettable catering experiences tailored
            for every occasion. Whether it&apos;s a wedding, engagement,
            corporate gathering, birthday celebration, or family event, our
            focus remains the same
          </p>
          <p className="font-bold mt-5">
            - Exceptional quality with memorable service
          </p>
        </div>
      </div>
      {/* Image side */}
      <div className="relative w-full h-full md:mt-20 mt-5">
        <Image
          src={"/images/about-us-bg-2.png"}
          alt="About us banner"
          width={1920}
          height={1080}
          className="absolute z-1 lg:top-1/7 md:top-1/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[35%] w-[50%]  object-cover"
        />
        <Image
          src={"/images/about-us-bg-1.png"}
          alt="About us background"
          width={1920}
          height={1080}
          className="relative w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
