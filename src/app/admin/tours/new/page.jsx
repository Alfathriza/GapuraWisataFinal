// src/app/admin/tours/new/page.jsx
import TourForm from "@/components/admin/forms/TourForm";

export default function NewTourPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Tour</h1>
        <p className="text-slate-600 mt-1">Add a new tour to the system</p>
      </div>
      <TourForm />
    </div>
  );
}

