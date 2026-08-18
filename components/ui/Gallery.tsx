"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ImageLightbox from "./ImageLightBox";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

type Props = {
  images: string[];
  video?: string;
  title: string;
};

function GalleryImageTile({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative aspect-3/4 overflow-hidden rounded-xl cursor-zoom-in"
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-border" />
      )}
      <Image
        src={src}
        alt=""
        width={400}
        height={533}
        priority={index < 4}
        sizes="(max-width: 680px) 50vw, (max-width: 1120px) 33vw, 25vw"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 hover:opacity-90 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function ClientGallery({ images, video, title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useAutoplayVideo();

  const validImages = images.filter(Boolean);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setVideoLoaded(true);
    }
  }, [video]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {validImages.map((src, i) => (
          <GalleryImageTile
            key={i}
            src={src}
            index={i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      {video && (
        <div className="relative my-6 aspect-video w-full overflow-hidden rounded-3xl">
          {!videoLoaded && (
            <div className="absolute inset-0 animate-pulse bg-border" />
          )}
          <video
            ref={videoRef}
            loop
            muted
            autoPlay
            playsInline
            controls={false}
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            x-webkit-airplay="deny"
            tabIndex={-1}
            data-chromeless-video=""
            onLoadedData={() => setVideoLoaded(true)}
            className={`pointer-events-none h-full w-full object-cover shadow-lg transition-opacity duration-300 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      {activeIndex !== null && (
        <ImageLightbox
          images={validImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
          title={title}
        />
      )}
    </>
  );
}
