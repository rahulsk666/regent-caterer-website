import Button from "../ui/Button";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import AnimatedImageStack from "../ui/AnimatedImageStack";
import { getSectionImages } from "@/lib/db";
import { SectionImage } from "@/lib/types";

export default async function DelightFulMomentsSection() {
  const sectionImages = await getSectionImages("delightful-moments");
  const images = sectionImages.map((sectionImage: SectionImage) => {
    return sectionImage.image;
  });

  return (
    <section
      id="delightfulMomentsSections"
      className="min-h-full bg-peach-50 overflow-hidden"
    >
      <div className="h-full flex flex-col lg:py-15 py-10">
        <p className="text-3xl md:text-6xl p-10 text-center font-galgin text-golden-gradient container-app">
          Delightful Moments <br /> We Shared
        </p>
        <AnimatedImageStack images={images} />
        <div className="flex items-center justify-center m-10 container-app">
          <Button
            variant="custom"
            className="group/explore bg-linear-[108deg] from-golden-200 from-0% to-golden-100 to-100% px-20"
          >
            <Link
              className="flex flex-row justify-center items-center gap-2"
              href={"/"}
            >
              <p className="text-golden-gradient lg:text-3xl md:text-xl text-xl">
                Explore More
              </p>
              <IconArrowUpRight className="lg:w-8 w-6 h-auto text-golden-500 transition-transform group-hover/explore:rotate-45 duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
