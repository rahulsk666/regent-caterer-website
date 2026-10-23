import { Montserrat, Poppins } from "next/font/google";
import localFont from "next/font/local";

// style: ["normal"] only — the italic axis is unused anywhere in the app
// (verified: zero `italic` classNames), so requesting it just downloads
// three font files nobody renders.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-poppins",
  style: ["normal"],
  display: "swap",
});

export const monteserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-monteserrat",
  style: ["normal"],
});

export const galgin = localFont({
  src: "../fonts/galgin.woff2",
  variable: "--font-galgin",
  display: "swap",
});

export const redHatDisplay = localFont({
  src: "../fonts/RedHatDisplay.woff2",
  variable: "--font-red-hat-display",
  display: "swap",
});

export const kapakana = localFont({
  src: "../fonts/Kapakana.woff2",
  weight: "400",
  variable: "--font-kapakana",
  display: "swap",
});

export const helmorin = localFont({
  src: "../fonts/HelmorinRegular.woff2",
  variable: "--font-helmorin",
  display: "swap",
});
