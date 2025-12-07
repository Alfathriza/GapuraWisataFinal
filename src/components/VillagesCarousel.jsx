"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";

const villages = [
  {
    name: "Prenggan",
    img: "/prenggan.png",
    href: "/villages/prenggan",
  },
  {
    name: "Basen",
    img: "/basen.png",
    href: "/villages/basen",
  },
  {
    name: "Jagalan",
    img: "/jagalan.png",
    href: "/villages/jagalan",
  },
  {
    name: "Purbayan",
    img: "/purbayan.png",
    href: "/villages/purbayan",
  }
];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function VillagesCarousel() {
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
    <section id="villages" className="container mx-auto px-4 py-14 md:py-20">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-slate-900">
          Tourism Village
        </h2>
        <div
          className="mt-2 h-[3px] w-24 rounded-full bg-amber-600/80"
          aria-hidden
        />
      </div>

      <div className="relative">
        {/* tepi gradien */}
        <div className="pointer-events-none absolute -left-1 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent md:w-16" />
        <div className="pointer-events-none absolute -right-1 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:w-16" />

        {/* track */}
        <motion.div
          ref={trackRef}
          className="
            flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 md:pb-6
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ scrollbarWidth: "none" }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {villages.map((v) => (
            <motion.article
              key={v.name}
              data-card
              variants={item}
              className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-[44%] lg:w-[32%] rounded-2xl overflow-hidden border border-slate-900/5 shadow-[0_20px_60px_-22px_rgba(0,0,0,0.3)] bg-white"
            >
              <Link href={v.href} className="group relative block">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={v.img}
                    alt={v.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 44vw, 82vw"
                    priority={v.name === "Prenggan"}
                  />
                  {/* overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  />
                  {/* teks */}
                  <div className="absolute left-5 right-5 bottom-4 text-white">
                    <h3 className="font-display text-xl md:text-2xl">
                      Explore {v.name}
                    </h3>
                    <p className="mt-2 inline-flex items-center text-amber-300/90 group-hover:text-amber-200">
                      Explore More
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
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* tombol kiri kanan */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          className="absolute left-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/65 hover:bg-white/85 shadow-md grid place-items-center"
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
          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/65 hover:bg-white/85 shadow-md grid place-items-center"
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
    </section>
  );
}
