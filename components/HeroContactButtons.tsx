"use client";

import ImageButtons from "./ImageButtons";
import Facebook from "./ui/Facebook";
import Instagram from "./ui/Instagram";
import Phone from "./ui/Phone";
import Whatsapp from "./ui/Whatsapp";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row md:gap-3 gap-1co mt-6">
      <ImageButtons
        classname="md:mx-1"
        component={<Instagram />}
        onClick={() =>
          window.open(
            "https://www.instagram.com/regentcaterers?igsh=dTJkeGN4N3RiOGdl",
            "_blank",
          )
        }
      />
      <ImageButtons
        classname="md:mx-1"
        component={<Facebook />}
        onClick={() => window.open("", "_blank")}
      />
      <ImageButtons
        classname="md:mx-1"
        component={<Whatsapp />}
        onClick={() => window.open("https://wa.me/919876543210", "_blank")}
      />
      <ImageButtons
        classname="md:mx-1"
        component={<Phone />}
        onClick={() => window.open("tel:+919876543210", "_blank")}
      />
    </div>
  );
}
