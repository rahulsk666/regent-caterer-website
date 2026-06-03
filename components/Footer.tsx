import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <div
      className="relative md:h-[65vh] h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:h-[165vh] h-[200vh] top-[-100vh] bg-background-secondary">
        <div className="sticky md:h-[65vh] h-screen md:top-[35vh] top-0">
          <FooterContent />
        </div>
      </div>
    </div>
  );
}
