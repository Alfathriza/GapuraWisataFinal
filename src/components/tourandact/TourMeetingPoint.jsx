"use client";

import { MapPin, Car, Footprints } from "lucide-react";

const ICONS = {
  walk: Footprints,
  car: Car,
  pin: MapPin,
};

export default function TourMeetingPoint({ items = [], points = [] }) {
  // Terima items atau points
  const data = (Array.isArray(items) && items.length ? items : points) || [];

  return (
    <section className="container mx-auto px-4 py-10 md:py-12">
      <h2 className="font-display text-2xl md:text-3xl text-slate-900">
        Meeting Point & Pickup
      </h2>
      <div className="mt-2 h-[3px] w-24 rounded-full bg-yellow-500" />

      <div className="mt-6 space-y-4">
        {data.map((p, i) => {
          const kind = String(p.type || p.icon || "pin").toLowerCase();
          const Icon = ICONS[kind] || MapPin;

          return (
            <div
              key={p.id || `${kind}-${i}`}
              className="rounded-xl border border-slate-200 bg-amber-50/30 p-4 md:p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="uppercase text-xs font-semibold tracking-wide text-yellow-700">
                    {p.title || p.type || "Meeting point"}
                  </p>
                  <p className="mt-1 text-sm text-slate-800 leading-relaxed">
                    {p.address}
                  </p>
                  {p.note && (
                    <p className="mt-1 text-xs text-slate-500 italic">
                      {p.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {/* fallback kalau kosong */}
        {data.length === 0 && (
          <p className="text-sm text-slate-500">No meeting point info yet.</p>
        )}
      </div>
    </section>
  );
}
