// src/app/api/dishes/[slug]/route.js
// Public API route untuk get dish by slug (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/dishes/[slug]
 * Get dish by slug (public, no auth required)
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const dish = await prisma.dish.findUnique({
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

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json({ dish });
  } catch (error) {
    console.error("Get dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

