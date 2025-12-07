"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MONTHS, getEventsByMonthId, getAllEvents } from "@/app/whats-on/data"; // ⬅️ tambahkan

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

export default function CalendarGrid() {
  // bentuk data bulan dari sumber tunggal
  const months = MONTHS.map((m) => {
    const list = getEventsByMonthId(m.id);
    const featuredTitle =
      getAllEvents().find((e) => e.slug === m.featuredSlug)?.title || "";
    return {
      month: m.month,
      count: list.length,
      featured: featuredTitle,
      img: m.img,
      href: `/whats-on?month=${m.id}`,
    };
  });

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-slate-900">
        Calendar
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
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {months.map((m) => (
          <MonthCard key={m.month} data={m} />
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/whats-on"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 shadow-sm hover:border-amber-500 hover:text-amber-700 transition-colors"
        >
          See All Events
        </Link>
      </div>
    </section>
  );
}

function MonthCard({ data }) {
  const { month, count, featured, img, href } = data;

  return (
    <motion.article variants={item}>
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <div className="relative aspect-[4/3.9]">
          <Image
            src={img}
            alt={month}
            fill
            className="object-cover opacity-60 grayscale-[15%] transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0"
            sizes="(min-width:1024px) 25vw, (min-width:768px) 40vw, 100vw"
            priority={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
            <div>
              <h3 className="font-display text-white text-xl leading-tight drop-shadow">
                {month}
              </h3>
              <span
                aria-hidden
                className="mt-1 block h-[3px] w-10 rounded-full bg-amber-500 transition-all duration-500 origin-left group-hover:w-16"
              />
              <p className="mt-2 text-xs text-white/85">
                {count} {count > 1 ? "Events" : "Event"}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-wide text-white/70 uppercase">
                Featured
              </p>
              <p className="mt-1 text-sm text-white/90 line-clamp-1">
                {featured}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
