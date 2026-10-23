// Renders a JSON-LD <script> tag. Server component by default (no "use
// client" here), so it renders from each page.tsx directly rather than the
// root layout — keeping it clear of the SplashScreen client boundary.
//
// The replace() below follows Next's own recommendation
// (see: How to implement JSON-LD in your Next.js application) to prevent
// the payload from breaking out of the <script> tag via a literal "</".
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
