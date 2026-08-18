import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fixed scatter angles for stacked-card layouts. Deterministic by index so the
// SSR and client renders agree — Math.random() here causes hydration mismatch.
const STACK_ROTATIONS = [
  -8, 5, -3, 9, -6, 2, -10, 7, -1, 4,
  -5, 10, -7, 3, -9, 6, -2, 8, -4, 1,
];

export function stackRotation(index: number) {
  return STACK_ROTATIONS[index % STACK_ROTATIONS.length];
}
