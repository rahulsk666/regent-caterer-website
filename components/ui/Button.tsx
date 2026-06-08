import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const baseStyles =
  "flex items-center justify-center font-medium text-foreground-secondary transition-all duration-200 ease-in-out bg-linear-to-br from-white/40 to-white/5 hover:bg-linear-to-bl hover:from-white/40 hover:to-white/5 backdrop-blur-[20px]";

const buttonVariants = {
  primary: `rounded-full px-6 py-2 text-lg md:px-10 md:py-4 md:text-2xl`,
  rounded: `rounded-full size-10 md:size-12 shrink-0 text-lg md:text-2xl`,
} as const;

type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(baseStyles, buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
