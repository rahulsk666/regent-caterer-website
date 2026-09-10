import Image from "next/image";
import React from "react";

export default function AboutSection() {
  return (
    <section id="aboutSection" className="">
      <div className="container-app h-full p-2 md:mt-10 m-7">
        <div className="text-6xl lg:h-20 w-full md:text-9xl font-kapakana text-left text-foreground-golden">
          <h2>About Us</h2>
        </div>
        <div className="lg:my-20 md:mt-10 md:mb-20 my-5 w-full md:w-2/3 ml-auto lg:text-2xl md:text-md text-sm md:text-right">
          <p>
            Since 1996, we have been proudly serving exceptional cuisine paired
            with warm, attentive hospitality. Over the years, our commitment to
            quality, taste, and customer satisfaction has earned the trust of
            clients across India. Based in Thrissur, our passionate and
            dedicated team works tirelessly to create memorable dining
            experiences for every occasion. Whether it&apos;s an intimate
            gathering or a grand celebration, we bring the same dedication,
            authenticity, and excellence to every event we cater.
          </p>
          <p className="font-bold mt-5">
            - Over 30 years of experience, we provide exceptional quality with
            memorable service
          </p>
        </div>
      </div>
      {/* Image side */}
      <div
        className="relative w-full l md:mt-20 mt-5"
        style={{
          backgroundImage: "url(/images/about-us-bg-1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "clamp(250px, 50vw, 500px)",
        }}
      >
        <Image
          src={"/images/about-us-bg-2.webp"}
          alt="About us banner"
          width={500}
          height={500}
          style={{
            width: "clamp(250px, 45vw, 500px)",
          }}
          className="absolute z-1 lg:top-1/7 md:top-1/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-auto object-cover"
        />
      </div>
    </section>
  );
}
