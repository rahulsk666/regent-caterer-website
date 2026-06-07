import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = {
  primary:
    "flex items-center justify-center rounded-full px-10 py-4 text-2xl font-medium text-foreground-secondary transition-all duration-200 ease-in-out bg-linear-to-br from-white/40 to-white/5 hover:bg-linear-to-bl hover:from-white/40 hover:to-white/5 backdrop-blur-[20px]",
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
      className={twMerge(buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
