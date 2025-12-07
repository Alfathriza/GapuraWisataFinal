// Ambil dan saring event bertema kuliner dari whats-on
import { EVENTS } from "@/app/whats-on/data";

export function getFoodEvents() {
  const kw = [
    "food",
    "kuliner",
    "culinary",
    "dine",
    "tasting",
    "cook",
    "kitchen",
  ];
  return (EVENTS || [])
    .filter((e) => {
      const text = [
        e.title,
        e.subtitle,
        e.excerpt,
        ...(e.tags || []),
        ...(e.categories || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const tagged = (e.tags || []).some((t) =>
        /food|kuliner|culinary/i.test(t)
      );
      const hinted = kw.some((k) => text.includes(k));
      return tagged || hinted;
    })
    .map((e) => ({
      type: "event",
      slug: e.slug,
      title: e.title,
      img: e.image || e.cover || "/fallbacks/food.jpg",
      excerpt: e.excerpt || e.subtitle || "",
    }));
}
