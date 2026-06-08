import React from "react";
import Testimonials from "./Testomonials";

export default function TestomonialsSection() {
  return (
    <section
      id="testimonials"
      className="min-h-fit container-app justify-center items-center"
    >
      <div className="mx-auto my-20">
        <h2 className="lg:text-7xl md:text-6xl text-3xl text-foreground-golden  font-galgin text-center mb-8">
          What our clients Say
        </h2>
        <Testimonials />
      </div>
    </section>
  );
}
