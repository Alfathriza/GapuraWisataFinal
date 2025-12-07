// src/app/api/admin/tours/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/tours
 * List all tours with pagination
 */
export async function GET(request) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { subtitle: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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
      }),
      prisma.tour.count({ where }),
    ]);

    return NextResponse.json({
      tours,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get tours error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tours
 * Create new tour
 */
export async function POST(request) {
  try {
    await requireAuth();

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

    // Validate required fields
    if (!slug || !title || !location || !schedule || !duration || !group || !price || !about) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.tour.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Tour with this slug already exists" },
        { status: 400 }
      );
    }

    // Create tour with nested relations
    const tour = await prisma.tour.create({
      data: {
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
        category: category || [],
        about,
        villageId: villageId || null,
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

    return NextResponse.json({ tour }, { status: 201 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

