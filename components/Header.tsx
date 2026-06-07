import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav
      id="Header"
      className="container-app flex flex-row justify-center items-center"
    >
      <div className="m-2 p-4 hidden lg:flex flex-row justify-center items-center w-full gap-8 text-lg text-foreground-secondary font-medium bg-linear-to-br from-white/20 to-white/5 backdrop-blur-[20px] rounded-2xl">
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Menu
        </Link>
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Services
        </Link>
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Home
        </Link>
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={512}
          height={512}
          loading="eager"
          className="w-10 h-auto"
        />
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Why Us
        </Link>
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Gallery
        </Link>
        <Link
          href="/contact"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
