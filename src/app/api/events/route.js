// src/app/api/events/route.js
// Public API route untuk events (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/events
 * List all events (public, no auth required)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") || "";
    const search = searchParams.get("search") || "";
    const village = searchParams.get("village") || "";

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { subtitle: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(village && {
        village: {
          OR: [
            { key: { contains: village, mode: "insensitive" } },
            { title: { contains: village, mode: "insensitive" } },
          ],
        },
      }),
      ...(month && {
        dateStart: {
          gte: new Date(`${month}-01`),
          lt: new Date(`${month}-31`),
        },
      }),
    };

    const events = await prisma.event.findMany({
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

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

