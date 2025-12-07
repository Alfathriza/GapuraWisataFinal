// src/app/api/dishes/route.js
// Public API route untuk dishes (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/dishes
 * List all dishes (public, no auth required)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "";
    const search = searchParams.get("search") || "";
    const village = searchParams.get("village") || "";

    const where = {
      ...(type && { type }),
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
    };

    const dishes = await prisma.dish.findMany({
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

    return NextResponse.json({ dishes });
  } catch (error) {
    console.error("Get dishes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

