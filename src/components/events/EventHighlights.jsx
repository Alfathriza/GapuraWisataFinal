"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Props:
 * - title?: string                      default "Event Highlights"
 * - items: Array<{ img: string, caption?: string }>
 */
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
const card = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function EventHighlights({
  title = "Event Highlights",
  items = [],
}) {
  if (!items?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-slate-900">
          {title}
        </h2>
        <div className="mt-2 h-[3px] w-16 rounded-full bg-yellow-500" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {items.map((it, idx) => (
          <motion.figure
            key={it.img + idx}
            variants={card}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.28)]"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={it.img}
                alt={it.caption || `highlight ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                loading="lazy"
              />
            </div>
            {it.caption ? (
              <figcaption className="p-3 text-sm text-slate-700">
                {it.caption}
              </figcaption>
            ) : null}
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
