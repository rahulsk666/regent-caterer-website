import IconButton from "./ui/IconButton";

export default function HeroContactButtons() {
  return (
    <div className="flex flex-row items-center justify-center my-6 gap-3">
      <IconButton
        link="https://www.instagram.com/regentcaterers?igsh=dTJkeGN4N3RiOGdl"
        imageSrc="/svg/insta.svg"
        alt="instagram"
        classname="w-14 h-auto"
      />
      <IconButton
        link="https://www.facebook.com/regentcatering/"
        imageSrc="/svg/fb.svg"
        alt="facebook"
        classname="w-14 h-auto"
      />
      <IconButton
        link="https://wa.me/9495559777?text=Hi%20I'd%20like%20to%20know%20more%20about%20your%20services"
        imageSrc="/svg/whatsapp.svg"
        alt="whatsapp"
        classname="w-14 h-auto"
      />
      <IconButton
        link="tel:9495559777"
        imageSrc="/svg/phone.svg"
        alt="phone"
        classname="w-14 h-auto"
      />
    </div>
  );
}
