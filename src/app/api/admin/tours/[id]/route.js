// src/app/api/admin/tours/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/tours/[id]
 * Get tour by ID
 */
export async function GET(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const tour = await prisma.tour.findUnique({
      where: { id },
      include: {
        village: {
          select: {
            id: true,
            key: true,
            title: true,
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
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/tours/[id]
 * Update tour
 */
export async function PUT(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;
    const body = await request.json();

    const {
      slug,
      title,
      subtitle,
      hero,
      image,
      location,
      schedule,
      duration,
      group,
      price,
      category,
      about,
      villageId,
      itinerary,
      meetingPoints,
    } = body;

    // Check if tour exists
    const existing = await prisma.tour.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Check if slug is being changed and if new slug already exists
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.tour.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Tour with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Delete existing itinerary and meeting points, then create new ones
    await prisma.itineraryItem.deleteMany({
      where: { tourId: id },
    });

    await prisma.meetingPoint.deleteMany({
      where: { tourId: id },
    });

    // Update tour
    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...(slug && { slug }),
        ...(title && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(hero !== undefined && { hero }),
        ...(image !== undefined && { image }),
        ...(location && { location }),
        ...(schedule && { schedule }),
        ...(duration && { duration }),
        ...(group && { group }),
        ...(price && { price }),
        ...(category !== undefined && { category }),
        ...(about && { about }),
        ...(villageId !== undefined && { villageId: villageId || null }),
        itinerary: {
          create: (itinerary || []).map((item, index) => ({
            title: item.title,
            minutes: item.minutes,
            description: item.description,
            order: index,
          })),
        },
        meetingPoints: {
          create: (meetingPoints || []).map((point, index) => ({
            type: point.type,
            icon: point.icon,
            title: point.title,
            note: point.note,
            address: point.address,
            order: index,
          })),
        },
      },
      include: {
        village: {
          select: {
            id: true,
            key: true,
            title: true,
          },
        },
        itinerary: true,
        meetingPoints: true,
      },
    });

    return NextResponse.json({ tour });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/tours/[id]
 * Delete tour
 */
export async function DELETE(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const tour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Cascade delete will handle itinerary and meeting points
    await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Tour deleted successfully" });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

