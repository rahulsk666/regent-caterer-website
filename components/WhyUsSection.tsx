import PointCard from "./ui/PointCard";
import { points } from "@/lib/data";

export default function WhyUsSection() {
  return (
    <div className="min-h-screen overflow-hidden container-app md:grid md:grid-cols-2 md:gap-16 md:items-center">
      <div className="md:m-0 my-10 md:py-0 flex flex-col gap-3 md:gap-6">
        <h2 className="text-center text-6xl lg:text-9xl md:text-6xl leading-none font-galgin font-medium text-golden-500">
          Why Us?
        </h2>
      </div>

      <div className="relative flex flex-col gap-5 md:h-full md:items-center">
        {points.map((point) => (
          <PointCard key={point.title} point={point} />
        ))}
      </div>
    </div>
  );
}
