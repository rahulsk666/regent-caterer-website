import { Caveat, Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-poppins",
  style: ["normal", "italic"],
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  style: ["normal"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  style: ["normal"],
});

export const galgin = localFont({
  src: "../fonts/galgin.otf",
  variable: "--font-galgin",
  display: "swap",
});

export const redHatDisplay = localFont({
  src: "../fonts/RedHatDisplay.ttf",
  variable: "--font-red-hat-display",
  display: "swap",
});

export const kapakana = localFont({
  src: "../fonts/Kapakana.ttf",
  weight: "400",
  variable: "--font-kapakana",
  display: "swap",
});

export const helmorin = localFont({
  src: "../fonts/HelmorinRegular.ttf",
  variable: "--font-helmorin",
  display: "swap",
});
