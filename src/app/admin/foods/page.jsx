// src/app/admin/foods/page.jsx
import DishesTable from "@/components/admin/tables/DishesTable";

export default function FoodsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Foods & Drinks Management</h1>
        <p className="text-slate-600 mt-1">Manage foods, drinks, places, and events</p>
      </div>
      <DishesTable />
    </div>
  );
}

