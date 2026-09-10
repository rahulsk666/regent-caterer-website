import { baseStyles, buttonVariants } from "../ui/CustomButton";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import AnimatedImageStack from "../ui/AnimatedImageStack";
import { getSectionImages } from "@/lib/db";
import { SectionImage } from "@/lib/types";
import { DecorativeStar } from "../ui/DecorativeStar";

export default async function DelightFulMomentsSection() {
  const sectionImages = await getSectionImages("delightful-moments");
  const images = sectionImages.map((sectionImage: SectionImage) => {
    return sectionImage.url;
  });

  return (
    <section
      id="delightfulMomentsSections"
      className="min-h-full bg-peach-50 overflow-hidden"
    >
      <div className="relative h-full flex flex-col lg:py-15 py-10">
        <DecorativeStar
          alt="star-1"
          className="absolute lg:top-[3%] lg:left-[23%] md:top-[3%] md:left-[5%] top-[3%] left-[10%] w-10 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-2"
          className="absolute lg:top-[1%] lg:left-[25%] md:top-[1%] md:left-[9%] top-[1%] left-[17%] w-5 h-auto opacity-40"
        />
        <DecorativeStar
          alt="star-3"
          className="absolute lg:top-[25%] lg:right-[25%] md:top-[28%] md:right-[11%] top-[24%] right-[10%] w-10 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-4"
          className="absolute lg:top-[23%] lg:right-[27%] md:top-[25%] md:right-[15%] top-[22%] right-[17%] w-5 h-auto opacity-40"
        />
        <DecorativeStar
          alt="star-5"
          className="absolute lg:top-[80%] lg:left-[7%] md:top-[80%] md:left-[7%] top-[75%] left-[-10%] w-20 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-6"
          className="absolute lg:top-[78%] lg:left-[12%] md:top-[78%] md:left-[15%] top-[73%] left-[4%] w-8 h-auto opacity-40"
        />
        <DecorativeStar
          alt="star-7"
          className="absolute md:hidden top-[80%] right-[-10%] w-20 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-8"
          className="absolute md:hidden top-[90%] right-[4%] w-8 h-auto opacity-40"
        />
        <h2 className="text-3xl md:text-6xl p-10 text-center font-galgin text-golden-gradient container-app">
          Delightful Moments <br /> We Shared
        </h2>
        <AnimatedImageStack images={images} />
        <div className="flex items-center justify-center m-10 container-app">
          <Link
            href={"/gallery/elegant-food-counters"}
            className={twMerge(
              baseStyles,
              buttonVariants.custom,
              "group/explore bg-linear-[108deg] from-golden-200 from-0% to-golden-100 to-100% px-20 flex-row gap-2",
            )}
          >
            <p className="text-golden-gradient lg:text-3xl md:text-xl text-lg">
              Explore
            </p>
            <IconArrowUpRight className="lg:w-8 w-6 h-auto text-golden-500 transition-transform group-hover/explore:rotate-45 duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
