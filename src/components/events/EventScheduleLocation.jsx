"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Props:
 * - title?: string
 * - schedule?: Array<{ time: string, title: string, desc?: string }>
 * - location?: {
 *     name: string, address?: string,
 *     img?: string, // opsional gambar map/venue
 *   }
 *
 * Catatan:
 * Jika kamu hanya punya format lama { day, date, items:[] },
 * kamu bisa mapping dulu di page.jsx menjadi array {time,title,desc}.
 */

export default function EventScheduleLocation({
  title = "Event Schedule & Location",
  schedule = [],
  location = {},
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      {/* heading */}
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-slate-900">
          {title}
        </h2>
        <div className="mt-2 h-[3px] w-16 rounded-full bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* left timeline */}
        <motion.ol
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          {/* garis vertikal */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-yellow-200"
          />
          {schedule.map((it, idx) => (
            <li key={idx} className="relative pl-16 pb-5 last:pb-0">
              {/* titik di garis */}
              <span className="absolute left-3 top-2 inline-grid place-items-center h-6 w-6 rounded-full bg-white border border-yellow-300 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              </span>

              <div className="flex items-start gap-4">
                {/* waktu */}
                <p className="w-16 -ml-16 pt-1 text-sm font-medium text-slate-700">
                  {it.time}
                </p>

                {/* kartu konten */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-slate-900 font-semibold">{it.title}</p>
                  {it.desc ? (
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {it.desc}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </motion.ol>

        {/* right location card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.06 }}
          className="relative rounded-2xl overflow-hidden border border-yellow-200 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.25)]"
        >
          <div className="relative aspect-[4/3]">
            {location?.img ? (
              <Image
                src={location.img}
                alt={location.name || "location"}
                fill
                className="object-cover opacity-90"
                sizes="(max-width:1024px) 100vw, 50vw"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400">
                Map placeholder
              </div>
            )}

            {/* pin */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-grid place-items-center h-10 w-10 rounded-full bg-white/90 shadow-md">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-yellow-600"
                fill="currentColor"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 10.3a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6z" />
              </svg>
            </span>

            {/* label venue */}
            <div className="absolute left-4 right-4 bottom-4 rounded-xl border border-yellow-200 bg-white/95 backdrop-blur p-4 shadow">
              <p className="font-semibold text-slate-900">
                {location?.name || "Kotagede Heritage District"}
              </p>
              <p className="text-sm text-slate-600">
                {location?.address ||
                  "Main venue: Alun alun Kotagede, Yogyakarta"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
