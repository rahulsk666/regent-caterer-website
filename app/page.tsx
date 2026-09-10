import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";
import WhyUsSection from "@/components/sections/WhyUsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestomonialsSection from "@/components/sections/TestomonialsSection";
import DelightFulMomentsSection from "@/components/sections/DelightfulMomentsSection";
import ContactSection from "@/components/sections/ContactSection";
import CreateReviewSection from "@/components/sections/CreateReviewSection";
import Header from "@/components/Header";
import ScrollToHash from "@/components/ScrollToHash";
import JsonLd from "@/components/seo/JsonLd";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={homeSchema()} />
      <ScrollToHash />
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <TestomonialsSection />
      <CreateReviewSection />
      <DelightFulMomentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
