"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Props:
 * - title?: string
 * - subtitle?: string
 * - items: Array<{
 *     title: string,
 *     duration?: string,
 *     people?: string,
 *     price?: string,
 *     img: string,
 *     href: string,
 * }>
 */

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function RelatedEvents({
  title = "You Might Also Like",
  subtitle = "Explore more cultural experiences and tours in Kotagede",
  items = [],
}) {
  if (!items?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl text-slate-900">
          {title}
        </h2>
        <div className="mt-2 mb-2 flex justify-center">
          <div className="h-[3px] w-16 rounded-full bg-yellow-500" />
        </div>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {items.map((e, i) => (
          <motion.article
            key={i}
            variants={item}
            className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={e.img}
                alt={e.title}
                fill
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, (max-width:1280px) 25vw, 300px"
                loading="lazy"
              />
            </div>

            <div className="p-4 flex flex-col h-full">
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                {e.title}
              </h3>

              {/* info bar */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-slate-600">
                {e.duration && (
                  <span className="inline-flex items-center gap-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 6v6l4 2" />
                    </svg>
                    {e.duration}
                  </span>
                )}
                {e.people && (
                  <span className="inline-flex items-center gap-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeWidth="2"
                        d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                      />
                      <circle cx="9" cy="7" r="4" strokeWidth="2" />
                    </svg>
                    {e.people}
                  </span>
                )}
              </div>

              {/* price */}
              {e.price && (
                <p className="mt-3 font-semibold text-yellow-600 text-sm sm:text-base">
                  {e.price}{" "}
                  <span className="text-xs text-slate-600 font-normal">
                    per person
                  </span>
                </p>
              )}

              <div className="mt-4">
                <Link
                  href={e.href}
                  className="inline-flex justify-center w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 hover:border-yellow-500 hover:text-yellow-700 transition"
                >
                  See the Details
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
