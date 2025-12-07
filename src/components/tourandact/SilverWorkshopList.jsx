// components/tourandact/SilverWorkshopList.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllTours } from "@/lib/api";

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

export default function SilverWorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const tours = await getAllTours();
        // ambil semua tur bertema workshop perak
        const filtered = tours
          .filter((t) => t.category?.includes("workshop") || /silver/i.test(t.title))
          .slice(0, 12);
        setWorkshops(filtered);
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshops();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl text-slate-900">
          <span className="border-b-4 border-yellow-500 pb-1">Silver</span>{" "}
          Workshop
        </h2>
        <div className="mt-6 text-center py-12">Loading workshops...</div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-slate-900">
        <span className="border-b-4 border-yellow-500 pb-1">Silver</span>{" "}
        Workshop
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {workshops.map((w) => (
          <WorkshopCard key={w.slug ?? w.title} w={w} />
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/tour?category=workshop"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm hover:border-yellow-500 hover:text-yellow-600 transition-colors"
        >
          See More
        </Link>
      </div>
    </section>
  );
}

function WorkshopCard({ w }) {
  return (
    <motion.article
      variants={item}
      className="group relative overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.28)]"
    >
      <Link
        href={`/tour/${w.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={w.image || w.hero}
            alt={w.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 45vw, 100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-95"
          />

          <span className="absolute left-3 top-3 z-10 rounded-full bg-yellow-500/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
            {(w.category && w.category[0]) || "Workshop"}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
            <h3 className="font-display text-white text-lg md:text-xl leading-snug drop-shadow">
              {w.title}
            </h3>

            <div className="mt-3 flex items-center gap-4 text-[12px] text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                {w.duration || "3 hours"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UsersIcon className="h-4 w-4" />
                {w.group || "1–6 people"}
              </span>
            </div>

            {w.price && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-white/90">
                <span className="font-medium">From</span> {w.price}
              </p>
            )}

            <span
              aria-hidden
              className="mt-2 block h-[2px] w-0 bg-yellow-500 transition-all duration-500 ease-out group-hover:w-24"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* Icons */
function ClockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M12 7v5l3 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="3" strokeWidth="2" />
      <path
        d="M23 21v-2a4 4 0 0 0-3-3.87"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
