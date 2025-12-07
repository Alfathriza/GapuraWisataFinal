// src/app/api/villages/[key]/route.js
// Public API route untuk get village by key (tanpa auth)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/villages/[key]
 * Get village by key (public, no auth required)
 */
export async function GET(request, { params }) {
  try {
    const { key } = await params;

    const village = await prisma.village.findUnique({
      where: { key },
    });

    if (!village) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    return NextResponse.json({ village });
  } catch (error) {
    console.error("Get village error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

