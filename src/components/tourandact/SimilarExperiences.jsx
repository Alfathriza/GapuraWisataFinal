// components/tourandact/SimilarExperiences.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { getAllTours } from "@/lib/api";

export default function SimilarExperiences({
  currentSlug,
  title = "Similar Experiences",
}) {
  const trackRef = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchRelatedTours() {
      try {
        const tours = await getAllTours();
        const related = tours
          .filter((t) => t.slug !== currentSlug)
          .slice(0, 8)
          .map((t) => ({
            slug: t.slug,
            title: t.title,
            image: t.image || t.hero || "/fallbacks/tour-hero.jpg",
            duration: t.duration,
            group: t.group,
            price: t.price,
          }));
        setItems(related);
      } catch (error) {
        console.error("Error fetching related tours:", error);
        setItems([]);
      }
    }
    if (currentSlug) {
      fetchRelatedTours();
    }
  }, [currentSlug]);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const gap = parseInt(getComputedStyle(el).gap || 24, 10);
    const width = card ? card.clientWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <section className="container mx-auto px-4 py-14 md:py-20">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl text-slate-900"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-2 text-slate-600"
        >
          Explore more authentic cultural experiences in Kotagede
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent md:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent md:w-16" />

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 md:pb-6 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((t, idx) => (
            <motion.article
              key={t.slug}
              data-card
              initial={{ opacity: 0, y: -18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="shrink-0 snap-start w-[85%] sm:w-[55%] md:w-[40%] lg:w-[30%] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={t.image || t.hero}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg text-slate-900 line-clamp-2">
                  {t.title}
                </h3>

                <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {t.duration || "3 hours"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" />
                    {t.group || "2-10 people"}
                  </span>
                </div>

                {t.price && (
                  <p className="mt-3 text-yellow-600 font-semibold">
                    {t.price}{" "}
                    <span className="text-slate-500 text-xs font-normal">
                      per person
                    </span>
                  </p>
                )}

                <Link
                  href={`/tour/${t.slug}`}
                  className="mt-4 inline-block w-full rounded-md border border-slate-300 py-2 text-center text-sm font-medium text-slate-700 hover:border-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  See the Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <button
          onClick={() => scrollByCards(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white shadow-md grid place-items-center md:left-3"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollByCards(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white shadow-md grid place-items-center md:right-3"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
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
