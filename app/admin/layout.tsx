import type { Metadata } from "next";

// Applies to every route under /admin (including the client-component
// /admin/login page, which cannot export metadata itself). robots.ts also
// disallows /admin for crawling; this covers indexing if a URL is ever
// discovered some other way.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
