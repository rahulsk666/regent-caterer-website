import Image from "next/image";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
};

export default function FeatureCard({
  title,
  description,
  icon = "/svg/star.svg",
}: FeatureCardProps) {
  return (
    <div className="flex flex-col w-full gap-1 p-3 m-2 shadow-lg rounded-2xl bg-card-background">
      <div className="w-7 m-1">
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <p className="font-bold text-xl text-foreground-golden">{title}</p>

      <p className="text-lg">{description}</p>
    </div>
  );
}
