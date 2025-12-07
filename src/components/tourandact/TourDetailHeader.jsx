"use client";

import Image from "next/image";

export default function TourDetailHeader({
  image,
  title,
  subtitle,
  badges = [],
}) {
  return (
    <section className="container mx-auto px-4 pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-3xl shadow-[0_28px_80px_-30px_rgba(0,0,0,0.45)]">
        {/* media */}
        <div className="relative h-[48vh] md:h-[58vh]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </div>

        {/* text */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="w-full p-5 md:p-8">
            {/* small badges */}
            {badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow"
                  >
                    {b.icon === "calendar" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="2"
                          d="M7 11h10M7 15h7M16 3v4M8 3v4M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                        />
                      </svg>
                    )}
                    {b.icon === "pin" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="2"
                          d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                        />
                      </svg>
                    )}
                    {b.text}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-md">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-white/90 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
