"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- hanya tambah ini: variants untuk stagger & item ---
const container = {
  hidden: { opacity: 1 }, // biar track tidak fade, hanya anaknya
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const items = [
  {
    title: "Current Event.",
    desc: "Explore upcoming festivals, workshops, and cultural shows in Kotagede. Request a slot for your favorite experiences.",
    img: "/event.png",
    href: "/events",
  },
  {
    title: "Explore by Villages.",
    desc: "Get to know each tourism village, see images, stories, and unique local narratives.",
    img: "/villages.png",
    href: "/villages",
  },
  {
    title: "Tour Guide & Activities",
    desc: "Find your perfect activities and holiday packages in Kotagede and find your own tour guide.",
    img: "/tour.png",
    href: "/tours",
  },
  {
    title: "Food & Drink",
    desc: "Find the traditional food & drinks in Kotagede.",
    img: "/food.png",
    href: "/food",
  },
];

export default function ExploreCarousel() {
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
    <section id="explore" className="container mx-auto px-4 py-14 md:py-20">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-slate-900">
            Explore Kotagede
          </h2>
          <div
            className="mt-2 h-[3px] w-24 rounded-full bg-amber-600/80"
            aria-hidden="true"
          />
        </div>

        {/* tombol desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="h-10 w-10 rounded-full bg-slate-900/0 hover:bg-slate-900/10 grid place-items-center border border-slate-900/10 transition"
            aria-label="Scroll left"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="h-10 w-10 rounded-full bg-slate-900/0 hover:bg-slate-900/10 grid place-items-center border border-slate-900/10 transition"
            aria-label="Scroll right"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="relative">
        {/* gradient tepi transparan */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent md:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:w-16" />

        {/* track */}
        <motion.div
          ref={trackRef}
          className="
            flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 md:pb-6
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ scrollbarWidth: "none" }}
          // --- hanya tambah ini: animasi container ---
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* iOS scrollbar hide */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((it) => (
            <motion.article
              key={it.title}
              data-card
              className="
                snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[42%] lg:w-[31%]
                rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]
                border border-slate-900/5 overflow-hidden
              "
              // --- hanya tambah ini: animasi item (stagger kiri -> kanan) ---
              variants={item}
            >
              <div className="relative aspect-[4/5] sm:aspect-[4/4.5] md:aspect-[4/3.6]">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 85vw"
                  loading="lazy"
                />
              </div>

              <div className="p-5 md:p-6 bg-slate-50">
                <h3 className="font-display text-xl text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  {it.desc}
                </p>
                <div className="mt-4">
                  <Link
                    href={it.href}
                    className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Learn more
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-4 w-4"
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
            </motion.article>
          ))}
        </motion.div>

        {/* tombol mobile mengambang transparan */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/60 hover:bg-white/80 shadow-md grid place-items-center"
            aria-label="Scroll left"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/60 hover:bg-white/80 shadow-md grid place-items-center"
            aria-label="Scroll right"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
