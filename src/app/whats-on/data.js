// src/app/whats-on/data.js

export const EVENTS = [
  {
    slug: "kotagede-heritage-festival",
    title: "Kotagede Heritage Festival",
    subtitle: "Perayaan budaya yang menyatukan seni, kuliner, dan komunitas",
    tag: "Festival",
    category: ["culture", "festival"],
    // kartu list
    dateLabel: "March 15 to 17, 2025",
    where: "Purbayan",
    image: "/whatson/naga.png",
    href: "/whats-on/kotagede-heritage-festival",
    excerpt:
      "Rayakan warisan budaya Kotagede dengan pertunjukan tradisional, pameran kerajinan, dan showcase komunitas.",
    // detail
    dateStart: "2025-03-15",
    dateEnd: "2025-03-17",
    time: "08.00 - 21.00",
    location: {
      name: "Alun Alun Purbayan",
      lat: -7.8232,
      lng: 110.3948,
      address: "Purbayan, Kotagede, Yogyakarta",
    },
    hero: "/whatson/naga.png",
    highlights: [
      { img: "/whatson/naga.png", caption: "Parade budaya" },
      { img: "/whatson/pawaitari.png", caption: "Tari tradisional" },
      { img: "/whatson/silver.png", caption: "Pameran kerajinan" },
      { img: "/whatson/pasar.png", caption: "Kuliner khas" },
    ],
    schedule: [
      {
        day: "Sabtu",
        date: "2025-03-15",
        items: ["Pembukaan", "Parade budaya", "Kuliner malam"],
      },
      {
        day: "Minggu",
        date: "2025-03-16",
        items: ["Workshop batik", "Live music"],
      },
      {
        day: "Senin",
        date: "2025-03-17",
        items: ["Tur heritage", "Penutupan"],
      },
    ],
    expect: [
      "Pertunjukan seni tradisional",
      "Workshop kerajinan",
      "Pilihan kuliner lokal",
    ],
    gallery: [
      "/whatson/naga.png",
      "/whatson/pawaitari.png",
      "/whatson/silver.png",
    ],
    seo: {
      description:
        "Festival budaya Kotagede dengan pertunjukan tradisional, pameran kerajinan, dan kuliner.",
      keywords: ["Kotagede", "festival", "budaya", "Yogyakarta"],
    },
  },
  {
    slug: "silver-crafting-workshop",
    title: "Silver Crafting Workshop",
    subtitle: "Belajar teknik dasar perak bersama pengrajin berpengalaman",
    tag: "Workshop",
    category: ["craft", "workshop"],
    dateLabel: "March 22, 2025",
    where: "Kemasan Village",
    image: "/whatson/silver.png",
    href: "/whats-on/silver-crafting-workshop",
    excerpt:
      "Pelajari seni kerajinan perak langsung dari maestro di Kemasan, cocok untuk pemula.",
    dateStart: "2025-03-22",
    dateEnd: "2025-03-22",
    time: "09.00 - 15.00",
    location: {
      name: "Kemasan Village",
      lat: -7.8169,
      lng: 110.3972,
      address: "Kemasan, Kotagede, Yogyakarta",
    },
    hero: "/whatson/silver.png",
    highlights: [
      { img: "/whatson/silver.png", caption: "Teknik dasar" },
      { img: "/whatson/pasar.png", caption: "Demo pengrajin" },
    ],
    schedule: [
      {
        day: "Sabtu",
        date: "2025-03-22",
        items: ["Pengenalan alat", "Praktik membuat cincin"],
      },
    ],
    expect: [
      "Bahan dan alat disediakan",
      "Pendampingan langsung",
      "Karya bisa dibawa pulang",
    ],
    gallery: ["/whatson/silver.png"],
    seo: {
      description:
        "Workshop kerajinan perak untuk pemula di Kemasan Village Kotagede.",
      keywords: ["perak", "workshop", "Kotagede"],
    },
  },
  {
    slug: "javanese-dance-performance",
    title: "Javanese Dance Performance",
    subtitle: "Pertunjukan tari klasik dengan iringan gamelan",
    tag: "Culture",
    category: ["culture", "performance"],
    dateLabel: "March 28, 2025",
    where: "Prenggan Hall",
    image: "/whatson/pawaitari.png",
    href: "/whats-on/javanese-dance-performance",
    excerpt:
      "Rasakan keanggunan tari Jawa dalam pertunjukan intim di Prenggan Hall.",
    dateStart: "2025-03-28",
    dateEnd: "2025-03-28",
    time: "19.00 - 21.00",
    location: {
      name: "Prenggan Hall",
      lat: -7.8239,
      lng: 110.3921,
      address: "Prenggan, Kotagede, Yogyakarta",
    },
    hero: "/whatson/pawaitari.png",
    highlights: [
      { img: "/whatson/pawaitari.png", caption: "Tari klasik" },
      { img: "/whatson/naga.png", caption: "Ansambel gamelan" },
    ],
    schedule: [
      {
        day: "Jumat",
        date: "2025-03-28",
        items: ["Pembukaan", "Pertunjukan utama"],
      },
    ],
    expect: ["Koreografi klasik", "Busana tradisional", "Iringan gamelan"],
    gallery: ["/whatson/pawaitari.png"],
    seo: {
      description:
        "Pertunjukan tari Jawa klasik dengan iringan gamelan di Kotagede.",
      keywords: ["tari jawa", "gamelan", "budaya"],
    },
  },
  {
    slug: "pasar-lawas",
    title: "Pasar Lawas Kotagede",
    subtitle: "Pasar tradisional dengan nuansa tempo dulu",
    tag: "Tour",
    category: ["market", "tour"],
    dateLabel: "April 5, 2025",
    where: "Kotagede Market",
    image: "/whatson/pasar.png",
    href: "/whats-on/pasar-lawas",
    excerpt:
      "Jelajahi pasar tradisional, kuliner lokal, dan kerajinan perak di jantung Kotagede.",
    dateStart: "2025-04-05",
    dateEnd: "2025-04-05",
    time: "07.00 - 14.00",
    location: {
      name: "Kotagede Market",
      lat: -7.8231,
      lng: 110.3946,
      address: "Jl. Mondorakan, Kotagede, Yogyakarta",
    },
    // aset detail menggunakan gambar dari whatson/ sebagai fallback
    hero: "/whatson/pasar.png", // Fallback karena events/pasar-lawas/hero.jpg tidak ada
    highlights: [
      { img: "/whatson/pasar.png", caption: "Kuliner tradisional" }, // Fallback
      { img: "/whatson/silver.png", caption: "Kerajinan perak" }, // Fallback
      { img: "/whatson/kroncong.png", caption: "Pertunjukan musik" }, // Fallback
      { img: "/whatson/gapura.png", caption: "Suasana klasik" }, // Fallback
    ],
    schedule: [
      {
        day: "Sabtu",
        date: "2025-04-05",
        items: ["Tur kuliner", "Workshop perak", "Musik live"],
      },
    ],
    expect: ["Stand UMKM lokal", "Nuansa heritage", "Spot foto ikonik"],
    gallery: [
      "/whatson/pasar.png", // Fallback
      "/whatson/silver.png", // Fallback
      "/whatson/pawaitari.png", // Fallback
      "/whatson/naga.png", // Fallback
      "/whatson/jalan.png", // Fallback
      "/whatson/gapura.png", // Fallback
    ],
    seo: {
      description:
        "Pasar Lawas Kotagede dengan kuliner, musik, dan kerajinan perak khas Yogyakarta.",
      keywords: ["Pasar Lawas", "Kotagede", "kuliner", "wisata"],
    },
  },
  {
    slug: "heritage-architecture-walk",
    title: "Heritage Architecture Walk",
    subtitle: "Tur jalan kaki menyusuri arsitektur kolonial dan joglo",
    tag: "Tour",
    category: ["tour", "architecture"],
    dateLabel: "April 12, 2025",
    where: "Purbayan Village",
    image: "/whatson/jalan.png",
    href: "/whats-on/heritage-architecture-walk",
    excerpt:
      "Telusuri lorong dan rumah tua, pahami warisan arsitektur yang membentuk identitas Kotagede.",
    dateStart: "2025-04-12",
    dateEnd: "2025-04-12",
    time: "08.00 - 11.00",
    location: {
      name: "Purbayan Village",
      lat: -7.8224,
      lng: 110.3953,
      address: "Purbayan, Kotagede, Yogyakarta",
    },
    hero: "/whatson/jalan.png",
    highlights: [
      { img: "/whatson/jalan.png", caption: "Lorong heritage" },
      { img: "/whatson/naga.png", caption: "Rumah joglo" },
    ],
    schedule: [
      {
        day: "Sabtu",
        date: "2025-04-12",
        items: ["Briefing", "Rute utama", "Sesi foto"],
      },
    ],
    expect: ["Guide lokal", "Cerita sejarah", "Rekomendasi spot kuliner"],
    gallery: ["/whatson/jalan.png"],
    seo: {
      description: "Tur arsitektur heritage Kotagede dengan pemandu lokal.",
      keywords: ["heritage", "arsitektur", "tur jalan kaki"],
    },
  },
  {
    slug: "culinary-heritage-experience",
    title: "Culinary Heritage Experience",
    subtitle: "Menjelajah rasa autentik Kotagede bersama pemandu kuliner",
    tag: "Culture",
    category: ["food", "culture"],
    dateLabel: "April 19, 2025",
    where: "Jagalan",
    image: "/whatson/pasar.png",
    href: "/whats-on/culinary-heritage-experience",
    excerpt:
      "Cicipi jajanan pasar dan menu klasik, lengkap dengan cerita asal usulnya.",
    dateStart: "2025-04-19",
    dateEnd: "2025-04-19",
    time: "16.00 - 20.00",
    location: {
      name: "Jagalan",
      lat: -7.8205,
      lng: 110.3929,
      address: "Jagalan, Kotagede, Yogyakarta",
    },
    hero: "/whatson/pasar.png",
    highlights: [
      { img: "/whatson/pasar.png", caption: "Jajanan pasar" },
      { img: "/whatson/silver.png", caption: "Cerita kuliner lokal" },
    ],
    schedule: [
      {
        day: "Sabtu",
        date: "2025-04-19",
        items: ["Street food tour", "Demo masak", "Cicip bersama"],
      },
    ],
    expect: [
      "Kudapan tradisional",
      "Rekomendasi kedai lokal",
      "Cerita kuliner",
    ],
    gallery: ["/whatson/pasar.png"],
    seo: {
      description:
        "Pengalaman kuliner heritage di Kotagede bersama pemandu lokal.",
      keywords: ["kuliner", "heritage", "Kotagede"],
    },
  },
];

/**
 * Data grid bulan untuk Calendar
 */
export const MONTHS = [
  {
    id: "march",
    month: "March",
    featuredSlug: "kotagede-heritage-festival",
    img: "/whatson/pawaitari.png",
  },
  {
    id: "april",
    month: "April",
    featuredSlug: "pasar-lawas",
    img: "/whatson/pasar.png",
  },
  {
    id: "may",
    month: "May",
    featuredSlug: "silver-crafting-workshop",
    img: "/whatson/silver.png",
  },
  {
    id: "june",
    month: "June",
    featuredSlug: "heritage-architecture-walk",
    img: "/whatson/jalan.png",
  },
];

/**
 * Data Discover Carousel opsional
 */
export const DISCOVER = [
  {
    title: "Ancient Temple Complex",
    tag: "Heritage Site",
    img: "/whatson/gapura.png",
    href: "/discover/ancient-temple",
  },
  {
    title: "Artisan Workshops",
    tag: "Cultural Experience",
    img: "/whatson/legi.png",
    href: "/discover/artisan-workshops",
  },
  {
    title: "Traditional Ceremonies",
    tag: "Cultural Event",
    img: "/whatson/pawaitari.png",
    href: "/discover/traditional-ceremonies",
  },
  {
    title: "Silver Street",
    tag: "Walking Tour",
    img: "/whatson/silver.png",
    href: "/discover/silver-street",
  },
];

/* ===================== Helpers utama ===================== */

export function getAllEvents() {
  return EVENTS;
}

export function getEventBySlug(slug) {
  return EVENTS.find((e) => e.slug === slug);
}

export function getAllEventSlugs() {
  return EVENTS.map((e) => e.slug);
}

export function getEventsByMonthId(monthId) {
  const monthIndex = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ].indexOf(String(monthId).toLowerCase());
  if (monthIndex < 0) return [];
  return EVENTS.filter((e) => new Date(e.dateStart).getMonth() === monthIndex);
}

export function getMonthsFromEvents() {
  const byMonth = {};
  for (const e of EVENTS) {
    const d = new Date(e.dateStart);
    const idx = d.getMonth();
    const id = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ][idx];
    if (!byMonth[id]) {
      byMonth[id] = {
        id,
        month: id.charAt(0).toUpperCase() + id.slice(1),
        featuredSlug: e.slug,
        img: e.image,
        count: 0,
      };
    }
    byMonth[id].count += 1;
  }
  return Object.values(byMonth);
}

export function getMajorEvents(limit = 6) {
  return [...EVENTS]
    .sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
    .slice(0, limit)
    .map((e) => ({
      title: e.title,
      date: e.dateLabel,
      where: e.where,
      tag: e.tag,
      image: e.image,
      href: e.href || `/whats-on/${e.slug}`,
      excerpt: e.excerpt,
    }));
}

/* ===================== Helpers untuk detail ===================== */

/** Badge untuk EventHero */
export function buildBadges(ev) {
  const kalender =
    ev.dateLabel ||
    (ev.dateStart && ev.dateEnd ? `${ev.dateStart} to ${ev.dateEnd}` : "");
  const pin = ev.location?.name || ev.where || "Kotagede";
  return [
    kalender ? { icon: "calendar", text: kalender } : null,
    pin ? { icon: "pin", text: pin } : null,
  ].filter(Boolean);
}

/** Mapping schedule lama {day,date,items[]} ke timeline {time,title,desc} */
export function mapScheduleToTimeline(ev) {
  if (Array.isArray(ev.timeline) && ev.timeline.length) return ev.timeline;

  const defaultSlots = [
    "08:00",
    "09:30",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
    "19:00",
  ];
  const result = [];

  (ev.schedule || []).forEach((block, bi) => {
    const items = Array.isArray(block.items) ? block.items : [];
    items.forEach((title, i) => {
      const time = defaultSlots[i] || "";
      result.push({
        time,
        title,
        desc: "",
        _meta: { day: block.day, date: block.date, index: `${bi}-${i}` },
      });
    });
  });

  return result;
}

/** Related events untuk section You Might Also Like */
export function getRelatedEvents(currentSlug, limit = 4) {
  return getAllEvents()
    .filter((e) => e.slug !== currentSlug)
    .slice(0, limit)
    .map((e) => ({
      title: e.title,
      duration: "3 hours",
      people: "2–10 people",
      price: "IDR 150,000",
      img: e.image || e.hero,
      href: e.href || `/whats-on/${e.slug}`,
    }));
}
