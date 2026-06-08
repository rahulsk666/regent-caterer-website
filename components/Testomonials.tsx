import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The food was absolutely exceptional and beautifully presented. Our guests couldn't stop talking about the menu, and the service was flawless from start to finish.",
      name: "Anjali Nair",
      designation: "Bride, Wedding Reception",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "Their team handled catering for our corporate event with incredible professionalism. Every dish was fresh, flavorful, and served right on schedule.",
      name: "Rahul Menon",
      designation: "HR Manager at Nexa Solutions",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "From the tasting session to the final event, the experience was seamless. The customized menu perfectly reflected our preferences and impressed every guest.",
      name: "Priya Thomas",
      designation: "Birthday Event Host",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "The live food counters were a huge hit at our celebration. The chefs were engaging, and the quality of the food exceeded our expectations.",
      name: "Arjun Krishnan",
      designation: "Event Organizer",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3464&auto=format&fit=crop",
    },
    {
      quote:
        "Outstanding catering service with attention to every detail. The menu variety, presentation, and hospitality made our family function truly memorable.",
      name: "Meera Joseph",
      designation: "Family Event Host",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2592&auto=format&fit=crop",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
