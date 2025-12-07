"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { id: "foods", label: "Traditional Foods" },
  { id: "drinks", label: "Traditional Drinks" },
  { id: "places", label: "Places" },
  { id: "events", label: "Food Events" },
];

export default function FoodTabs({ onChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const initial = search.get("tab") || "foods";

  const [tab, setTab] = useState(initial);
  const [isPending, startTransition] = useTransition();

  // refs untuk animasi underline
  const tabRefs = useRef({});
  const underlineRef = useRef(null);

  // update posisi underline setiap kali tab berubah
  useEffect(() => {
    const activeTab = tabRefs.current[tab];
    const underline = underlineRef.current;

    if (activeTab && underline) {
      const { offsetLeft, offsetWidth } = activeTab;
      underline.style.transform = `translateX(${offsetLeft}px)`;
      underline.style.width = `${offsetWidth}px`;
    }
  }, [tab]);

  useEffect(() => {
    const qs = new URLSearchParams(search);
    qs.set("tab", tab);
    router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
    onChange?.(tab);
  }, [tab]); // eslint-disable-line

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
      <div className="relative border-b border-slate-200 flex justify-center">
        <div className="flex gap-8 py-3 relative">
          {/* underline */}
          <span
            ref={underlineRef}
            className="absolute bottom-0 h-[2px] bg-yellow-500 transition-all duration-300 ease-out"
            style={{ width: 0, transform: "translateX(0px)" }}
          />

          {tabs.map((t) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[t.id] = el)}
              type="button"
              onClick={() => startTransition(() => setTab(t.id))}
              className={`pb-2 text-sm md:text-base transition-colors ${
                tab === t.id
                  ? "text-slate-900 font-semibold"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="mt-4 text-sm text-slate-500 text-center">
          Loading...
        </div>
      )}
    </div>
  );
}
