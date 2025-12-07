"use client";

import { motion } from "framer-motion";

export default function FoodDrinkHeader() {
  return (
    <section className="container mx-auto px-4 pt-10 pb-12 md:pt-14 md:pb-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display text-4xl md:text-5xl text-slate-900"
      >
        Food &amp; Drink
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="mx-auto mt-3 h-[4px] w-28 rounded-full bg-yellow-500 origin-center"
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="mx-auto mt-4 max-w-2xl text-slate-600"
      >
        Experience Kotagede with more than sights. Try its authentic food,
        drinks, and timeless flavors.
      </motion.p>
    </section>
  );
}
