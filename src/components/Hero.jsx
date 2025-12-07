import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-16 md:pt-20 pb-10 text-center">
      {/* Heading + subheading */}
      <h1 className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl tracking-tight text-slate-900">
        Discover Kotagede Together
      </h1>
      <p className="mt-3 md:mt-4 text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
        Your gateway to collaborative cultural tourism
      </p>

      {/* CTA */}
      <div className="mt-5 md:mt-6">
        <Link
          href="/#explore"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm md:text-base font-medium bg-yellow-500 text-white hover:bg-amber-700 transition"
        >
          Start Exploring
        </Link>
      </div>

      {/* Media card */}
      <div className="mt-8 md:mt-10">
        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/hero.png"
                alt="Kotagede heritage street"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
              {/* bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>

          {/* small indicator bar */}
          <div className="mt-3 flex justify-center">
            <span
              className="h-1 w-14 rounded-full bg-yellow-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
