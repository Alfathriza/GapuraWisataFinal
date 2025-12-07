"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const villages = [
  {
    key: "purbayan",
    title: "Purbayan",
    img: "/purbayan.png", // File ada di root public, bukan di folder villages/
    blurb:
      "Heritage homes and living traditions. The heart of classic Kotagede atmosphere.",
  },
  {
    key: "prenggan",
    title: "Prenggan",
    img: "/prenggan.png", // File ada di root public
    blurb:
      "Historic neighborhoods with stories, community life, and cultural activities.",
  },
  {
    key: "basen",
    title: "Basen",
    img: "/basen.png", // File ada di root public
    blurb:
      "Warm community vibes, home industries, and everyday local experiences.",
  },
  {
    key: "kemasan",
    title: "Kemasan",
    img: "/silver.png", // File kemasan.png tidak ada, gunakan silver.png sebagai fallback
    blurb:
      "Famous for silversmiths, craft studios, and workshops you can visit.",
  },
  {
    key: "jagalan",
    title: "Jagalan",
    img: "/jagalan.png", // File ada di root public
    blurb:
      "Historic gate, old quarters, and pathways that connect Kotagede's timeline.",
  },
];

export default function VillagesGrid() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {villages.map((v, i) => (
            <motion.article
              key={v.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={v.img}
                  alt={v.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <h3 className="absolute left-5 bottom-5 text-white text-2xl font-serif drop-shadow">
                  {v.title}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-slate-600 leading-relaxed">{v.blurb}</p>
                <div className="w-10 h-[2px] bg-yellow-500 mt-4 mb-3 transition-all duration-500 group-hover:w-full" />
                <Link
                  href={`/villages/${v.key}`}
                  className="inline-flex items-center font-medium text-yellow-600 hover:text-yellow-700"
                >
                  See details
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
