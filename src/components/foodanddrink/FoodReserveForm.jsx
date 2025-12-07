"use client";

import { useMemo, useState } from "react";

// Set di .env: NEXT_PUBLIC_WA_PHONE=628123456789
const WA_PHONE =
  process.env.NEXT_PUBLIC_WA_PHONE?.replace(/[^\d]/g, "") || "628123456789";

const EXPERIENCE = ["Dine-In", "Takeaway", "Tasting Class"];

export default function FoodReserveForm({
  dishName = "Kipo",
  location = "Kotagede Culinary Spot",
}) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2 people");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState(EXPERIENCE[0]);
  const [notes, setNotes] = useState("");

  const isValid = useMemo(() => name && date && time, [name, date, time]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const lines = [
      `Reservation Request - ${dishName}`,
      `Name: ${name}`,
      `Guests: ${guests}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Experience: ${type}`,
      `Location: ${location}`,
      notes ? `Special Requests: ${notes}` : null,
      "",
      "Please confirm availability. Thank you.",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WA_PHONE}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="rounded-2xl border border-yellow-400/70 bg-white p-4 md:p-5 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.28)]">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-yellow-500/15 text-yellow-700">
          {/* icon fork-spoon */}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M8 3v8M6 3v8M10 3v8M6 7h4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 3c1.7 0 3 1.3 3 3v3h-3v12"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-display text-[18px] leading-tight text-slate-900">
            Reserve Your Culinary Experience
          </p>
          <p className="text-xs text-slate-500">Join the Taste of Kotagede</p>
          <div className="mt-3 h-px w-full bg-slate-200" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
        <Field label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ui-input"
            placeholder="Your name"
            required
          />
        </Field>

        <Field label="Number of Guests">
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="ui-input appearance-none pr-9"
            >
              {[
                "1 person",
                "2 people",
                "3 people",
                "4 people",
                "5+ people",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ui-input"
              required
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="ui-input"
              required
            />
          </Field>
        </div>

        <Field label="Experience Type">
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="ui-input appearance-none pr-9"
            >
              {EXPERIENCE.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </Field>

        <Field label="Special Requests (Optional)">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="ui-input min-h-[84px]"
            placeholder="Any dietary restrictions or special requests?"
          />
        </Field>

        <button
          type="submit"
          disabled={!isValid}
          className="mt-1 w-full rounded-md bg-black px-4 py-2.5 text-sm font-semibold tracking-wide text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          BOOK NOW
        </button>

        <p className="text-[11px] text-slate-500">
          Free cancellation up to 2 hours before reservation
        </p>
      </form>

      {/* Styles */}
      <style jsx>{`
        .ui-input {
          width: 100%;
          border: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          border-radius: 0.5rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: rgb(30 41 59);
          outline: none;
          transition: box-shadow 150ms, border-color 150ms,
            background-color 150ms;
        }
        .ui-input:focus {
          border-color: rgb(234 179 8);
          background: white;
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.18);
        }
      `}</style>
    </aside>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chevron({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
