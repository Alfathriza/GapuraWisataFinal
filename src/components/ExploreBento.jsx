"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* variants */
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* Card reusable */
function Tile({ title, img, className }) {
  return (
    <motion.a
      variants={item}
      href="#"
      className={`relative block overflow-hidden rounded-2xl border border-slate-900/5 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.28)] ${className}`}
    >
      <Image src={img} alt={title} fill className="object-cover" sizes="50vw" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
      />
      <div className="absolute left-4 right-4 bottom-3">
        <h3 className="font-display text-white text-lg md:text-xl drop-shadow">
          {title}
        </h3>
      </div>
    </motion.a>
  );
}

export default function ExploreBento() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-display text-[clamp(26px,4.3vw,40px)] tracking-tight text-slate-900 uppercase">
        Explore Kotagede
      </h2>
      <div
        className="mt-2 h-[3px] w-20 rounded-full bg-amber-600/80"
        aria-hidden
      />

      {/* Controls ukuran */}
      <style jsx>{`
        :global(#bentoExact) {
          --H: 360px;
          --gap: 16px;
        }
        @media (min-width: 1024px) {
          :global(#bentoExact) {
            --H: 380px;
          }
        }
        @media (min-width: 1280px) {
          :global(#bentoExact) {
            --H: 400px;
          }
        }
      `}</style>

      {/* Grid utama dengan stagger */}
      <motion.div
        id="bentoExact"
        className="mt-6 grid gap-[var(--gap)] lg:grid-cols-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Kolom kiri */}
        <div
          className="grid gap-[var(--gap)] lg:col-span-7"
          style={{ gridTemplateRows: "repeat(2, var(--H))" }}
        >
          <Tile
            title="Explore Candi"
            img="/hero.png"
            className="h-[260px] sm:h-[300px] lg:h-full"
          />
          <Tile
            title="Heritage Trail"
            img="/heritage.png"
            className="h-[260px] sm:h-[300px] lg:h-full"
          />
        </div>

        {/* Kolom kanan */}
        <div
          className="grid gap-[var(--gap)] lg:col-span-5"
          style={{
            gridTemplateRows: "calc(var(--H)/2) calc(var(--H)/2) var(--H)",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Tile
            title="Museum"
            img="/museum.png"
            className="col-span-1 h-[190px] lg:h-full"
          />
          <Tile
            title="Knowledge"
            img="/tour.png"
            className="col-span-1 h-[190px] lg:h-full"
          />
          <Tile
            title="Silver Workshop"
            img="/silver.png"
            className="col-span-1 h-[190px] lg:h-full"
          />
          <Tile
            title="Kotagede Market"
            img="/market.png"
            className="col-span-1 h-[190px] lg:h-full"
          />
          <Tile
            title="Handicraft"
            img="/handicraft.png"
            className="col-span-2 h-[250px] sm:h-[300px] lg:h-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
