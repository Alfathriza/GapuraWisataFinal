// src/app/api/admin/events/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/events/[id]
 * Get event by ID
 */
export async function GET(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
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
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/events/[id]
 * Update event
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

    // Check if event exists
    const existing = await prisma.event.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if slug is being changed and if new slug already exists
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.event.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Event with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Delete existing relations
    await prisma.eventHighlight.deleteMany({ where: { eventId: id } });
    await prisma.eventSchedule.deleteMany({ where: { eventId: id } });
    await prisma.eventGallery.deleteMany({ where: { eventId: id } });
    if (existing.location) {
      await prisma.eventLocation.delete({ where: { eventId: id } });
    }
    if (existing.seo) {
      await prisma.eventSEO.delete({ where: { eventId: id } });
    }

    // Update event
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(slug && { slug }),
        ...(title && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(tag !== undefined && { tag }),
        ...(category !== undefined && { category }),
        ...(dateLabel !== undefined && { dateLabel }),
        ...(where !== undefined && { where }),
        ...(image !== undefined && { image }),
        ...(href !== undefined && { href }),
        ...(excerpt !== undefined && { excerpt }),
        ...(dateStart && { dateStart: new Date(dateStart) }),
        ...(dateEnd && { dateEnd: new Date(dateEnd) }),
        ...(time !== undefined && { time }),
        ...(hero !== undefined && { hero }),
        ...(about !== undefined && { about }),
        ...(expect !== undefined && { expect }),
        ...(villageId !== undefined && { villageId: villageId || null }),
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

    return NextResponse.json({ event });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events/[id]
 * Delete event
 */
export async function DELETE(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Cascade delete will handle all relations
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

