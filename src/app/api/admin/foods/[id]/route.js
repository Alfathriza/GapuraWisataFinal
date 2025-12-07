// src/app/api/admin/foods/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/foods/[id]
 * Get dish by ID
 */
export async function GET(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const dish = await prisma.dish.findUnique({
      where: { id },
      include: {
        gallery: {
          orderBy: { order: "asc" },
        },
        location: true,
        menuItems: {
          orderBy: { order: "asc" },
        },
        village: true,
      },
    });

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json({ dish });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Get dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/foods/[id]
 * Update dish
 */
export async function PUT(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;
    const body = await request.json();

    const {
      type,
      slug,
      title,
      subtitle,
      price,
      image,
      badges,
      about,
      quote,
      gallery,
      location,
      menuItems,
      villageId,
    } = body;

    // Check if dish exists
    const existing = await prisma.dish.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // Check if slug is being changed and if new slug already exists
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.dish.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Dish with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Delete existing relations
    await prisma.galleryItem.deleteMany({ where: { dishId: id } });
    await prisma.menuItem.deleteMany({ where: { dishId: id } });
    if (existing.location) {
      await prisma.location.delete({ where: { dishId: id } });
    }

    // Update dish
    const dish = await prisma.dish.update({
      where: { id },
      data: {
        ...(type && { type }),
        ...(slug && { slug }),
        ...(title && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(price !== undefined && { price }),
        ...(image !== undefined && { image }),
        ...(badges !== undefined && { badges }),
        ...(about !== undefined && { about }),
        ...(quote !== undefined && { quote }),
        ...(villageId !== undefined && { villageId }),
        gallery: {
          create: (gallery || []).map((item, index) => ({
            src: item.src,
            alt: item.alt,
            ratio: item.ratio,
            order: index,
          })),
        },
        location: location
          ? {
              create: {
                title: location.title,
                desc: location.desc,
                address: location.address,
                hours: location.hours,
                phone: location.phone,
                mapUrl: location.mapUrl,
                photo: location.photo,
                lat: location.lat,
                lng: location.lng,
              },
            }
          : undefined,
        menuItems: {
          create: (menuItems || []).map((item, index) => ({
            title: item.title,
            desc: item.desc,
            price: item.price,
            order: index,
          })),
        },
      },
      include: {
        gallery: true,
        location: true,
        menuItems: true,
        village: true,
      },
    });

    return NextResponse.json({ dish });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Update dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/foods/[id]
 * Delete dish
 */
export async function DELETE(request, { params }) {
  try {
    await requireAuth();

    const { id } = await params;

    const dish = await prisma.dish.findUnique({
      where: { id },
    });

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // Cascade delete will handle gallery, location, and menu items
    await prisma.dish.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Dish deleted successfully" });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Delete dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

