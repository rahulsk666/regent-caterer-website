import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-secondary min-h-full">
      <div className="hidden md:flex flex-col container-app py-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col text-foreground-muted mt-5 lg:text-xl text-lg">
            <p className="text-foreground-secondary">Important Links</p>
            <Link
              href="/#homeSection"
              className="mt-5 transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Home
            </Link>
            <Link
              href="/#aboutSection"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              About Us
            </Link>
            <Link
              href="/#whyUsSection"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Why Us
            </Link>
            <Link
              href="/#contactSection"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/#signatureCollectionsSections"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Gallery
            </Link>
          </div>
          <Image
            src={"/svg/logo.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="lg:w-70 w-50 h-auto object-contain"
          />
          <div className="flex flex-col text-foreground-muted mt-10 lg:text-xl text-lg">
            <p className="text-foreground-secondary">Social</p>
            <Link
              href="https://www.instagram.com/regentcaterers/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Instagram
            </Link>
            <Link
              href="https://wa.me/919876543210?text=Hi%20I'd%20like%20to%20know%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Whats App
            </Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Facebook
            </Link>
            <Link
              href="mailto:hello@example.com"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Email
            </Link>
            <Link
              href="tel:9876543210"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
            >
              Phone
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 gap-3">
          <p className="lg:text-3xl text-2xl text-golden-gradient">
            Quality You Can See. Taste. Trust.
          </p>
          <p className="lg:text-9xl text-7xl pb-4 font-galgin text-golden-gradient underline decoration-3 underline-offset-8">
            Regent Caterers
          </p>
        </div>
        <div className="flex flex-row justify-between mt-5 text-sm text-foreground-secondary">
          <p>regentcaterers@gmail.com</p>
          <p>
            ©{new Date().getFullYear()} Regent Caterers. All rights reserved.
          </p>
          <p>+9876543210</p>
        </div>
      </div>
      <div className="flex flex-col md:hidden min-h-full py-5">
        <div className="flex flex-row gap-10 mt-12 container-app">
          <Image
            src={"/svg/logo.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="w-25 h-auto object-contain"
          />
          <p className="text-5xl font-galgin text-golden-gradient">
            Regent Caterers
          </p>
        </div>
        <div className="flex flex-row justify-between mt-10 container-app">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col text-foreground-muted mt-5 text-xl">
              <p className="text-foreground-secondary">Important Links</p>
              <Link
                href="#homeSection"
                as={"/"}
                className="mt-5 transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Home
              </Link>
              <Link
                href="#aboutSection"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                About Us
              </Link>
              <Link
                href="#whyUsSection"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Why Us
              </Link>
              <Link
                href="#contactSection"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Contact Us
              </Link>
              <Link
                href="#signatureCollectionsSections"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Gallery
              </Link>
            </div>
            <div>
              <p className="text-golden-gradient text-xl">Quality You Can</p>
              <p className="text-golden-gradient text-xl">See. Taste. Trust.</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col text-foreground-muted mt-32 text-xl">
              <p className="text-foreground-secondary">Social</p>
              <Link
                href="https://www.instagram.com/regentcaterers/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Instagram
              </Link>
              <Link
                href="https://wa.me/919876543210?text=Hi%20I'd%20like%20to%20know%20more%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Whats App
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Facebook
              </Link>
              <Link
                href="mailto:hello@example.com"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Email
              </Link>
              <Link
                href="tel:9876543210"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-white hover:-translate-y-0.5 inline-block"
              >
                Phone
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[3px] w-full bg-foreground-golden mt-10" />
        <div className="flex flex-col gap-3 justify-center items-center mt-5 py-3 text-sm text-foreground-secondary container-app">
          <p>+9876543210</p>
          <p>regentcaterers@gmail.com</p>
          <p className="text-foreground-muted">
            ©{new Date().getFullYear()} Regent Caterers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
