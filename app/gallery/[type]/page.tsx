import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientGallery from "@/components/ui/Gallery";
import GalleryCategoryDropdown from "@/components/ui/GalleryCategoryDropdown";
import { getSectionImages, getSectionVideos } from "@/lib/db";
import { GalleryType, galleryTypes } from "@/lib/types";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const categories = [
  { key: "all", label: "All Gallery" },
  ...galleryTypes.filter((item) => item.key !== "none"),
];

function resolveCategory(typeName: string) {
  if (typeName === "all") return categories[0];
  return categories.find((item) => item.key === typeName);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const typeName = decodeURIComponent(type);
  const category = resolveCategory(typeName);

  if (!category) return {};

  const title =
    typeName === "all" ? "Catering Gallery" : `${category.label} | Catering Gallery`;
  const description =
    typeName === "all"
      ? "Browse our full catering gallery from Regent Caterers, catering weddings and events across Thrissur, Kerala."
      : `Photos of ${category.label.toLowerCase()} from Regent Caterers, catering weddings and events across Thrissur, Kerala.`;

  return {
    title,
    description,
    alternates: { canonical: `/gallery/${typeName}` },
    // See app/contact/page.tsx for why this override is needed.
    openGraph: {
      title: `${title} | Regent Caterers`,
      description,
      url: `/gallery/${typeName}`,
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  const TypeName = decodeURIComponent(type);
  const category = resolveCategory(TypeName);

  if (!category) notFound();

  const galleryType = TypeName === "all" ? "none" : (TypeName as GalleryType);

  const [images, video] = await Promise.all([
    getSectionImages("gallery", galleryType),
    getSectionVideos(galleryType),
  ]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery/all" },
          ...(TypeName !== "all"
            ? [{ name: category.label, path: `/gallery/${TypeName}` }]
            : []),
        ])}
      />
      <Header variant="dark" />
      <div className="container-app py-25">
        <h1 className="font-galgin md:text-7xl text-golden-600 text-6xl mt-10 text-center mb-20 ">
          {category.label}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <GalleryCategoryDropdown
            categories={categories}
            activeType={TypeName}
          />
          <div className="hidden lg:flex gap-8">
            <aside className="w-60 shrink-0">
              <div className="sticky top-28 rounded-3xl border border-border bg-background-elevated p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-semibold">
                  Browse Categories
                </h2>

                <div className="space-y-2">
                  {categories.map((item) => {
                    const isActive = item.key === TypeName;

                    return (
                      <Link
                        key={item.key}
                        href={`/gallery/${item.key}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                          isActive
                            ? "bg-golden-500 text-white"
                            : "text-golden-600 hover:bg-golden-50 hover:text-golden-700"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span>→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>

          <main className="flex-1 min-w-0">
            <ClientGallery
              images={images.map((img) => img.url)}
              video={video[0]?.url}
              title={category.label}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
