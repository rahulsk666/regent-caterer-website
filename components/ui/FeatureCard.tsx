import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
  className?: string;
  url?: string;
};

export default function FeatureCard({
  title,
  description,
  icon = "/svg/star.svg",
  className = "",
  url = "",
}: FeatureCardProps) {
  return (
    <Link
      href={url}
      className={twMerge(
        className,
        "relative flex flex-col lg:gap-2 gap-4 p-4 shadow-lg rounded-2xl bg-card-background lg:h-full lg:w-full",
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

      <p className="font-bold text-xl whitespace-nowrap text-foreground-primary">
        {title}
      </p>

      <p className="lg:text-lg text-xl pr-2 pb-5">{description}</p>
    </Link>
  );
}
