// src/app/api/admin/villages/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/villages/[id]
 * Get village by ID
 */
export async function GET(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const village = await prisma.village.findUnique({
      where: { id },
    });

    if (!village) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    return NextResponse.json({ village });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get village error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/villages/[id]
 * Update village
 */
export async function PUT(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;
    const body = await request.json();
    const { key, title, img, blurb } = body;

    // Check if village exists
    const existing = await prisma.village.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    // Check if key is being changed and if new key already exists
    if (key && key !== existing.key) {
      const keyExists = await prisma.village.findUnique({
        where: { key },
      });

      if (keyExists) {
        return NextResponse.json(
          { error: "Village with this key already exists" },
          { status: 400 }
        );
      }
    }

    // Update village
    const village = await prisma.village.update({
      where: { id },
      data: {
        ...(key && { key }),
        ...(title && { title }),
        ...(img !== undefined && { img }),
        ...(blurb && { blurb }),
      },
    });

    return NextResponse.json({ village });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update village error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/villages/[id]
 * Delete village
 */
export async function DELETE(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const village = await prisma.village.findUnique({
      where: { id },
    });

    if (!village) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    // Delete village (cascade will set villageId to null in tours and events)
    await prisma.village.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Village deleted successfully" });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete village error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
