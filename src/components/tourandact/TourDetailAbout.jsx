"use client";

export default function TourDetailAbout({
  paragraphs = [],
  highlights = [],
  rightSlot = null,
}) {
  return (
    <section className="container mx-auto px-4 py-10 md:py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* left: card about */}
        <article className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.12)]">
          <h2 className="font-display text-2xl text-slate-900">About</h2>
          <div className="mt-1 h-[3px] w-20 rounded-full bg-yellow-500" />
          <div className="prose prose-slate mt-4 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {highlights?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <a
                  key={h.label}
                  href={h.href || "#"}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-yellow-50 hover:text-yellow-700"
                >
                  {h.label}
                </a>
              ))}
            </div>
          ) : null}
        </article>

        {/* right: slot untuk form */}
        <div className="lg:col-span-1">{rightSlot}</div>
      </div>
    </section>
  );
}
