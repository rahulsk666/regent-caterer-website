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
    <div className="flex flex-col lg:h-full lg:w-full md:w-[50vh] w-[40vh] h-[25vh] gap-1 p-4 m-2 shadow-lg rounded-2xl bg-card-primary">
      <div className="m-1">
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="w-8 h-8 object-contain"
        />
      </div>

      <p className="font-bold lg:text-xl text-xl whitespace-nowrap  text-foreground-primary">
        {title}
      </p>

      <p className="lg:text-lg">{description}</p>
    </div>
  );
}
