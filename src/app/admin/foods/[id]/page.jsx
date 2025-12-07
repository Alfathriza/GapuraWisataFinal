// src/app/admin/foods/[id]/page.jsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DishForm from "@/components/admin/forms/DishForm";

export default async function EditDishPage({ params }) {
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
    },
  });

  if (!dish) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Dish</h1>
        <p className="text-slate-600 mt-1">{dish.title}</p>
      </div>
      <DishForm dishId={id} initialData={dish} />
    </div>
  );
}

