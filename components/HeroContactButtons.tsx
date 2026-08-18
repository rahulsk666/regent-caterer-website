import IconButton from "./ui/IconButton";
import { contact } from "@/lib/contact";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row items-center justify-center my-6 gap-3">
      <IconButton
        link={contact.instagramUrl}
        imageSrc="/svg/insta.svg"
        alt="instagram"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.facebookUrl}
        imageSrc="/svg/fb.svg"
        alt="facebook"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.whatsappUrl}
        imageSrc="/svg/whatsapp.svg"
        alt="whatsapp"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.telUrl}
        imageSrc="/svg/phone.svg"
        alt="phone"
        classname="w-14 h-auto"
      />
    </div>
  );
}
