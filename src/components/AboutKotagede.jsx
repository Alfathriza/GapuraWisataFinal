"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function AboutKotagede() {
  return (
    <motion.section
      id="know"
      className="container mx-auto px-4 py-14 md:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Heading + underline */}
      <motion.h2
        className="font-display text-3xl md:text-4xl tracking-tight text-slate-900"
        variants={fadeUp}
      >
        Get to Know About Kotagede
      </motion.h2>
      <motion.div
        className="mt-3 h-[3px] w-24 rounded-full bg-amber-600/80"
        aria-hidden="true"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.05 }}
      />

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <div className="relative aspect-[16/11]">
            <Image
              src="/kotagede-about.png"
              alt="Heritage gate in Kotagede"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          className="text-slate-600 leading-relaxed"
          variants={fadeUp}
          transition={{ delay: 0.18 }}
        >
          <p>
            Step into Kotagede, Yogyakarta’s living heritage where history and
            culture come alive. Once the royal capital of the Mataram Kingdom,
            today Kotagede welcomes you with narrow lanes, traditional joglo
            houses, silver workshops that still shine with craftsmanship, and
            local delicacies that carry centuries of flavor.
          </p>
          <p className="mt-4">
            Through its five tourism villages, Kotagede offers more than
            sightseeing, it offers experiences. In Purbayan, heritage homes and
            silver artisans keep traditions alive. Prenggan shares timeless
            stories through its historic neighborhoods. Kemasan hums with the
            creativity of silversmiths, while Basen invites you into the warmth
            of its community life.
          </p>
          <p className="mt-4">
            Kotagede is not just a place to visit, it is a journey to live, a
            culture to experience, and a collaboration of communities ready to
            welcome you.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
