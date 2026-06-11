import ContactFormV2 from "../ContactFormV2";

export default function ContactSection() {
  return (
    <section
      id="contactSection"
      className="min-h-screen flex items-center justify-center bg-golden-300"
    >
      <div className="container-app grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-5 py-10 w-full items-center">
        <div
          className="
        lg:col-span-2
        flex lg:flex-col flex-row
        justify-center items-center
        gap-2 lg:gap-3
        leading-none
        text-5xl md:text-8xl lg:text-[10vw]
        font-medium font-galgin uppercase
      "
        >
          <p className="lg:w-full lg:text-start text-center hidden lg:block">
            Let&apos;s
          </p>

          <p className="lg:w-full lg:text-end text-center">Get in</p>

          <p className="lg:w-full lg:text-start text-center">Touch</p>
        </div>

        <div className="col-span-1 lg:col-span-2 w-full">
          <ContactFormV2 />
        </div>
      </div>
    </section>
  );
}
