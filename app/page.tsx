import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <VideoSection />
    </main>
  );
}
