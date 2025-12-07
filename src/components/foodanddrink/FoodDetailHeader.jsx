"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FoodDetailHeader({
  image,
  title,
  subtitle,
  badges = [],
}) {
  return (
    <section className="container mx-auto px-4 pt-6 pb-4 md:pt-10 md:pb-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_18px_60px_-24px_rgba(0,0,0,0.28)]"
      >
        <div className="relative aspect-[16/7] md:aspect-[16/6]">
          <Image
            src={image}
            alt={title}
            fill
            priority={false}
            className="object-cover"
            sizes="(min-width:1024px) 100vw, 100vw"
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* text block */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <h1 className="font-display text-white text-3xl md:text-5xl leading-tight drop-shadow">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-3xl text-white/90 text-sm md:text-base">
                {subtitle}
              </p>
            )}

            {/* badges */}
            {Array.isArray(badges) && badges.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
                  >
                    {b.icon ? <b.icon className="h-4 w-4" /> : null}
                    {b.text}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
