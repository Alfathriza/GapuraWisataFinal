"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { DISCOVER } from "@/app/whats-on/data"; // pakai satu sumber data

// anim
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// helper: jadikan slug dari title
function toSlug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// sementara: arahkan ke halaman yang SUDAH ADA agar tidak 404
function buildHref(it) {
  const slug = it.href?.split("/").pop() || toSlug(it.title);
  // nanti kalau sudah bikin route /discover, ganti jadi: return `/discover/${slug}`
  return `/whats-on?discover=${slug}`;
}

export default function DiscoverCarousel() {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const gap = parseInt(
      getComputedStyle(el).columnGap || getComputedStyle(el).gap || 24,
      10
    );
    const width = card ? card.clientWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      {/* heading */}
      <div className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl text-slate-900">
          Discover
        </h2>
        <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />
      </div>

      <div className="relative">
        {/* tombol kiri/kanan */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white/80 shadow-md hover:bg-white"
          aria-label="Scroll left"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white/80 shadow-md hover:bg-white"
          aria-label="Scroll right"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* track */}
        <motion.div
          ref={trackRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none" }}
        >
          {/* hide scrollbar on webkit */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {DISCOVER.map((it) => {
            const safeHref = buildHref(it);
            return (
              <motion.article
                key={safeHref}
                variants={item}
                data-card
                className="group relative shrink-0 w-[82%] sm:w-[55%] md:w-[38%] lg:w-[31%] overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.3)]"
              >
                <Link
                  href={safeHref}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={it.img}
                      alt={it.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 45vw, 80vw"
                      priority={false}
                    />
                    {/* overlay */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-95"
                    />
                    {/* tag */}
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                      {it.tag}
                    </span>

                    {/* caption muncul saat hover */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <h3 className="font-display text-white text-lg leading-snug drop-shadow">
                        {it.title}
                      </h3>

                      {/* garis kuning */}
                      <span
                        aria-hidden
                        className="mt-1 block h-[2px] w-0 bg-amber-400 origin-left transition-all duration-500 ease-out group-hover:w-24"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* CTA: sementara ke /whats-on agar tidak 404 */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/whats-on"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm hover:border-amber-500 hover:text-amber-700 transition-colors"
        >
          See More
        </Link>
      </div>
    </section>
  );
}
