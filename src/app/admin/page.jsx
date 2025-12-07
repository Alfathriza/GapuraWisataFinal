// src/app/admin/page.jsx
import { prisma } from "@/lib/prisma";
import { MapPin, UtensilsCrossed, Calendar, Home } from "lucide-react";

async function getStats() {
  const [toursCount, dishesCount, eventsCount, villagesCount] = await Promise.all([
    prisma.tour.count(),
    prisma.dish.count(),
    prisma.event.count(),
    prisma.village.count(),
  ]);

  return {
    tours: toursCount,
    dishes: dishesCount,
    events: eventsCount,
    villages: villagesCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Tours",
      value: stats.tours,
      icon: MapPin,
      color: "blue",
      href: "/admin/tours",
    },
    {
      label: "Foods & Drinks",
      value: stats.dishes,
      icon: UtensilsCrossed,
      color: "green",
      href: "/admin/foods",
    },
    {
      label: "Events",
      value: stats.events,
      icon: Calendar,
      color: "purple",
      href: "/admin/events",
    },
    {
      label: "Villages",
      value: stats.villages,
      icon: Home,
      color: "orange",
      href: "/admin/villages",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/tours/new"
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Create New Tour
          </a>
          <a
            href="/admin/foods/new"
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
          >
            Add Food/Drink
          </a>
          <a
            href="/admin/events/new"
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
          >
            Create Event
          </a>
        </div>
      </div>
    </div>
  );
}

