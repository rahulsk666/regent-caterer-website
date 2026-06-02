import SinceBadge from "./ui/svg/SinceBadge";

export default function HeroSection() {
  return (
    <section id="home" className="container-app h-screen flex-1">
      <div className="w-full lg:pt-48 md:pt-40 pt-24 flex flex-col items-center justify-center">
        <p className="lg:text-9xl md:text-7xl text-4xl tracking-wide leading-none font-galgin">
          Regent Caterers
        </p>
        <p className="pt-4">
          <SinceBadge />
        </p>
      </div>
    </section>
  );
}
