import Image from "next/image";
import { twMerge } from "tailwind-merge";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
  className?: string;
};

export default function FeatureCard({
  title,
  description,
  icon = "/svg/star.svg",
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={twMerge(
        className,
        "absolute lg:relative inset-x-0 lg:inset-auto flex flex-col gap-1 p-4 shadow-lg rounded-2xl bg-dark-200 lg:h-full lg:w-full md:w-[50vh] md:h-[20vh] w-[35vh] h-[25vh]",
      )}
    >
      <div className="m-1">
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="w-10 h-10 md:w-8 md:h-8 object-contain"
        />
      </div>

      <p className="font-bold lg:text-xl text-xl whitespace-nowrap text-foreground-primary">
        {title}
      </p>

      <p className="lg:text-lg text-base">{description}</p>
    </div>
  );
}
