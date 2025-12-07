// src/app/admin/events/new/page.jsx
import EventForm from "@/components/admin/forms/EventForm";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Event</h1>
        <p className="text-slate-600 mt-1">Add a new event to the system</p>
      </div>
      <EventForm />
    </div>
  );
}

