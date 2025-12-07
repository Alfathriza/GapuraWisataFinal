// src/app/admin/villages/page.jsx
import Link from "next/link";
import VillagesTable from "@/components/admin/tables/VillagesTable";

export default function VillagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Villages Management</h1>
          <p className="text-slate-600 mt-1">Manage village information</p>
        </div>
        <Link
          href="/admin/villages/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Add New Village
        </Link>
      </div>
      <VillagesTable />
    </div>
  );
}

