import Testimonials from "../Testomonials";
import { DecorativeStar } from "../ui/DecorativeStar";

export default function TestomonialsSection() {
  return (
    <section
      id="testimonialsSections"
      className="min-h-full relative py-30 bg-peach-50 overflow-hidden"
    >
      <DecorativeStar
        alt="star-1"
        className="lg:w-5 md:w-5 w-5 h-auto lg:top-[10%] lg:right-[28%] md:top-[12%] md:right-[11%] top-[9%] right-[14%] opacity-40"
      />
      <DecorativeStar
        alt="star-2"
        className="lg:w-12 md:w-10 w-10 h-auto lg:top-[12%] lg:right-[26%] md:top-[14%] md:right-[7%] top-[10%] right-[8%] opacity-60"
      />
      <DecorativeStar
        alt="star-3"
        className="lg:w-12 md:w-11 w-11 h-auto lg:top-[26%] lg:right-[6%] md:top-[45%] md:right-[2%] top-[40%] right-[1%] opacity-40"
      />
      <DecorativeStar
        alt="star-4"
        className="lg:w-52 md:w-30 w-30 h-auto lg:top-[29%] lg:right-[6%] md:top-[45%] md:right-[-9%] top-[41%] right-[-17%] opacity-60"
      />
      <div className="container-app mx-auto">
        <h2 className="lg:text-7xl md:text-6xl text-3xl pt-10 text-foreground-golden font-galgin text-center mb-8">
          What our clients Say
        </h2>
        <Testimonials />
      </div>
      <DecorativeStar
        alt="star-5"
        className="lg:w-7 md:w-9 w-9 h-auto lg:top-[39%] lg:left-[19%] md:top-[42%] md:left-[2%] top-[32%] left-[1%] opacity-40"
      />
      <DecorativeStar
        alt="star-6"
        className="lg:w-7 md:w-30 w-30 h-auto lg:bottom-[19%] lg:right-[50%] md:top-[43%] md:left-[-10%] top-[34%] left-[-17%]  opacity-60 md:opacity-40"
      />
      <DecorativeStar
        alt="star-7"
        className="lg:block hidden lg:w-38 h-auto lg:bottom-[5%] lg:left-[12%] opacity-30"
      />
      <DecorativeStar
        alt="star-8"
        className="lg:block hidden lg:w-10 h-auto lg:bottom-[5%] lg:left-[20%] opacity-40"
      />
    </section>
  );
}
