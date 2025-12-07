"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/shared/SafeImage";

const CARD_FALLBACK = "/fallbacks/food.jpg";

function resolveHref(it) {
  if (it?.href) return it.href;
  if (it?.slug) {
    if (it.type === "event") return `/whats-on/${it.slug}`;
    return `/food/${it.slug}`;
  }
  return "#";
}

export default function FoodCardGrid({ datasets, activeTab }) {
  const items = useMemo(() => {
    switch (activeTab) {
      case "drinks":
        return datasets.drinks || [];
      case "places":
        return datasets.places || [];
      case "events":
        return datasets.events || [];
      default:
        return datasets.foods || [];
    }
  }, [activeTab, datasets]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ willChange: "transform, opacity" }}
        >
          {items.map((it) => {
            const href = resolveHref(it);
            const key = it.slug || it.id || href;
            const imgSrc = it.img || it.image || CARD_FALLBACK;
            const alt = it.title || "Menu image";

            return (
              <article
                key={key}
                className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition-shadow"
              >
                <Link
                  href={href}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                >
                  <div className="relative aspect-[4/3]">
                    <SafeImage
                      src={imgSrc}
                      alt={alt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-slate-900 font-medium">{it.title}</h3>
                    {!!it.excerpt && (
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {it.excerpt}
                      </p>
                    )}
                    <div className="w-12 h-[2px] bg-yellow-500 mt-3 transition-all group-hover:w-full" />
                  </div>
                </Link>
              </article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
