// src/app/admin/events/[id]/page.jsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/admin/forms/EventForm";

export default async function EditEventPage({ params }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
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
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Event</h1>
        <p className="text-slate-600 mt-1">{event.title}</p>
      </div>
      <EventForm eventId={id} initialData={event} />
    </div>
  );
}

