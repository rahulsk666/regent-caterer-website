import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { getFeaturedReviews } from "@/lib/db";
import { Review, Testimonial } from "@/lib/types";

export default async function Testimonials() {
  const reviews = await getFeaturedReviews();
  const testomonial: Testimonial[] = reviews.map((review: Review) => {
    return {
      quote: review.review,
      name: review.name,
      rating: review.rating,
      designation: review.designation || "",
      src: review.image || "/images/default-placeholder.jpg",
    };
  });
  console.log(testomonial, "testomonial");

  return <AnimatedTestimonials testimonials={testomonial} />;
}
