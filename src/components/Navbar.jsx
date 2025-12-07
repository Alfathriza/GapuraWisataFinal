"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  const links = [
    { href: "/whats-on", label: "What's On" },
    { href: "/tour", label: "Tour & Activities" }, // absolut, benar
    {
      href: { pathname: "/food", query: { tab: "foods" } },
      label: "Food & Drink",
    }, // ke tab foods
    {
      href: { pathname: "/explore", hash: "villages" },
      label: "Explore by Villages",
    }, // absolut
  ];

  // key unik untuk href string/objek
  const linkKey = (to) =>
    typeof to === "string"
      ? to
      : `${to?.pathname || ""}${
          to?.query ? "?" + new URLSearchParams(to.query).toString() : ""
        }#${to?.hash || ""}`;

  // normalisasi path target untuk cek active
  const toPath = (to) =>
    typeof to === "string" ? to.split("#")[0] : to?.pathname || "/";

  // aktif jika tepat di path, atau sedang berada di sub-route detail
  const isActive = (to) => {
    const base = toPath(to);
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  // Lock scroll saat drawer terbuka dan fokus ke item pertama
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 10);
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur shadow-sm border-b border-yellow-200 flex items-center justify-center relative"
      style={{
        backgroundImage: "url(/batik.png)",
        backgroundPosition: "center",
        backgroundSize: "1500px auto",
      }}
    >
      <style jsx>{`
        @media (min-width: 640px) {
          nav {
            background-size: 200px auto;
          }
        }
        @media (min-width: 768px) {
          nav {
            background-size: 240px auto;
          }
        }
        @media (min-width: 1024px) {
          nav {
            background-size: 280px auto;
          }
        }
        @media (min-width: 1280px) {
          nav {
            background-size: 320px auto;
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Gapura Wisata Logo"
            className="h-20 w-auto"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex flex-row space-x-10 font-medium text-slate-600">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={linkKey(link.href)}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-slate-800 font-semibold"
                      : "hover:text-yellow-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-controls="mobile-drawer"
          aria-expanded={open ? "true" : "false"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      <button
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        tabIndex={-1}
      />

      {/* Drawer kanan */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 h-dvh w-80 max-w-[85%] bg-white shadow-xl md:hidden transform transition-transform ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.png"
              alt="Gapura Wisata Logo"
              className="h-8 w-auto"
            />
            <span className="font-semibold tracking-wide text-slate-800">
              GAPURA <span className="text-slate-800">WISATA</span>
            </span>
          </Link>
          <button
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-4">
          <ul className="space-y-2 font-medium text-slate-700">
            {links.map((link, idx) => {
              const active = isActive(link.href);
              return (
                <li key={linkKey(link.href)}>
                  <Link
                    href={link.href}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`block px-3 py-2 rounded transition ${
                      active
                        ? "text-slate-900 font-semibold bg-slate-100"
                        : "hover:bg-slate-100"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <Link
            href="/#join"
            className="block text-center px-4 py-2 rounded-md bg-slate-900 text-white font-medium hover:opacity-95"
            onClick={() => setOpen(false)}
          >
            Contribute
          </Link>
        </div>
      </aside>
    </nav>
  );
}
