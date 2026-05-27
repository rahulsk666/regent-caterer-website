"use client";

import ImageButton from "./ui/ImageButton";
import Facebook from "./ui/svg/Facebook";
import Instagram from "./ui/svg/Instagram";
import Phone from "./ui/svg/Phone";
import Whatsapp from "./ui/svg/Whatsapp";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row ml-5 md:gap-3 gap-1 mt-6">
      <ImageButton
        classname="md:mx-1"
        component={<Instagram />}
        onClick={() =>
          window.open(
            "https://www.instagram.com/regentcaterers?igsh=dTJkeGN4N3RiOGdl",
            "_blank",
          )
        }
      />
      <ImageButton
        classname="md:mx-1"
        component={<Facebook />}
        onClick={() => window.open("", "_blank")}
      />
      <ImageButton
        classname="md:mx-1"
        component={<Whatsapp />}
        onClick={() => window.open("https://wa.me/919876543210", "_blank")}
      />
      <ImageButton
        classname="md:mx-1"
        component={<Phone />}
        onClick={() => window.open("tel:+919876543210", "_blank")}
      />
    </div>
  );
}
