import Header from "@/components/Header";
import ClientGallery from "@/components/ui/Gallery";
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
        <h1 className="font-galgin md:text-7xl text-6xl mt-10 text-center mb-20 ">
          {TypeName === "all"
            ? "All Gallery"
            : galleryTypes.find((item) => item.key === TypeName)?.label}
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:hidden mb-8 rounded-2xl border border-border overflow-hidden">
            {TypeName !== "all" && (
              <Link
                key="all"
                href={`/gallery/all`}
                className="flex items-center justify-between px-5 py-4 transition-all duration-200 bg-white hover:bg-golden-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full transition-colors bg-golden-100 text-golden-600">
                    📷
                  </div>

                  <span className={"font-medium text-foreground"}>
                    All Galkery
                  </span>
                </div>

                <span className="transition-transform text-white translate-x-1">
                  →
                </span>
              </Link>
            )}
            {galleryTypes
              .filter((item) => item.key !== "none")
              .map((item, index, arr) => {
                const isActive = TypeName === item.key;

                return (
                  <Link
                    key={item.key}
                    href={`/gallery/${item.key}`}
                    className={`flex items-center justify-between px-5 py-4 transition-all duration-200 ${
                      isActive
                        ? "bg-golden-500 text-white"
                        : "bg-white hover:bg-golden-50"
                    } ${index !== arr.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-golden-100 text-golden-600"
                        }`}
                      >
                        📷
                      </div>

                      <span
                        className={`font-medium ${
                          isActive ? "text-white" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`transition-transform ${
                        isActive
                          ? "text-white translate-x-1"
                          : "text-golden-500 group-hover:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
          </div>
          <div className="hidden lg:flex gap-12">
            <aside className="w-72 shrink-0">
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
