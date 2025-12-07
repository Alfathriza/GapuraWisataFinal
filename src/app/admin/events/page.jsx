// src/app/admin/events/page.jsx
import EventsTable from "@/components/admin/tables/EventsTable";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Events Management</h1>
        <p className="text-slate-600 mt-1">Manage all events and activities</p>
      </div>
      <EventsTable />
    </div>
  );
}

