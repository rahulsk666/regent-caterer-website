import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import AnimatedImageStack from "../ui/AnimatedImageStack";
import Button from "../ui/Button";
import { getSectionImages } from "@/lib/db";
import { SectionImage } from "@/lib/types";
import { DecorativeStar } from "../ui/DecorativeStar";

export default async function SignatureCollectionsSection() {
  const sectionImages = await getSectionImages("signature-collections");
  const images = sectionImages.map((sectionImage: SectionImage) => {
    return sectionImage.image;
  });
  return (
    <section
      id="signatureCollectionsSections"
      className="min-h-full bg-peach-50 overflow-hidden"
    >
      <div className="relative h-full flex flex-col lg:py-15 py-10 ">
        <DecorativeStar
          alt="star-1"
          className="absolute lg:top-[3%] lg:left-[13%] md:top-[3%] md:left-[5%] top-[3%] left-[10%] w-10 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-2"
          className="absolute lg:top-[1%] lg:left-[15%] md:top-[1%] md:left-[9%] top-[1%] left-[17%] w-5 h-auto opacity-40"
        />
        <DecorativeStar
          alt="star-3"
          className="absolute lg:top-[25%] lg:right-[25%] md:top-[36%] md:right-[9%] top-[31%] right-[3%] w-10 h-auto opacity-60"
        />
        <DecorativeStar
          alt="star-4"
          className="absolute lg:top-[23%] lg:right-[27%] md:top-[33%] md:right-[12%] top-[29%] right-[10%] w-5 h-auto opacity-40"
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
        <p className="text-3xl md:text-6xl p-10 text-center font-galgin text-golden-gradient container-app">
          Signature Cultures & Premium <br /> Counter Collections
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
