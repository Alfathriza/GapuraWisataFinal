"use client";
import { useState } from "react";

// Ambil nomor dari .env (misal: NEXT_PUBLIC_WA_PHONE=628123456789)
const WA_PHONE =
  process.env.NEXT_PUBLIC_WA_PHONE?.replace(/[^\d]/g, "") || "628123456789";

export default function PlaceReserveForm({ place }) {
  const [form, setForm] = useState({
    name: "",
    guests: "2 people",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `Reservation Request - ${place?.title || "Kotagede Place"}`,
      `👤 Name: ${form.name}`,
      `👥 Guests: ${form.guests}`,
      `📅 Date: ${form.date}`,
      `🕐 Time: ${form.time}`,
      place?.location?.title ? `📍 Location: ${place.location.title}` : null,
      "",
      "Please confirm availability. Thank you.",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WA_PHONE}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="bg-white rounded-2xl border p-6 shadow-lg max-w-md mx-auto sticky top-20">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
        🍽️ Reserve Your Visit
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Join a culinary journey at {place.title}.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            name="name"
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Guests
          </label>
          <select
            name="guests"
            onChange={handleChange}
            value={form.guests}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>1 person</option>
            <option>2 people</option>
            <option>3 people</option>
            <option>4+ people</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition"
        >
          CONFIRM BOOKING
        </button>

        <p className="text-xs text-gray-500 text-center">
          Free cancellation up to 24 hours before visit
        </p>
      </form>
    </aside>
  );
}
