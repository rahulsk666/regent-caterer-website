import ExpandVideo from "./ExpandVideo";

export default function VideoSection() {
  return (
    // Needs real height so ScrollTrigger has a trigger zone to observe
    <section className="relative h-[200vh]">
      <ExpandVideo />
    </section>
  );
}
