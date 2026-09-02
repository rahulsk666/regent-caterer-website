const PHONE = "9876543210";
const WHATSAPP_MESSAGE = "Hi I'd like to know more about your services";
const EMAIL = "regentcaterers@gmail.com";

export const contact = {
  phone: PHONE,
  phoneDisplay: "+91 9876543210",
  email: EMAIL,
  addressLine1: "4/660, Anathadam, Aloor P.O,Thrissur, Kerala",
  addressPin: "Pin: 680683",
  instagramUrl: "https://www.instagram.com/regentcaterers/",
  facebookUrl: "https://www.facebook.com/regentcatering/",
  telUrl: `tel:${PHONE}`,
  mailtoUrl: `mailto:${EMAIL}`,
  whatsappUrl: `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
} as const;
