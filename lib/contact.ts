const PHONE = "9998263267";
const WHATSAPP_MESSAGE = "Hi I'd like to know more about your services";
const EMAIL = "regentcaterers@gmail.com";

export const contact = {
  phone: PHONE,
  phoneDisplay: "+91 9998263267",
  email: EMAIL,
  addressLine1: "4/660, Anathadam, Aloor P.O, Thrissur, Kerala",
  addressPin: "Pin: 680683",
  // Structured components of the same address, for JSON-LD (lib/schema.ts).
  // Keep in sync with addressLine1/addressPin above.
  streetAddress: "4/660, Anathadam, Aloor P.O",
  locality: "Thrissur",
  region: "Kerala",
  postalCode: "680683",
  countryCode: "IN",
  geo: { lat: 10.346088, lng: 76.302047 },
  instagramUrl: "https://www.instagram.com/regentcaterers/",
  facebookUrl: "https://www.facebook.com/regentcatering/",
  telUrl: `tel:${PHONE}`,
  mailtoUrl: `mailto:${EMAIL}`,
  // wa.me requires the country code; the number alone only resolves for
  // users whose device locale already assumes +91.
  whatsappUrl: `https://wa.me/91${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
} as const;
