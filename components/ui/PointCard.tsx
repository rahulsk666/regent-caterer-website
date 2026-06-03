import { PointCardProps } from "@/lib/types";

export default function PointCard({ point }: PointCardProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Title */}
      <h3 className="text-center md:text-start text-3xl sm:text-4xl lg:text-5xl font-galgin font-medium text-golden-500 leading-tight">
        {point.title}
      </h3>

      <div className="h-px bg-golden-500 mb-4 md:mb-6" />

      {/* Description */}
      <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-md">
        {point.description}
      </p>
    </div>
  );
}
