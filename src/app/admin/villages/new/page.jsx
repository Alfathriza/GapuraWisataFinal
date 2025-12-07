// src/app/admin/villages/new/page.jsx
import VillageForm from "@/components/admin/forms/VillageForm";

export default function CreateVillagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Village</h1>
        <p className="text-slate-600 mt-1">Add a new village to the system</p>
      </div>
      <VillageForm />
    </div>
  );
}

