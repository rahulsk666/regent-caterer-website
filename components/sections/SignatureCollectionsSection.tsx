import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import AnimatedImageStack from "../ui/AnimatedImageStack";
import Button from "../ui/Button";

export default function SignatureCollectionsSection() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <section
      id="signature-collections"
      className="min-h-full bg-peach-50 overflow-hidden"
    >
      <div className="h-full flex flex-col lg:py-15 py-10">
        <p className="text-2xl md:text-6xl p-10 text-center font-galgin text-golden-gradient container-app">
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
