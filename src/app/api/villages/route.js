// src/app/api/villages/route.js
// Public API route untuk villages (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/villages
 * List all villages (public, no auth required)
 */
export async function GET() {
  try {
    const villages = await prisma.village.findMany({
      orderBy: { title: "asc" },
    });

    return NextResponse.json({ villages });
  } catch (error) {
    console.error("Get villages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

