"use client";

import Image from "next/image";

export default function FoodGallery({
  title = "Gallery",
  images = [], // [{ src, alt }]
}) {
  if (!images?.length) return null;

  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        {title}
      </h2>
      <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />

      {/* Masonry dengan CSS columns */}
      <div className="mt-5 columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((img, i) => (
          <figure
            key={i}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.2)]"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: img.ratio || "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.alt || "Food photo"}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                priority={i < 2}
              />
            </div>
            {img.caption && (
              <figcaption className="px-3 py-2 text-xs text-slate-600">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
