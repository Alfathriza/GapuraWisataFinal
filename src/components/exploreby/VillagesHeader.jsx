"use client";
import { motion } from "framer-motion";

export default function VillagesHeader() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl text-slate-900"
        >
          Explore by Villages
        </motion.h1>

        <div className="w-24 h-[3px] bg-yellow-500 mx-auto mt-3 mb-5" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-600"
        >
          Latest events and upcoming traditions. Experience Javanese culture.
        </motion.p>
      </div>

      <div className="border-t border-yellow-200" />

      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="italic text-slate-700 leading-relaxed"
        >
          “Every village in Kotagede holds a unique story, from silver artisans
          and traditional markets to ancient mosques and royal heritage sites.
          Explore them all below.”
        </motion.blockquote>
        <div className="w-32 h-[2px] bg-slate-200 mx-auto mt-6" />
      </div>
    </section>
  );
}
