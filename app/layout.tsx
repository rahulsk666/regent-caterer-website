import type { Metadata } from "next";
import "./globals.css";
import {
  caveat,
  galgin,
  inter,
  kapakana,
  redHatDisplay,
  poppins,
  helmorin,
} from "@/lib/font";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Regent Caterers",
  description: "Premium Catering Crafted for Memorable Celebrations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "no-scrollbar", poppins.variable, caveat.variable, inter.variable, galgin.variable, kapakana.variable, redHatDisplay.variable, helmorin.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background-base overflow-x-hidden">
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
