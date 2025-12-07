// src/components/tourandact/TourItinerary.jsx
"use client";

import React from "react";

/**
 * Props:
 * - title?: string  -> judul section, default "Itinerary"
 * - items: Array<{ id?: string|number, title: string, minutes?: number, description?: string }>
 * - className?: string
 */
export default function TourItinerary({
  title = "Itinerary",
  items = [],
  className = "",
}) {
  return (
    <section className={`w-full ${className}`}>
      {/* Heading */}
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        {" "}
        {title}{" "}
      </h2>
      <div
        className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500"
        aria-hidden
      />

      {/* Timeline */}
      <ol className="relative mt-6">
        {/* garis vertikal */}
        <span
          aria-hidden
          className="absolute left-[18px] top-0 h-full w-[2px] bg-slate-200"
        />

        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="relative pl-16 pb-6 last:pb-0">
            {/* bullet nomor */}
            <span
              className="
                absolute left-0 top-0 grid h-9 w-9 place-items-center
                rounded-full border border-slate-200 bg-white text-xs font-semibold
                text-slate-700 shadow-sm
              "
            >
              {idx + 1}
            </span>

            {/* card konten */}
            <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold text-slate-900">{it.title}</h3>
                {it.minutes ? (
                  <span className="text-xs text-slate-500">
                    • {it.minutes} min
                  </span>
                ) : null}
              </div>
              {it.description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {it.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
