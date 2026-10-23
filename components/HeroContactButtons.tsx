import IconButton from "./ui/IconButton";
import { contact } from "@/lib/contact";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row items-center justify-center my-6 gap-3">
      <IconButton
        link={contact.instagramUrl}
        imageSrc="/svg/insta.svg"
        alt="Regent Caterers on Instagram"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.facebookUrl}
        imageSrc="/svg/fb.svg"
        alt="Regent Caterers on Facebook"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.whatsappUrl}
        imageSrc="/svg/whatsapp.svg"
        alt="Chat with Regent Caterers on WhatsApp"
        classname="w-14 h-auto"
      />
      <IconButton
        link={contact.telUrl}
        imageSrc="/svg/phone.svg"
        alt="Call Regent Caterers"
        classname="w-14 h-auto"
      />
    </div>
  );
}
