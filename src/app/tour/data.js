// src/app/tour/data.js
// Satu sumber data untuk semua Tour & Activities

export const TOURS = [
  // 1) WALKING TOUR
  {
    slug: "kotagede-heritage-walk",
    title: "Kotagede Yogyakarta Heritage Walk Tour",
    subtitle: "Walk through history and experience timeless Javanese culture.",
    hero: "/tour/walk.png", // File heritage-walk/hero.jpg tidak ada, gunakan walk.png
    image: "/tour/walk.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Daily, 09:00 and 15:00",
    duration: "3 hours",
    group: "2–10 people",
    price: "IDR 150,000",
    category: ["walking", "culture"],

    about:
      "Discover the heart of Kotagede, the ancient capital of the Mataram Sultanate. This heritage walk takes you through narrow alleys lined with centuries old architecture, silver workshops, and sacred sites.",

    itinerary: [
      {
        title: "Royal Cemetery",
        minutes: 30,
        description:
          "Begin at Imogiri Royal Cemetery where Mataram sultans rest in peace.",
      },
      {
        title: "Kotagede Mosque",
        minutes: 45,
        description:
          "Visit one of the oldest Islamic structures with classic Javanese style.",
      },
      {
        title: "Silver Workshop",
        minutes: 60,
        description: "See master artisans craft intricate silver jewelry.",
      },
      {
        title: "Traditional Market",
        minutes: 40,
        description: "Experience the vibrant market and local street food.",
      },
      {
        title: "Heritage Houses",
        minutes: 45,
        description:
          "Explore preserved colonial era houses with Dutch and Javanese blend.",
      },
    ],

    meetingPoints: [
      {
        type: "WALK IN",
        icon: "walk",
        title: "Masjid Gede Mataram Kotagede",
        note: "Meet at the main entrance 15 minutes before departure",
        address: "Jagalan, Kotagede, Yogyakarta 55143, Indonesia",
      },
      {
        type: "CAR",
        icon: "car",
        title: "Jambon Kidul, Yogyakarta",
        note: "Free hotel pickup available in Kotagede area",
        address: "Jalan Raya Janti, Caturtunggal, Sleman, 55281",
      },
    ],
  },

  // 2) MARKET EXPERIENCE
  {
    slug: "morning-market-experience",
    title: "Morning Market Experience",
    subtitle: "Taste local breakfast and learn market life with a guide.",
    hero: "/tour/pasar.png",
    image: "/tour/pasar.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Daily, 06:30",
    duration: "2.5 hours",
    group: "2–10 people",
    price: "IDR 120,000",
    category: ["culture", "food"],

    about:
      "Start your day at the traditional market, taste local breakfast, and learn stories from vendors who keep the culture alive.",

    itinerary: [
      {
        title: "Traditional Breakfast",
        minutes: 30,
        description: "Try warm rice cakes and local coffee.",
      },
      {
        title: "Market Walk",
        minutes: 60,
        description: "Explore fresh produce and spice alleys.",
      },
      {
        title: "Story Corner",
        minutes: 40,
        description: "Chat with vendors and learn market history.",
      },
    ],

    meetingPoints: [
      {
        type: "WALK IN",
        icon: "walk",
        title: "Kotagede Main Market Gate",
        note: "Guide will hold a yellow umbrella",
        address: "Jl. Mondorakan, Kotagede, Yogyakarta",
      },
    ],
  },

  // 3) WORKSHOP — Silver Crafting
  {
    slug: "silver-crafting-masterclass",
    title: "Silver Crafting Masterclass",
    subtitle: "Create your own silver ring with a mentor.",
    hero: "/tour/silvera.png",
    image: "/tour/silvera.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Mon–Sat, 09:00 and 13:00",
    duration: "4 hours",
    group: "1–6 people",
    price: "IDR 350,000",
    category: ["workshop", "craft"],

    about:
      "A hands on class that introduces tools, heating, shaping, and polishing. Bring home a ring you made yourself.",

    itinerary: [
      {
        title: "Introduction",
        minutes: 30,
        description: "Safety, tools, and silver basics.",
      },
      {
        title: "Design & Shaping",
        minutes: 90,
        description: "Measure, cut, and shape your piece.",
      },
      {
        title: "Solder & Polish",
        minutes: 90,
        description: "Join parts and finish with polish.",
      },
      {
        title: "Showcase",
        minutes: 30,
        description: "Photo session and certificate.",
      },
    ],

    meetingPoints: [
      {
        type: "WALK IN",
        icon: "pin",
        title: "Workshop Studio",
        note: "Arrive 10 minutes early",
        address: "Jl. Tegalgendu, Kotagede",
      },
    ],
  },

  // 4) WORKSHOP — Silversmith Gallery Tour
  {
    slug: "silversmith-gallery-tour",
    title: "Silversmith Gallery Tour",
    subtitle: "Behind the scenes visit to Kotagede silversmiths.",
    hero: "/tour/silverb.png",
    image: "/tour/silverb.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Daily, 10:00 and 14:00",
    duration: "2 hours",
    group: "2–15 people",
    price: "IDR 130,000",
    category: ["workshop", "culture"],
    about:
      "Walk through small galleries, watch filigree making, and learn how Kotagede became a silver hub.",
    itinerary: [
      {
        title: "Gallery Walk",
        minutes: 60,
        description: "Visit three family owned galleries.",
      },
      {
        title: "Demo Session",
        minutes: 30,
        description: "Filigree and stone setting demo.",
      },
      {
        title: "Q&A",
        minutes: 30,
        description: "Ask about materials and sourcing.",
      },
    ],
    meetingPoints: [
      {
        type: "WALK IN",
        icon: "walk",
        title: "Kotagede Silver Gate",
        note: "In front of gate signage",
        address: "Jl. Kemasan, Kotagede",
      },
    ],
  },

  // 5) WORKSHOP — Traditional Filigree
  {
    slug: "traditional-filigree-workshop",
    title: "Traditional Filigree Workshop",
    subtitle: "Learn classic filigree techniques with a master.",
    hero: "/tour/silverc.png",
    image: "/tour/silverc.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Tue–Sun, 09:00",
    duration: "5 hours",
    group: "1–4 people",
    price: "IDR 400,000",
    category: ["workshop", "craft"],
    about:
      "A deep dive into filigree wire making and pattern building for small pendants.",
    itinerary: [
      {
        title: "Wire Drawing",
        minutes: 60,
        description: "Create fine wires for filigree.",
      },
      {
        title: "Pattern Building",
        minutes: 120,
        description: "Arrange motifs and solder.",
      },
      { title: "Finishing", minutes: 60, description: "Clean and polish." },
    ],
    meetingPoints: [
      {
        type: "WALK IN",
        icon: "pin",
        title: "Filigree Studio",
        note: "Google Maps pin provided after booking",
        address: "Purbayan, Kotagede",
      },
    ],
  },

  // 6) WORKSHOP — Javanese Cooking
  {
    slug: "javanese-cooking-class",
    title: "Javanese Cooking Class",
    subtitle: "Cook classic home dishes with a local host.",
    hero: "/tour/masak.png",
    image: "/tour/masak.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Daily, 11:00",
    duration: "4 hours",
    group: "2–12 people",
    price: "IDR 250,000",
    category: ["workshop", "food"],
    about: "Shop ingredients at a market then cook and eat together.",
    itinerary: [
      {
        title: "Market Shopping",
        minutes: 45,
        description: "Spices, vegetables, and tips.",
      },
      {
        title: "Cooking Session",
        minutes: 120,
        description: "Hands on cooking with guidance.",
      },
      {
        title: "Lunch",
        minutes: 45,
        description: "Enjoy your dishes with tea.",
      },
    ],
    meetingPoints: [
      {
        type: "WALK IN",
        icon: "walk",
        title: "Host Kitchen",
        note: "Exact pin after confirmation",
        address: "Kotagede area",
      },
    ],
  },

  // 7) WORKSHOP — Batik
  {
    slug: "batik-making-workshop",
    title: "Batik Making Workshop",
    subtitle: "Draw, wax, dye, and bring home your batik.",
    hero: "/tour/batik.jpeg",
    image: "/tour/batik.jpeg",
    location: "Kotagede, Yogyakarta",
    schedule: "Mon–Sat, 09:00 and 13:00",
    duration: "3 hours",
    group: "2–8 people",
    price: "IDR 200,000",
    category: ["workshop", "craft"],
    about: "Learn canting technique and color layering with local artisans.",
    itinerary: [
      {
        title: "Motif Sketch",
        minutes: 30,
        description: "Pick or draw your motif.",
      },
      {
        title: "Waxing",
        minutes: 60,
        description: "Use canting to apply hot wax.",
      },
      {
        title: "Dyeing",
        minutes: 45,
        description: "Color process and drying.",
      },
    ],
    meetingPoints: [
      {
        type: "WALK IN",
        icon: "pin",
        title: "Batik House",
        note: "Bring an apron or old shirt",
        address: "Kotagede lane",
      },
    ],
  },

  // 8) WORKSHOP — Pottery
  {
    slug: "pottery-workshop",
    title: "Pottery Workshop",
    subtitle: "Throw your first cup on the wheel.",
    hero: "/tour/pottery.png",
    image: "/tour/pottery.png",
    location: "Kotagede, Yogyakarta",
    schedule: "Fri–Sun, 10:00",
    duration: "3 hours",
    group: "2–8 people",
    price: "IDR 180,000",
    category: ["workshop", "craft"],
    about: "Intro to wheel throwing with glazing options.",
    itinerary: [
      {
        title: "Clay Prep",
        minutes: 30,
        description: "Wedging and centering.",
      },
      {
        title: "Wheel Session",
        minutes: 90,
        description: "Form a cup or bowl.",
      },
      {
        title: "Trim & Dry",
        minutes: 60,
        description: "Basic trim and drying tips.",
      },
    ],
    meetingPoints: [
      {
        type: "WALK IN",
        icon: "pin",
        title: "Pottery Studio",
        note: "Wear clothes you do not mind staining",
        address: "Kotagede",
      },
    ],
  },
];

// Helpers
export function getAllTours() {
  return TOURS;
}

export function getTourBySlug(slug) {
  return TOURS.find((t) => t.slug === slug);
}

export function getRelatedTours(currentSlug, limit = 8) {
  return getAllTours()
    .filter((t) => t.slug !== currentSlug)
    .slice(0, limit)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      img: t.image || t.hero || "/fallbacks/tour-hero.jpg",
      duration: t.duration,
      people: t.group,
      price: t.price,
    }));
}
