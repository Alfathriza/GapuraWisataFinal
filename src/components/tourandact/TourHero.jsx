"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function TourHero() {
  return (
    <section className="container mx-auto px-4 pt-10 pb-12 md:pt-14 md:pb-16">
      {/* Heading */}
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-slate-900">
          Tour & Activities
        </h1>
        <div className="mx-auto mt-2 h-[3px] w-28 rounded-full bg-yellow-500" />
        <p className="mt-3 text-slate-600">
          find your perfect tour mates and Experience Javanese culture.
        </p>
      </div>

      {/* Feature Card */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-8 md:mt-10"
      >
        <motion.article
          variants={item}
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-900/5 bg-white
            shadow-[0_28px_80px_-26px_rgba(0,0,0,0.35)]
          "
        >
          <div className="relative aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6]">
            <Image
              src="/tour/museum.png"
              alt="Strolling Around Kotagede"
              fill
              priority
              className="object-cover"
              sizes="(min-width:1280px) 1200px, 100vw"
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
            />

            {/* konten */}
            <div className="absolute inset-0 flex items-end">
              <div className="p-5 sm:p-7 md:p-10 max-w-3xl">
                <p className="text-[11px] font-semibold tracking-wide text-amber-300/95 uppercase">
                  Featured Experience
                </p>

                <h2 className="mt-2 font-display text-white text-2xl md:text-4xl leading-snug drop-shadow">
                  Strolling Around Kotagede
                </h2>

                <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
                  Walk through centuries of history exploring traditional
                  streets, ancient architecture, and vibrant markets that define
                  Kotagede’s cultural identity.
                </p>

                <div className="mt-5">
                  <Link
                    href="/tours/strolling-around-kotagede"
                    className="
                      inline-flex items-center gap-2 rounded-full
                      border border-white/70 bg-white/10 px-4 py-2
                      text-white text-sm backdrop-blur
                      hover:bg-white/20 hover:border-amber-400
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                      transition
                    "
                  >
                    See Details
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M5 12h14M13 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
