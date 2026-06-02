import Link from "next/link";
import Logo from "./ui/svg/Logo";

export default function Navbar() {
  return (
    <nav
      id="Header"
      className="py-3 m-2 container-app flex flex-row justify-center items-center"
    >
      {/* <Link href="/">
        <Logo />
      </Link> */}
      <div className="hidden md:flex flex-row lg:gap-8 md:gap-2 gap-1 lg:text-xl md:text-base text-xs text-black font-medium">
        <Link
          href="/"
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Home
        </Link>
        {/* <Link
          href=""
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Our Specialties
        </Link> */}
        <Link
          href=""
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Events
        </Link>
        <Link
          href=""
          className="hover:underline hover:underline-offset-8 hover:text-golden-500"
        >
          Reviews
        </Link>
        <Link
          href=""
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
