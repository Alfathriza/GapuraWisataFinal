// src/app/api/admin/villages/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/villages
 * List all villages
 */
export async function GET() {
  try {
    await requireAuth();

    const villages = await prisma.village.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json({ villages });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get villages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/villages
 * Create new village
 */
export async function POST(request) {
  try {
    await requireAuth();

    const body = await request.json();
    const { key, title, img, blurb } = body;

    // Validate required fields
    if (!key || !title || !img || !blurb) {
      return NextResponse.json(
        { error: "Key, title, image, and blurb are required" },
        { status: 400 }
      );
    }

    // Check if key already exists
    const existing = await prisma.village.findUnique({
      where: { key },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Village with this key already exists" },
        { status: 400 }
      );
    }

    // Create village
    const village = await prisma.village.create({
      data: {
        key,
        title,
        img,
        blurb,
      },
    });

    return NextResponse.json({ village }, { status: 201 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create village error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/villages
 * Update village (bulk update)
 */
export async function PUT(request) {
  try {
    await requireAuth();

    const body = await request.json();
    const { villages } = body;

    if (!Array.isArray(villages)) {
      return NextResponse.json(
        { error: "Villages must be an array" },
        { status: 400 }
      );
    }

    const updated = await Promise.all(
      villages.map((village) =>
        prisma.village.update({
          where: { id: village.id },
          data: {
            key: village.key,
            title: village.title,
            img: village.img,
            blurb: village.blurb,
          },
        })
      )
    );

    return NextResponse.json({ villages: updated });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update villages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

