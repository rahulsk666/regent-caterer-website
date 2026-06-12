import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";
import WhyUsSection from "@/components/sections/WhyUsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestomonialsSection from "@/components/sections/TestomonialsSection";
import DelightFulMomentsSection from "@/components/sections/DelightfulMomentsSection";
import SignatureCollectionsSection from "@/components/sections/SignatureCollectionsSection";
import ContactSection from "@/components/sections/ContactSection";
import CreateReviewSection from "@/components/sections/CreateReviewSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <TestomonialsSection />
      <CreateReviewSection />
      <SignatureCollectionsSection />
      <DelightFulMomentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
