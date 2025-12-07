// src/app/admin/tours/page.jsx
import ToursTable from "@/components/admin/tables/ToursTable";

export default function ToursPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tours Management</h1>
        <p className="text-slate-600 mt-1">Manage all tours and activities</p>
      </div>
      <ToursTable />
    </div>
  );
}

