import type { Metadata } from "next";
import "./globals.css";
import {
  galgin,
  kapakana,
  redHatDisplay,
  poppins,
  helmorin,
  monteserrat,
} from "@/lib/font";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import SplashScreen from "@/components/ui/SplashScreen";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE_DEFAULT = "Regent Caterers | Catering Services in Thrissur, Kerala";
const DESCRIPTION =
  "Wedding and event catering in Thrissur, Kerala. Regent Caterers serves multi-cuisine menus, live counters and trained service staff for every celebration.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Regent Caterers",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "no-scrollbar",
        poppins.variable,
        galgin.variable,
        kapakana.variable,
        redHatDisplay.variable,
        helmorin.variable,
        monteserrat.variable,
        "font-sans",
      )}
    >
      <body className="bg-background-base overflow-x-hidden">
        <SplashScreen>{children}</SplashScreen>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
