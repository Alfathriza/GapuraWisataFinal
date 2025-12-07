// src/components/tourandact/TourAbout.jsx
"use client";

export default function TourAbout({
  title = "About",
  content,
  highlights = [],
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
      {/* Judul */}
      <h2 className="text-2xl md:text-3xl font-display text-slate-900 mb-4">
        {title}
      </h2>

      {/* Highlight (info singkat seperti kota, kategori, dll) */}
      {highlights.length > 0 && (
        <ul className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
          {highlights.map((h, idx) => (
            <li
              key={idx}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full"
            >
              <span className="font-semibold text-yellow-800">{h.label}:</span>
              <span>{h.value}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Isi teks utama */}
      <div className="text-slate-700 leading-relaxed space-y-4">
        {content
          ? content.split("\n").map((p, idx) => (
              <p key={idx} className="text-justify">
                {p}
              </p>
            ))
          : "No description available for this tour."}
      </div>
    </section>
  );
}
