"use client";

import Link from "next/link";
import Image from "next/image";

const explore = [
  { href: "/#whats-on", label: "What’s On" },
  { href: "/#tour", label: "Tour & Activities" },
  { href: "/villages", label: "Tourism Villages" },
  { href: "/heritage", label: "Heritage Sites" },
];

const experience = [
  { href: "/food", label: "Food & Drink" },
  { href: "/workshops", label: "Workshops" },
  { href: "/silver", label: "Silver Crafts" },
  { href: "/markets", label: "Local Markets" },
];

const connect = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/partners", label: "Partners" },
  { href: "/community", label: "Community" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-white text-slate-700">
      {/* gold top line */}
      <div className="h-[2px] w-full bg-amber-500/70" aria-hidden />

      <div className="container mx-auto px-4">
        {/* content */}
        <div className="grid gap-10 py-10 md:grid-cols-4">
          {/* brand + tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Gapura Wisata"
                width={36}
                height={36}
                className="h-9 w-9"
                priority
              />
              <span className="font-semibold tracking-wide text-slate-900">
                GAPURA <span className="text-slate-900">WISATA</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm italic text-slate-500">
              Your Gateway to Collaborative Cultural Tourism
            </p>
          </div>

          {/* Explore */}
          <FooterCol title="Explore" items={explore} />

          {/* Experience */}
          <FooterCol title="Experience" items={experience} />

          {/* Connect */}
          <FooterCol title="Connect" items={connect} />
        </div>

        {/* divider */}
        <div className="border-t border-slate-200" />

        {/* copyright */}
        <p className="py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Gapura Wisata. Preserving heritage,
          celebrating culture.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-slate-900 text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="hover:text-amber-700 transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
