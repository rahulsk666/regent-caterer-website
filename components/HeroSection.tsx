import SinceBadge from "./ui/svg/SinceBadge";

export default function HeroSection() {
  return (
    <section className="container-app lg:mt-28 mt-12 flex flex-col gap-2">
      <div className="flex items-center justify-center relative">
        <p className="lg:text-7xl text-[50px] leading-none font-galgin">
          Premium Catering Crafted for Memorable Celebrations
        </p>
        <div className="absolute right-29 top-16 hidden lg:block">
          <SinceBadge />
        </div>
      </div>
      <p className="lg:text-2xl text-base mt-5">
        From intimate gatherings to grand celebrations, Regent Caterers delivers
        elegant dining experiences with exceptional quality, refined
        presentation, and service your guests will remember.
      </p>
    </section>
  );
}
