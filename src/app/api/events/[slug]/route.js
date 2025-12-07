// src/app/api/events/[slug]/route.js
// Public API route untuk get event by slug (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/events/[slug]
 * Get event by slug (public, no auth required)
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
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

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Get event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

