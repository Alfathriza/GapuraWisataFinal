"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Props:
 * - hero: string (path gambar)
 * - title: string
 * - subtitle?: string
 * - badges?: Array<{ icon?: "calendar"|"pin"|"users"|"ticket", text: string }>
 */
export default function EventHero({ hero, title, subtitle, badges = [] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="
          relative overflow-hidden rounded-2xl bg-black/10
          shadow-[0_18px_60px_-24px_rgba(0,0,0,0.35)]
        "
      >
        {/* Gambar hero */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6]">
          <Image
            src={hero}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1280px) 90vw, 1200px"
          />
          {/* Overlay untuk kontras teks */}
          <div
            aria-hidden
            className="
              absolute inset-0
              bg-gradient-to-t from-black/70 via-black/20 to-transparent
            "
          />
        </div>

        {/* Konten teks di bawah kiri */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-5 sm:p-7 md:p-9">
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-2 max-w-3xl text-white/90 text-sm sm:text-base leading-relaxed drop-shadow">
                {subtitle}
              </p>
            ) : null}

            {/* Badges */}
            {badges?.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {badges.map((b, i) => (
                  <Badge key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Badge({ icon = "calendar", text }) {
  return (
    <span
      className="
        inline-flex items-center gap-2 rounded-full
        bg-white/90 px-3 py-1.5 text-[12px] text-slate-800
        shadow-sm backdrop-blur
      "
    >
      <Icon name={icon} className="h-4 w-4 text-yellow-600" />
      {text}
    </span>
  );
}

function Icon({ name, className = "h-4 w-4" }) {
  switch (name) {
    case "pin":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeWidth="2"
            d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" strokeWidth="2" />
          <path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path strokeWidth="2" d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "ticket":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeWidth="2"
            d="M3 9a3 3 0 0 0 0 6v4a2 2 0 0 0 2 2h8l8-8-8-8H5a2 2 0 0 0-2 2v4z"
          />
          <path strokeWidth="2" d="M7 7h0M9 9h0M11 11h0M13 13h0M15 15h0" />
        </svg>
      );
    default:
      // calendar
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeWidth="2"
            d="M16 2v4M8 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
          />
        </svg>
      );
  }
}
