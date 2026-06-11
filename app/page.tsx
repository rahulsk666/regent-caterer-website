import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";
import WhyUsSection from "@/components/sections/WhyUsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestomonialsSection from "@/components/sections/TestomonialsSection";
import DelightFulMomentsSection from "@/components/sections/DelightfulMomentsSection";
import SignatureCollectionsSection from "@/components/sections/SignatureCollectionsSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <TestomonialsSection />
      <SignatureCollectionsSection />
      <DelightFulMomentsSection />
      <Footer />
    </main>
  );
}
