import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const baseStyles =
  "flex items-center justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer";

const glassStyles =
  "text-foreground-secondary bg-linear-to-br from-white/40 to-white/5 hover:bg-linear-to-bl hover:from-white/40 hover:to-white/5 backdrop-blur-[20px]";

const buttonVariants = {
  primary: `${glassStyles} rounded-full px-6 py-2 text-lg md:px-10 md:py-4 md:text-2xl`,
  rounded: `${glassStyles} rounded-full size-10 md:size-12 shrink-0 text-lg md:text-2xl`,
  carousel: `group/button h-7 w-7 rounded-full bg-linear-[108deg] from-golden-200 from-0% to-golden-50 to-100%`,
  custom: `px-10 py-4 rounded-full text-2xl text-foreground-secondary`,
  outline: `
    rounded-full
    px-6 py-2
    md:px-10 md:py-4
    border
    border-golden-400/60
    text-golden-400
    bg-transparent
    hover:bg-golden-400/10
    hover:border-golden-300
    hover:text-golden-300
  `,
} as const;

type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(baseStyles, buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
