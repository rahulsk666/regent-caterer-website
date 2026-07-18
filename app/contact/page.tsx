import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactForm from "@/components/ui/ContactForm";
import { DecorativeStar } from "@/components/ui/DecorativeStar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Regent Caterers - Contact Us",
};

const ContactPage = () => {
  return (
    <div className="flex-1 space-y-4">
      {/* Page Header */}
      <Header variant="dark" />
      {/* Main Content */}
      <section id="contactSection" className="min-h-full container-app">
        <div className="min-h-full md:gap-30 grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 lg:pt-40 md:pt-30 pt-20 md:pb-20 pb-5 md:items-center justify-center">
          <div className="flex flex-col gap-2">
            <p className="font-galgin text-golden-gradient text-3xl lg:text-8xl md:text-5xl">
              Contact Us
            </p>
            <p className="lg:text-2xl md:text-xl text-sm font-monteserrat font-normal">
              {/* Feel free to contact us and We will get back to you as soon as we
              can */}
              Feel free to contact us. Make a booking and relax. Our dedicated
              team will take care of the rest.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <ContactForm />
            </div>
          </div>
          <div className="flex flex-col lg:pt-40 md:pt-20 gap-20 p-2 relative">
            <div className="relative md:block hidden">
              <DecorativeStar
                alt="star-1"
                className="md:block absolute hidden lg:w-46 md:w-24 h-auto bottom-[0%] left-[35%] opacity-80"
              />
              <DecorativeStar
                alt="star-2"
                className="md:block hidden lg:w-12 w-8 h-auto bottom-[0%] left-[35%] opacity-60"
              />
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-2xl lg:text-5xl md:text-3xl font-galgin text-golden-gradient">
                  Visit Us
                </p>
                <p className="text-base lg:text-lg font-monteserrat font-medium">
                  Moonlight Building, Mukkom Road Areekode, Malappuram,
                  <br />
                  Pin: 673639
                </p>
              </div>
              <div>
                <p className="text-2xl lg:text-5xl md:text-3xl font-galgin text-golden-gradient">
                  Talk To Us
                </p>
                <p className="text-base lg:text-lg font-monteserrat font-medium">
                  +91 9876543210
                </p>
                <p className="text-base lg:text-lg font-monteserrat font-medium">
                  regentcaterers@gmail.com
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Link href={"/"}>
                  <Image
                    src={"/svg/whatsapp.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="w-10 h-auto"
                  />
                </Link>
                <Link href={"/"}>
                  <Image
                    src={"/svg/insta.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="w-10 h-auto"
                  />
                </Link>
                <Link href={"/"}>
                  <Image
                    src={"/svg/fb.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="w-10 h-auto"
                  />
                </Link>
                <Link href={"/"}>
                  <Image
                    src={"/svg/phone.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="w-10 h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
