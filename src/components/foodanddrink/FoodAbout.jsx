"use client";

import Image from "next/image";

export default function FoodAbout({
  title = "About This Dish",
  image,
  alt = "Dish photo",
  paragraphs = [],
  quote,
}) {
  return (
    <section className="rounded-2xl border border-slate-900/5 bg-white p-5 md:p-6 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.28)]">
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        {title}
      </h2>
      <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />

      <div className="mt-5 grid gap-5 md:grid-cols-[260px,1fr]">
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              sizes="(min-width:768px) 260px, 100vw"
            />
          </div>
        )}

        <div className="space-y-3 text-sm md:text-[15px] leading-6 text-slate-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {quote && (
            <figure className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
              <blockquote className="italic text-slate-800 text-sm">
                “{quote}”
              </blockquote>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
