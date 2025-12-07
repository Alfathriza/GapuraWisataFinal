// src/app/food/data.js
// Single source of truth for foods, drinks, places, events

export const DISHES = [
  /* --------------------- Traditional Foods --------------------- */
  {
    type: "food",
    slug: "kipo",
    title: "Kipo, The Sweet Bite of Kotagede",
    subtitle:
      "A traditional snack wrapped in banana leaves, carrying centuries of Javanese flavor.",
    price: "Rp 15.000",
    image: "/food.png", // Default image karena /food/kipo/hero.jpg tidak ada
    badges: ["Available daily", "Kotagede Culinary Spot"],
    about: [
      "Kipo is a beloved traditional snack from Kotagede, made with green sticky rice flour, fresh coconut filling, and wrapped in fragrant banana leaves. This delicate treat has been passed down through generations.",
      "The vibrant green color comes from natural pandan leaves, while the sweet coconut filling is enhanced with palm sugar and a hint of vanilla. Each piece is carefully crafted by hand and steamed to perfection.",
    ],
    quote: "Every bite of Kipo tells a story of the Mataram Kingdom.",
    gallery: [
      { src: "/food.png", alt: "Kipo platter", ratio: "4/3" }, // Default image
      { src: "/food.png", alt: "Kipo close up", ratio: "1/1" }, // Default image
      {
        src: "/food.png",
        alt: "Assorted traditional snacks",
        ratio: "4/5",
      }, // Default image
    ],
    location: {
      title: "Pasar Legi Kotagede",
      address: "Jl. Mondorakan, Prenggan, Kotagede, Yogyakarta",
      hours: "Daily 08.00–18.00",
      phone: "+62 274 123 4567",
      mapUrl: "https://www.google.com/maps?q=Pasar+Legi+Kotagede",
      photo: "/food.png", // Default image karena /food/location/pasar-legi.jpg tidak ada
    },
  },

  {
    type: "food",
    slug: "rambak-noya",
    title: "Rambak Noya",
    subtitle:
      "Crispy fried cassava pastries with a delicate golden crust, served fresh from traditional kitchens.",
    price: "Rp 8.000",
    image: "/food.png", // Default image karena /food/rambak-noya.jpg tidak ada
    badges: ["Fresh daily"],
    about: [
      "Rambak Noya offers a light crunchy bite with a subtle savory finish. Made from hand-selected cassava and fried at steady heat for consistent texture.",
    ],
    quote: "Simple ingredients, memorable crunch.",
    gallery: [
      { src: "/food.png", alt: "Rambak Noya", ratio: "4/3" }, // Default image
    ],
    location: {
      title: "Kotagede Culinary Spot",
      address: "Area Kotagede Heritage District",
      hours: "Daily 09.00–17.00",
      phone: "+62 811 000 111",
      mapUrl: "https://www.google.com/maps?q=Kotagede",
    },
  },

  {
    type: "food",
    slug: "yangko",
    title: "Yangko",
    subtitle:
      "Soft glutinous rice snacks dusted with sugar, perfect with afternoon tea.",
    price: "Rp 5.000",
    image: "/food.png", // Default image karena /food/yangko.jpg tidak ada
    badges: ["Local favorite"],
    about: [
      "Yangko has a chewy texture and sweet aroma. The dough is kneaded and folded several times to reach the right elasticity.",
    ],
    quote: "Chewy, sweet, unforgettable.",
    gallery: [{ src: "/food.png", alt: "Yangko", ratio: "4/3" }], // Default image
    location: {
      title: "Kotagede Market Kiosks",
      address: "Pasar Kotagede area",
      hours: "Daily 07.00–17.00",
      phone: "+62 812 222 333",
      mapUrl: "https://www.google.com/maps?q=Pasar+Kotagede",
    },
  },

  {
    type: "food",
    slug: "intip",
    title: "Intip",
    subtitle:
      "Crispy rice crackers made from the bottom layer of traditional rice pots.",
    price: "Rp 7.000",
    image: "/food.png", // Default image karena /food/intip.jpg tidak ada
    badges: ["Crispy snack"],
    about: [
      "Intip is dried and fried until puffed and crunchy. Lightly salted to highlight the natural rice aroma.",
    ],
    quote: "The classic crunch everyone loves.",
    gallery: [{ src: "/food.png", alt: "Intip", ratio: "4/3" }], // Default image
    location: {
      title: "Street vendors around Kotagede",
      address: "Heritage district lanes",
      hours: "Daily 10.00–18.00",
      phone: "+62 813 333 444",
      mapUrl: "https://www.google.com/maps?q=Kotagede",
    },
  },

  {
    type: "food",
    slug: "wingko",
    title: "Wingko",
    subtitle:
      "Traditional coconut rice cakes with a sweet, toasty surface and pandan aroma.",
    price: "Rp 6.000",
    image: "/food.png", // Default image karena /food/wingko.jpg tidak ada
    badges: ["Best with tea"],
    about: [
      "Wingko blends grated coconut, glutinous rice flour, and palm sugar. Pan-grilled for a caramelized edge and soft center.",
    ],
    quote: "Toasty outside, tender inside.",
    gallery: [{ src: "/food.png", alt: "Wingko", ratio: "4/3" }], // Default image
    location: {
      title: "Kotagede Culinary Spot",
      address: "Heritage food stalls",
      hours: "Daily 09.00–19.00",
      phone: "+62 815 444 555",
      mapUrl: "https://www.google.com/maps?q=Kotagede+Culinary+Spot",
    },
  },

  /* --------------------- Traditional Drinks --------------------- */
  {
    type: "drink",
    slug: "wedang-uwuh",
    title: "Wedang Uwuh",
    subtitle: "Aromatic herbal tea blend with spices and leaves served warm.",
    price: "Rp 10.000",
    image: "/food.png", // Default image karena /drink/wedang-uwuh.jpg tidak ada
    badges: ["Warm and soothing"],
    about: [
      "Wedang Uwuh combines cinnamon, cloves, nutmeg leaves, and ginger. The spices are simmered to release their aroma and warmth.",
    ],
    quote: "Comfort in a cup.",
    gallery: [
      { src: "/food.png", alt: "Wedang Uwuh", ratio: "4/3" }, // Default image
    ],
    location: {
      title: "Kotagede Culinary Spot",
      address: "Near market gate",
      hours: "Daily 16.00–22.00",
      phone: "+62 816 555 666",
      mapUrl: "https://www.google.com/maps?q=Kotagede+Culinary+Spot",
    },
  },

  {
    type: "drink",
    slug: "wedang-ronde",
    title: "Wedang Ronde",
    subtitle: "Sweet ginger soup with glutinous rice balls and peanuts.",
    price: "Rp 12.000",
    image: "/food.png", // Default image karena /drink/wedang-ronde.jpg tidak ada
    badges: ["Night stall favorite"],
    about: [
      "Warm ginger broth meets chewy rice balls. A comforting street classic for cool evenings in Yogyakarta.",
    ],
    quote: "Best enjoyed at night.",
    gallery: [
      { src: "/food.png", alt: "Wedang Ronde", ratio: "4/3" }, // Default image
    ],
    location: {
      title: "Alun-alun Kotagede area",
      address: "Night stalls",
      hours: "Daily 18.00–23.00",
      phone: "+62 817 777 888",
      mapUrl: "https://www.google.com/maps?q=Alun+alun+Kotagede",
    },
  },

  {
    type: "drink",
    slug: "jamu",
    title: "Jamu",
    subtitle:
      "Traditional herbal tonic from turmeric, ginger, and natural ingredients.",
    price: "Rp 8.000",
    image: "/food.png", // Default image karena /drink/jamu.jpg tidak ada
    badges: ["Healthy choice"],
    about: [
      "Jamu variations balance taste and function. Common blends include turmeric tamarind and ginger honey.",
    ],
    quote: "Nature in a bottle.",
    gallery: [{ src: "/food.png", alt: "Jamu bottles", ratio: "4/3" }], // Default image
    location: {
      title: "Mobile jamu vendors",
      address: "Around Kotagede lanes",
      hours: "Daily 07.00–11.00",
      phone: "+62 818 999 000",
      mapUrl: "https://www.google.com/maps?q=Kotagede",
    },
  },

  /* --------------------- Places --------------------- */
  {
    type: "place",
    slug: "kotagede-market",
    title: "Kotagede Market",
    subtitle: "Morning hub for fresh ingredients and classic flavors.",
    image: "/food.png", // Default image
    about: [
      "The traditional market of Kotagede, home to fresh produce and heritage snacks.",
    ],
    menuItems: [],
    gallery: [],
    location: {
      title: "Pasar Kotagede",
      address: "Pasar Kotagede area",
      hours: "Daily 06.00–12.00",
      phone: "",
      mapUrl: "https://www.google.com/maps?q=Pasar+Kotagede",
      photo: "",
    },
  },
  {
    type: "place",
    slug: "warung-tradisional",
    title: "Traditional Warung",
    subtitle: "Home-style cooking with authentic taste.",
    image: "/food.png", // Default image
    about: ["Casual dining space serving beloved Javanese home dishes."],
    menuItems: [],
    gallery: [],
    location: {
      title: "Kotagede",
      address: "Heritage district lanes",
      hours: "Daily 08.00–20.00",
      phone: "",
      mapUrl: "https://www.google.com/maps?q=Kotagede",
      photo: "",
    },
  },

  {
    type: "place",
    slug: "omah-dhuwur",
    title: "Omah Dhuwur Heritage",
    subtitle:
      "A beautifully restored Javanese noble house transformed into a dining experience.",
    image: "/food.png", // Default image karena /places/omah-dhuwur.jpg tidak ada
    about: [
      "Experience traditional cuisine served in antique porcelain and colonial-era furniture.",
      "Perfect spot to enjoy Kipo and Javanese ambiance.",
    ],
    menuItems: [
      {
        title: "Kipo Original",
        desc: "Grilled rice cake with coconut sugar filling",
        price: "Rp 15.000",
      },
      {
        title: "Jadah Manten",
        desc: "Sticky rice sandwich with coconut",
        price: "Rp 20.000",
      },
      {
        title: "Wedang Jahe",
        desc: "Spiced tea with palm sugar",
        price: "Rp 10.000",
      },
    ],
    gallery: [
      { src: "/food.png", alt: "Dining area" }, // Default image
      { src: "/food.png", alt: "Interior" }, // Default image
    ],
    location: {
      title: "Jl. Kemasan, Kotagede",
      desc: "Located near Pasar Legi, 2 minutes walk from Masjid Agung.",
      address: "Jl. Kemasan No.45, Kotagede",
      hours: "08.00–16.00",
      phone: "+62 274 567 8901",
      mapUrl: "https://www.google.com/maps?q=Omah+Dhuwur+Kotagede",
      photo: "/food.png", // Default image
    },
  },

  /* --------------------- Events --------------------- */
  {
    type: "event",
    slug: "kotagede-food-festival",
    title: "Kotagede Food Festival",
    subtitle: "Annual celebration of heritage cuisine and local culture.",
    image: "/food.png", // Default image
    about: [
      "Taste authentic local dishes, meet artisans, and enjoy live performances in Kotagede square.",
      "Held every August, this festival gathers culinary masters and visitors across Yogyakarta.",
    ],
  },
];

/* ------------------------- Helpers ------------------------- */
export function getAllDishes() {
  return DISHES;
}
export function getFoods() {
  return DISHES.filter((d) => d.type === "food");
}
export function getDrinks() {
  return DISHES.filter((d) => d.type === "drink");
}
export function getPlaces() {
  return DISHES.filter((d) => d.type === "place");
}
export function getEvents() {
  return DISHES.filter((d) => d.type === "event");
}
export function getDishBySlug(slug) {
  return DISHES.find((d) => d.slug === slug);
}
