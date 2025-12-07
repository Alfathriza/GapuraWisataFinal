// src/app/api/tours/[slug]/route.js
// Public API route untuk get tour by slug (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/tours/[slug]
 * Get tour by slug (public, no auth required)
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const tour = await prisma.tour.findUnique({
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

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ tour });
  } catch (error) {
    console.error("Get tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

