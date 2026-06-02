import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardsSection from "@/components/CardsSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <CardsSection />

      <Footer />
    </main>
  );
}
