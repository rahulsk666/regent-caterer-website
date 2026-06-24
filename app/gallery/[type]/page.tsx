import Header from "@/components/Header";
import ClientGallery from "@/components/ui/Gallery";
import { getSectionImages, getSectionVideos } from "@/lib/db";
import { GalleryType } from "@/lib/types";

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
          {TypeName == "all" ? "All Gallery" : TypeName}
        </h1>

        <ClientGallery images={images.map((img) => img.url)} title={TypeName} />
        <div className="flex items-center justify-center my-6">
          <video
            loop
            muted
            autoPlay
            playsInline
            poster={"/images/hero-bg.png"}
            className="object-cover w-full h-full rounded-3xl shadow-lg"
          >
            <source src={video[0].url} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
