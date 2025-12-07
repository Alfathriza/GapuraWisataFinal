"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EventGrid({ events = [] }) {
  if (!events.length) return null;

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        All Events
      </h2>
      <div className="mt-2 h-[3px] w-16 rounded-full bg-yellow-500" />

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e, idx) => (
          <motion.article
            key={e.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: idx * 0.03, ease: "easeOut" }}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition"
          >
            <Link href={`/whats-on/${e.slug}`} className="block">
              <div className="relative aspect-[16/10]">
                <Image
                  src={e.image || e.hero}
                  alt={e.title}
                  fill
                  className="object-cover transition group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                  priority={idx < 3}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                {e.where && (
                  <p className="text-xs text-slate-500 mt-1">{e.where}</p>
                )}
                {e.dateLabel && (
                  <p className="text-xs text-slate-500">{e.dateLabel}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.category?.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] uppercase tracking-wide bg-yellow-300/60 text-yellow-900 px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
