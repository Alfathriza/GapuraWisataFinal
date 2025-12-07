// src/app/api/admin/foods/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/admin/auth";

/**
 * GET /api/admin/foods
 * List all dishes with filter by type
 */
export async function GET(request) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";

    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { subtitle: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(type && { type }),
    };

    const [dishes, total] = await Promise.all([
      prisma.dish.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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
      }),
      prisma.dish.count({ where }),
    ]);

    return NextResponse.json({
      dishes,
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
    console.error("Get dishes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/foods
 * Create new dish
 */
export async function POST(request) {
  try {
    await requireAuth();

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

    // Validate required fields
    if (!type || !slug || !title) {
      return NextResponse.json(
        { error: "Type, slug, and title are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.dish.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Dish with this slug already exists" },
        { status: 400 }
      );
    }

    // Create dish with nested relations
    const dish = await prisma.dish.create({
      data: {
        type,
        slug,
        title,
        subtitle,
        price,
        image,
        badges: badges || [],
        about: about || [],
        quote,
        villageId,
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

    return NextResponse.json({ dish }, { status: 201 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Create dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

