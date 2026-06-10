import Image from "next/image";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: string;
  index?: number;
};

export default function FeatureCard({
  title,
  description,
  icon = "/svg/star.svg",
}: FeatureCardProps) {
  return (
    <div className="feature-card sticky top-0 lg:relative flex flex-col lg:h-full lg:w-full md:w-[50vh] md:h-[20vh] w-[35vh] h-[25vh] gap-1 p-4 m-2 shadow-lg rounded-2xl bg-card-primary">
      <div className="m-1">
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="w-10 h-10 md:w-8 md:h-8 object-contain"
        />
      </div>

      <p className="font-bold lg:text-xl text-xl whitespace-nowrap  text-foreground-primary">
        {title}
      </p>

      <p className="lg:text-lg text-base">{description}</p>
    </div>
  );
}
