import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
// import CardsSection from "@/components/CardsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import TestomonialsSection from "@/components/TestomonialsSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <TestomonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
