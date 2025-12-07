"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WhatsOnHero({
  featured = {
    title: "Explore Kotagede Heritage Event",
    blurb:
      "Discover stories behind the ancient walls of Yogyakarta’s silver city.",
    img: "/whatson/pawaiperak.png", // ganti sesuai asetmu
    href: "/whats-on/heritage-walk-kotagede",
  },
}) {
  return (
    <section className="container mx-auto px-4 pt-10 md:pt-14">
      {/* Heading + subheading */}
      <header className="text-center">
        <h1 className="font-display text-3xl md:text-5xl text-slate-900">
          What&apos;s On <span className="whitespace-nowrap">Kotagede</span>
        </h1>
        <div
          className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-yellow-500/80"
          aria-hidden
        />
        <p className="mt-3 text-sm md:text-base text-slate-600">
          Latest events & upcoming traditions. Experience Javanese culture.
        </p>
      </header>

      {/* Featured card */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-8 md:mt-10 max-w-5xl rounded-2xl overflow-hidden border border-slate-900/5
                   shadow-[0_25px_90px_-30px_rgba(0,0,0,0.35)]"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={featured.img}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 960px, 100vw"
            priority
          />

          {/* overlay gradien untuk kontras teks */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
          />

          {/* copy kiri bawah */}
          <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-auto max-w-xl">
            <h2 className="font-display text-2xl md:text-3xl text-white drop-shadow">
              {featured.title}
            </h2>
            <p className="mt-1.5 text-white/90 text-sm md:text-base">
              {featured.blurb}
            </p>

            <Link
              href={featured.href}
              className="mt-4 inline-flex items-center rounded-full border border-white/60
                         bg-white/15 px-4 py-2 text-xs md:text-sm font-medium text-white
                         backdrop-blur hover:bg-white/25 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-yellow-500"
            >
              SEE DETAILS
            </Link>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
