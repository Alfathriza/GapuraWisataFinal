"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Props:
 * - title?: string          default "About the Event"
 * - sections?: Array<{ heading?: string, text: string }>
 * - images?: Array<{ src: string, alt?: string }>
 *
 * Backward compatible:
 * - about?: string          jika hanya 1 paragraf, tetap ditampilkan
 */
export default function EventAbout({
  title = "About the Event",
  sections = [],
  images = [],
  about,
}) {
  const hasSections = sections && sections.length > 0;
  const img1 = images?.[0];
  const img2 = images?.[1];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left - text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-slate-900">
            {title}
          </h2>
          <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />

          <div className="mt-6 space-y-5">
            {hasSections ? (
              sections.map((s, idx) => (
                <div key={idx}>
                  {s.heading ? (
                    <p className="text-[13px] font-semibold text-amber-600">
                      {s.heading}
                    </p>
                  ) : null}
                  <p className="mt-1 text-[15px] leading-7 text-slate-700">
                    {s.text}
                  </p>
                </div>
              ))
            ) : about ? (
              <p className="mt-1 text-[15px] leading-7 text-slate-700">
                {about}
              </p>
            ) : null}
          </div>
        </motion.div>

        {/* Right - stacked images */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
          className="grid gap-5"
        >
          {img1 ? (
            <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.25)]">
              <Image
                src={img1.src}
                alt={img1.alt || "event image 1"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width:768px) 100vw, 50vw"
                loading="lazy"
              />
            </figure>
          ) : null}

          {img2 ? (
            <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.25)]">
              <Image
                src={img2.src}
                alt={img2.alt || "event image 2"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width:768px) 100vw, 50vw"
                loading="lazy"
              />
            </figure>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
