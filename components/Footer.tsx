import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <div
      className="relative md:h-[60vh] h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:h-[160vh] h-[200vh] top-[-100vh] bg-background-secondary">
        <div className="md:h-[60vh] h-screen sticky md:top-[160vh] top-[100vh]">
          <FooterContent />
        </div>
      </div>
    </div>
  );
}
