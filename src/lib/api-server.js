// src/lib/api-server.js
// Server-side API helpers (menggunakan Prisma langsung, tanpa HTTP fetch)
// Gunakan ini di Server Components untuk performa lebih baik

import { prisma } from "@/lib/prisma";

/**
 * Get all tours (server-side)
 */
export async function getAllToursServer(params = {}) {
  const where = {
    ...(params.search && {
      OR: [
        { title: { contains: params.search, mode: "insensitive" } },
        { subtitle: { contains: params.search, mode: "insensitive" } },
        { slug: { contains: params.search, mode: "insensitive" } },
      ],
    }),
    ...(params.category && { category: { has: params.category } }),
    ...(params.village && {
      village: {
        OR: [
          { key: { contains: params.village, mode: "insensitive" } },
          { title: { contains: params.village, mode: "insensitive" } },
        ],
      },
    }),
  };

  return await prisma.tour.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
        },
      },
      itinerary: {
        orderBy: { order: "asc" },
      },
      meetingPoints: {
        orderBy: { order: "asc" },
      },
    },
  });
}

/**
 * Get tour by slug (server-side)
 */
export async function getTourBySlugServer(slug) {
  return await prisma.tour.findUnique({
    where: { slug },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
          blurb: true,
        },
      },
      itinerary: {
        orderBy: { order: "asc" },
      },
      meetingPoints: {
        orderBy: { order: "asc" },
      },
    },
  });
}

/**
 * Get all dishes (server-side)
 */
export async function getAllDishesServer(params = {}) {
  const where = {
    ...(params.type && { type: params.type }),
    ...(params.search && {
      OR: [
        { title: { contains: params.search, mode: "insensitive" } },
        { subtitle: { contains: params.search, mode: "insensitive" } },
        { slug: { contains: params.search, mode: "insensitive" } },
      ],
    }),
    ...(params.village && {
      village: {
        OR: [
          { key: { contains: params.village, mode: "insensitive" } },
          { title: { contains: params.village, mode: "insensitive" } },
        ],
      },
    }),
  };

  return await prisma.dish.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
        },
      },
      gallery: {
        orderBy: { order: "asc" },
      },
      location: true,
      menuItems: {
        orderBy: { order: "asc" },
      },
    },
  });
}

/**
 * Get dish by slug (server-side)
 */
export async function getDishBySlugServer(slug) {
  return await prisma.dish.findUnique({
    where: { slug },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
          blurb: true,
        },
      },
      gallery: {
        orderBy: { order: "asc" },
      },
      location: true,
      menuItems: {
        orderBy: { order: "asc" },
      },
    },
  });
}

/**
 * Get all events (server-side)
 */
export async function getAllEventsServer(params = {}) {
  const where = {
    ...(params.search && {
      OR: [
        { title: { contains: params.search, mode: "insensitive" } },
        { subtitle: { contains: params.search, mode: "insensitive" } },
        { slug: { contains: params.search, mode: "insensitive" } },
      ],
    }),
    ...(params.village && {
      village: {
        OR: [
          { key: { contains: params.village, mode: "insensitive" } },
          { title: { contains: params.village, mode: "insensitive" } },
        ],
      },
    }),
    ...(params.month && {
      dateStart: {
        gte: new Date(`${params.month}-01`),
        lt: new Date(`${params.month}-31`),
      },
    }),
  };

  return await prisma.event.findMany({
    where,
    orderBy: { dateStart: "asc" },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
        },
      },
      location: true,
      highlights: {
        orderBy: { order: "asc" },
      },
      schedule: {
        orderBy: { order: "asc" },
      },
      gallery: {
        orderBy: { order: "asc" },
      },
      seo: true,
    },
  });
}

/**
 * Get event by slug (server-side)
 */
export async function getEventBySlugServer(slug) {
  return await prisma.event.findUnique({
    where: { slug },
    include: {
      village: {
        select: {
          id: true,
          key: true,
          title: true,
          img: true,
          blurb: true,
        },
      },
      location: true,
      highlights: {
        orderBy: { order: "asc" },
      },
      schedule: {
        orderBy: { order: "asc" },
      },
      gallery: {
        orderBy: { order: "asc" },
      },
      seo: true,
    },
  });
}

/**
 * Get all villages (server-side)
 */
export async function getAllVillagesServer() {
  return await prisma.village.findMany({
    orderBy: { title: "asc" },
  });
}

/**
 * Get village by key (server-side)
 */
export async function getVillageByKeyServer(key) {
  return await prisma.village.findUnique({
    where: { key },
  });
}

