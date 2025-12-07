// src/app/api/admin/events/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/events
 * List all events with date filter
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

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateStart: "asc" },
        include: {
          village: {
            select: {
              id: true,
              key: true,
              title: true,
            },
          },
          location: true,
          highlights: {
            orderBy: { order: "asc" },
          },
          schedule: {
            orderBy: { order: "asc" },
          },
          gallery: {
            orderBy: { order: "asc" },
          },
          seo: true,
        },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events,
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
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/events
 * Create new event
 */
export async function POST(request) {
  try {
    await requireAuth();

    const body = await request.json();
    const {
      slug,
      title,
      subtitle,
      tag,
      category,
      dateLabel,
      where,
      image,
      href,
      excerpt,
      dateStart,
      dateEnd,
      time,
      hero,
      about,
      expect,
      villageId,
      location,
      highlights,
      schedule,
      gallery,
      seo,
    } = body;

    // Validate required fields
    if (!slug || !title || !dateStart || !dateEnd) {
      return NextResponse.json(
        { error: "Slug, title, dateStart, and dateEnd are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.event.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Event with this slug already exists" },
        { status: 400 }
      );
    }

    // Create event with nested relations
    const event = await prisma.event.create({
      data: {
        slug,
        title,
        subtitle,
        tag,
        category: category || [],
        dateLabel,
        where,
        image,
        href,
        excerpt,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        time,
        hero,
        about: about || [],
        expect: expect || [],
        villageId: villageId || null,
        location: location
          ? {
              create: {
                name: location.name,
                lat: location.lat,
                lng: location.lng,
                address: location.address,
              },
            }
          : undefined,
        highlights: {
          create: (highlights || []).map((item, index) => ({
            img: item.img,
            caption: item.caption,
            order: index,
          })),
        },
        schedule: {
          create: (schedule || []).map((item, index) => ({
            day: item.day,
            date: new Date(item.date),
            items: item.items || [],
            order: index,
          })),
        },
        gallery: {
          create: (gallery || []).map((src, index) => ({
            src,
            alt: "",
            order: index,
          })),
        },
        seo: seo
          ? {
              create: {
                description: seo.description,
                keywords: seo.keywords || [],
              },
            }
          : undefined,
      },
      include: {
        village: {
          select: {
            id: true,
            key: true,
            title: true,
          },
        },
        location: true,
        highlights: true,
        schedule: true,
        gallery: true,
        seo: true,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

