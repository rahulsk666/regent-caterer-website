import Header from "@/components/Header";
import ClientGallery from "@/components/ui/Gallery";
import GalleryCategoryDropdown from "@/components/ui/GalleryCategoryDropdown";
import { getSectionImages, getSectionVideos } from "@/lib/db";
import { GalleryType, galleryTypes } from "@/lib/types";
import Link from "next/link";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  const TypeName = decodeURIComponent(type);

  const images = await getSectionImages(
    "gallery",
    TypeName == "all" ? "none" : (TypeName as GalleryType),
  );
  const video = await getSectionVideos(
    TypeName == "all" ? "none" : (TypeName as GalleryType),
  );

  const categories = [
    { key: "all", label: "All Gallery" },
    ...galleryTypes.filter((item) => item.key !== "none"),
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header variant="dark" />
      {/* <div className="container-app py-[100px]">
        <h1 className="font-galgin text-7xl mt-10 text-center mb-20">
          {TypeName == "all"
            ? "All Gallery"
            : galleryTypes.find((item) => item.key === TypeName)?.label}
        </h1>

        <ClientGallery
          images={images.map((img) => img.url)}
          video={video[0].url}
          title={TypeName}
        />
      </div> */}
      <div className="container-app py-25">
        <h1 className="font-galgin md:text-7xl text-golden-600 text-6xl mt-10 text-center mb-20 ">
          {TypeName === "all"
            ? "All Gallery"
            : galleryTypes.find((item) => item.key === TypeName)?.label}
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
                  {TypeName !== "all" && (
                    <Link
                      key="all"
                      href={`/gallery/all`}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-golden-600 transition hover:bg-golden-50 hover:text-golden-700"
                    >
                      <span>All Gallery</span>
                      <span>→</span>
                    </Link>
                  )}

                  {galleryTypes
                    .filter((item) => item.key !== "none")
                    .map((item) => (
                      <Link
                        key={item.key}
                        href={`/gallery/${item.key}`}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-golden-600 transition hover:bg-golden-50 hover:text-golden-700"
                      >
                        <span>{item.label}</span>
                        <span>→</span>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>

          <main className="flex-1 min-w-0">
            <ClientGallery
              images={images.map((img) => img.url)}
              video={video[0]?.url}
              title={TypeName}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
