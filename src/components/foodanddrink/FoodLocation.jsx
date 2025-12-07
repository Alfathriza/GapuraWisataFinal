"use client";

import Image from "next/image";

export default function FoodLocation({
  title = "Location",
  place = "Pasar Legi Kotagede",
  description = "Located near Pasar Legi Kotagede, just 5 minutes from the main gate. Easily accessible by foot from the heritage district center.",
  address = "Jl. Mondorakan, Prenggan, Kotagede",
  phone = "+62 274 123 4567",
  hours = "Daily 08:00 - 18:00",
  image = "/food/location/pasar-legi.jpg",
  mapsUrl = "https://www.google.com/maps?q=Pasar+Legi+Kotagede",
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        {title}
      </h2>
      <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />

      <div className="mt-6 grid gap-6 md:grid-cols-[280px,1fr] items-center">
        {/* Gambar lokasi */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.2)]">
          <Image
            src={image}
            alt={place}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 280px, 100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-yellow-500/80 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.5 10.5C19.5 16 12 21 12 21S4.5 16 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Detail lokasi */}
        <div>
          <h3 className="font-semibold text-lg text-slate-800">{place}</h3>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
            {description}
          </p>

          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <span>📍</span>
              {address}
            </li>
            <li className="flex items-center gap-2">
              <span>🕒</span>
              {hours}
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              {phone}
            </li>
          </ul>

          <button
            onClick={() =>
              window.open(mapsUrl, "_blank", "noopener,noreferrer")
            }
            className="mt-5 inline-block rounded-lg border border-yellow-500 px-5 py-2 text-sm font-medium text-slate-800 hover:bg-yellow-500 hover:text-white transition-colors"
          >
            OPEN IN MAPS
          </button>
        </div>
      </div>
    </section>
  );
}
