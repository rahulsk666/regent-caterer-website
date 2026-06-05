import { features, stats } from "@/lib/data";
import StatItem from "./ui/StatItem";
import FeatureCard from "./ui/FeatureCard";

export default function WhyUsSection() {
  return (
    <section id="why-us" className="container-app py-10">
      <div className="h-full lg:grid lg:grid-cols-2 gap-15">
        <div className="flex flex-col gap-5">
          <p className="font-kapakana text-foreground-golden lg:text-9xl text-7xl">
            Why us
          </p>
          <div>
            <p className="font-red-hat-display lg:text-3xl md:text-lg text-base">
              Combining premium ingredients, refined presentation, and dedicated
              hospitality, Regent Caterers creates memorable dining experiences
              that elevate every celebration and leave a lasting impression on
              guests.
            </p>
          </div>
          <div className="lg:mt-10 space-y-7 grid grid-cols-2 text-foreground-golden items-center justify-center">
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.slice(0, 4).map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
          <div className="text-foreground-golden flex items-center justify-start mx-2">
            <StatItem label="Happy Clients" value="500+" classname="order-5" />
          </div>

          <FeatureCard
            key={features[4].title}
            title={features[4].title}
            description={features[4].description}
          />
        </div>
      </div>
    </section>
  );
}
