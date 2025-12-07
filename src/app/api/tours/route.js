// src/app/api/tours/route.js
// Public API route untuk tours (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/tours
 * List all tours (public, no auth required)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const village = searchParams.get("village") || "";

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { subtitle: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(category && { category: { has: category } }),
      ...(village && {
        village: {
          OR: [
            { key: { contains: village, mode: "insensitive" } },
            { title: { contains: village, mode: "insensitive" } },
          ],
        },
      }),
    };

    const tours = await prisma.tour.findMany({
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

    return NextResponse.json({ tours });
  } catch (error) {
    console.error("Get tours error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

