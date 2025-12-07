"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getMajorEvents } from "@/app/whats-on/data"; 

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function MajorEvents() {
  const majorEvents = getMajorEvents(); 

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-slate-900">
        Kotagede Major Event
      </h2>
      <div
        className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {majorEvents.map((ev) => (
          <EventCard key={ev.href} ev={ev} />
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/whats-on"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm hover:border-yellow-500 hover:text-yellow-700 transition-colors"
        >
          See More Events
        </Link>
      </div>
    </section>
  );
}

function EventCard({ ev }) {
  return (
    <motion.article
      variants={item}
      className="group relative overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.3)]"
    >
      <Link
        href={ev.href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={ev.image}
            alt={ev.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 45vw, 100vw"
            priority={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"
          />
          <span className="absolute left-3 top-3 z-10 rounded-full bg-yellow-500/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
            {ev.tag}
          </span>
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="flex items-center gap-3 text-[11px] text-white/80">
              <span className="inline-flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M7 11h10M7 15h7M16 3v4M8 3v4M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                  />
                </svg>
                {ev.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
                {ev.where}
              </span>
            </p>
            <h3 className="mt-2 font-display text-white text-lg leading-snug drop-shadow">
              {ev.title}
            </h3>
            <span
              aria-hidden
              className="mt-1 block h-[2px] w-0 bg-yellow-500 origin-left transition-all duration-500 ease-out group-hover:w-24"
            />
            <p className="mt-2 text-[12px] leading-relaxed text-white/90 line-clamp-3">
              {ev.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
