"use client";
import IconButton from "./ui/IconButton";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <IconButton
        link="https://www.instagram.com/regentcaterers?igsh=dTJkeGN4N3RiOGdl"
        imageSrc="/svg/insta.svg"
        alt="instagram"
        classname="w-15 h-15"
      />
      <IconButton
        link=""
        imageSrc="/svg/fb.svg"
        alt="facebook"
        classname="w-15 h-15"
      />
      <IconButton
        link=""
        imageSrc="/svg/whatsapp.svg"
        alt="whatsapp"
        classname="w-15 h-15"
      />
      <IconButton
        link=""
        imageSrc="/svg/phone.svg"
        alt="phone"
        classname="w-15 h-15"
      />
    </div>
  );
}
