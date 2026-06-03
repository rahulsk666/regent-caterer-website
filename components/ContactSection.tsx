import ContactFormV2 from "./ContactFormV2";

export default function ContactSection() {
  return (
    <section
      id="contactSection"
      className="h-screen flex items-center justify-center bg-golden-300"
    >
      <div className="container-app grid lg:grid-cols-4 lg:grid-rows-1 grid-rows-3 grid-cols-1 lg:gap-4 gap-10 py-4 lg:h-[90%] h-full w-full justify-center items-center">
        <div className="flex lg:flex-col flex-row w-full gap-2 mx-2 lg:gap-10 lg:col-span-2 lg:row-span-1 row-span-1 col-span-1 leading-none whitespace-nowrap text-[10vw] font-medium font-galgin uppercase justify-center items-center">
          <p className="lg:w-full lg:text-start text-center lg:block hidden">
            Let&apos;s
          </p>
          <p className="lg:w-full lg:text-end text-center">Get in </p>
          <p className="lg:w-full lg:text-start text-center">Touch</p>
        </div>
        <div className="md:col-span-2 lg:grid-rows-1 lg:row-span-1 rows-span-2 col-span-2 self-center">
          <ContactFormV2 />
        </div>
      </div>
    </section>
  );
}
