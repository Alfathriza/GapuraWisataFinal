// src/app/admin/foods/new/page.jsx
import DishForm from "@/components/admin/forms/DishForm";

export default function NewDishPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Dish</h1>
        <p className="text-slate-600 mt-1">Add a new food, drink, place, or event</p>
      </div>
      <DishForm />
    </div>
  );
}

