// src/app/admin/villages/[id]/page.jsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VillageForm from "@/components/admin/forms/VillageForm";

export default async function EditVillagePage({ params }) {
  const { id } = await params;

  const village = await prisma.village.findUnique({
    where: { id },
  });

  if (!village) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Village</h1>
        <p className="text-slate-600 mt-1">{village.title}</p>
      </div>
      <VillageForm villageId={id} initialData={village} />
    </div>
  );
}

