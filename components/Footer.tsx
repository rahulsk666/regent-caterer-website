import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background-secondary min-h-full">
      <div className="hidden md:flex flex-col container-app py-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col text-foreground-muted mt-5 lg:text-xl text-lg">
            <p className="text-foreground-secondary">Important Links</p>
            <p className="mt-5">Home</p>
            <p>About Us</p>
            <p>Why Us</p>
            <p>Contact Us</p>
            <p>Gallery</p>
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
            <p className="mt-5">Instagram</p>
            <p>Whats App</p>
            <p>Facebook</p>
            <p>Email</p>
            <p>Phone</p>
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
              <p className="mt-5">Home</p>
              <p>About Us</p>
              <p>Why Us</p>
              <p>Contact Us</p>
              <p>Gallery</p>
            </div>
            <div>
              <p className="text-golden-gradient text-xl">Quality You Can</p>
              <p className="text-golden-gradient text-xl">See. Taste. Trust.</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col text-foreground-muted mt-32 text-xl">
              <p className="text-foreground-secondary">Social</p>
              <p className="mt-5">Instagram</p>
              <p>Whats App</p>
              <p>Facebook</p>
              <p>Email</p>
              <p>Phone</p>
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
