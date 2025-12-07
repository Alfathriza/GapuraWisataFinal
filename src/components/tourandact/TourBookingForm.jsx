"use client";

import { useMemo, useState } from "react";

export default function TourBookingForm({
  phone = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890",
  tourTitle = "Kotagede Yogyakarta Heritage Walk Tour",
  defaultTime = "09:00",
}) {
  const [name, setName] = useState("");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(defaultTime);
  const [notes, setNotes] = useState("");

  const disabled = useMemo(
    () => !name.trim() || !date || !time || Number(people) <= 0,
    [name, date, time, people]
  );

  const openWhatsApp = () => {
    if (disabled) return;

    const msg = [
      "Halo, saya ingin booking tour:",
      `• Tour: ${tourTitle}`,
      `• Tanggal: ${date}`,
      `• Jam: ${time}`,
      `• Jumlah orang: ${people}`,
      `• Nama: ${name}`,
      notes ? `• Catatan: ${notes}` : null,
      "",
      "Mohon bantu prosesnya ya.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white/70 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.12)] backdrop-blur p-4 md:p-5">
      <h3 className="font-display text-xl text-slate-900">Booking Tour</h3>
      <p className="mt-1 text-xs text-slate-600">
        Isi formulir singkat ini lalu kirim lewat WhatsApp
      </p>

      <div className="mt-4 space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-500"
          />
        </div>

        {/* Jumlah Orang */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Jumlah Orang
          </label>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-500"
          />
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Hari Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-500"
          />
        </div>

        {/* Jam */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Jam
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-500"
          />
          <p className="mt-1 text-xs text-slate-500">
            Rekomendasi sesi 09.00 atau 15.00
          </p>
        </div>

        {/* Catatan */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Catatan
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Allergy, meeting point, atau kebutuhan khusus"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-500"
          />
        </div>

        {/* Tombol */}
        <button
          type="button"
          onClick={openWhatsApp}
          disabled={disabled}
          className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition
            ${
              disabled
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
        >
          Kirim ke WhatsApp
        </button>

        <p className="text-[11px] text-slate-500">
          Dengan menekan tombol ini, browser akan membuka WhatsApp dengan pesan
          yang sudah terisi. Pastikan nomor admin sudah benar. Atur di
          <code className="ml-1 rounded bg-slate-100 px-1">
            NEXT_PUBLIC_WA_PHONE
          </code>
          .
        </p>
      </div>
    </aside>
  );
}
