import { features, stats } from "@/lib/data";
import StatItem from "../ui/StatItem";
import FeatureCard from "../ui/FeatureCard";
import Image from "next/image";

export default function WhyUsSection() {
  return (
    <section id="whyUsSection" className="container-app py-10">
      <div className="flex flex-row lg:ml-9 items-center justify-start">
        <div className="px-2">
          <p className="font-kapakana text-foreground-golden md:text-9xl text-6xl">
            Why us
          </p>
        </div>
      </div>
      <div className="bento-grid">
        <div className="item hero">
          <p className="font-red-hat-display lg:text-3xl md:text-lg text-base">
            Combining premium ingredients, refined presentation, and dedicated
            hospitality, Regent Caterers creates memorable dining experiences
            that elevate every celebration and leave a lasting impression on
            guests.
          </p>
        </div>

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`item stat${index + 1} flex items-center justify-start`}
          >
            <StatItem label={stat.label} value={stat.value} />
          </div>
        ))}

        {features.map((feature, index) => (
          <div key={feature.title} className={`item feature${index + 1}`}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}

        <div className="lg:hidden w-20 item star items-center justify-center">
          <Image
            src="/svg/star.svg"
            alt="star"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>
      <div className="lg:hidden flex flex-col gap-4">
        <p className="font-red-hat-display my-5 md:text-xl text-base">
          Combining premium ingredients, refined presentation, and dedicated
          hospitality, Regent Caterers creates memorable dining experiences that
          elevate every celebration and leave a lasting impression on guests.
        </p>
        <div>
          <div className="my-10 p-2 px-5 gap-10 flex flex-col items-center justify-center">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 my-10 items-center justify-center">
          {stats.map((stat) => (
            <div key={stat.label} className={``}>
              <StatItem label={stat.label} value={stat.value} />
            </div>
          ))}
          <div className="">
            <Image
              src="/svg/star.svg"
              alt="star"
              width={20}
              height={20}
              className="w-15 h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
