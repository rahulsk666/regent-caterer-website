import BookButton from "./BookButton";
import ExpandVideo from "./ExpandVideo";
import HeroContactButtons from "./HeroContactButtons";

export default function VideoSection() {
  return (
    <section className="relative h-[150vh]">
      <div className="container-app">
        <BookButton />
        <HeroContactButtons />
      </div>
      <ExpandVideo />
    </section>
  );
}
