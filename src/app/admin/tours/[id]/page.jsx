// src/app/admin/tours/[id]/page.jsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TourForm from "@/components/admin/forms/TourForm";

export default async function EditTourPage({ params }) {
  const { id } = await params;

  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
      itinerary: {
        orderBy: { order: "asc" },
      },
      meetingPoints: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!tour) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Tour</h1>
        <p className="text-slate-600 mt-1">{tour.title}</p>
      </div>
      <TourForm tourId={id} initialData={tour} />
    </div>
  );
}

