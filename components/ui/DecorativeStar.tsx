import Image from "next/image";

interface StarProps {
  className: string;
  alt?: string;
}

export function DecorativeStar({ className, alt = "star" }: StarProps) {
  return (
    <Image
      src="/svg/star-single.svg"
      width={200}
      height={200}
      alt={alt}
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
    />
  );
}
