import Header from "@/components/Header";
import ClientGallery from "@/components/ui/Gallery";
import { getSectionImages, getSectionVideos } from "@/lib/db";
import { GalleryType, galleryTypes } from "@/lib/types";

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
      <div className="container-app py-[100px]">
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
      </div>
    </div>
  );
}
