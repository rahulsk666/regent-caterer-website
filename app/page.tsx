import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import EventSection from "@/components/EventSection";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <EventSection />
    </main>
  );
}
