import type { Metadata, Viewport } from "next";
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
import { contact } from "@/lib/contact";

const TITLE_DEFAULT = "Regent Caterers | Catering Services in Thrissur, Kerala";
const DESCRIPTION =
  "Wedding and event catering in Thrissur, Kerala. Regent Caterers serves multi-cuisine menus, live counters and trained service staff for every celebration.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e7ba44",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Regent Caterers",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "caterers in Thrissur",
    "catering services in Thrissur",
    "best caterers in Thrissur",
    "wedding catering in Thrissur",
    "event catering in Thrissur",
    "party catering in Thrissur",
    "catering services Kerala",
    "wedding caterers Thrissur",
    "live food counters Thrissur",
    "dessert catering Thrissur",
    "salad counters catering Kerala",
    "Kerala sadya catering Thrissur",
    "Regent Caterers",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food & catering",
  formatDetection: { telephone: false, email: false, address: false },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": contact.locality,
    "geo.position": `${contact.geo.lat};${contact.geo.lng}`,
    ICBM: `${contact.geo.lat}, ${contact.geo.lng}`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
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
