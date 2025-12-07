// src/components/admin/tables/DishesTable.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

const DISH_TYPES = [
  { value: "", label: "All" },
  { value: "food", label: "Foods" },
  { value: "drink", label: "Drinks" },
  { value: "place", label: "Places" },
  { value: "event", label: "Events" },
];

export default function DishesTable() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, dish: null });

  useEffect(() => {
    fetchDishes();
  }, [search, typeFilter]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter) params.append("type", typeFilter);

      const url = `/api/admin/foods?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setDishes(data.dishes || []);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dishId) => {
    try {
      const response = await fetch(`/api/admin/foods/${dishId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDishes();
      } else {
        alert("Failed to delete dish");
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
      alert("Error deleting dish");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Foods & Drinks</h2>
            <Link
              href="/admin/foods/new"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {DISH_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {dishes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No dishes found
                  </td>
                </tr>
              ) : (
                dishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{dish.title}</div>
                        {dish.subtitle && (
                          <div className="text-sm text-slate-500">{dish.subtitle}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          dish.type === "food"
                            ? "bg-orange-100 text-orange-700"
                            : dish.type === "drink"
                            ? "bg-blue-100 text-blue-700"
                            : dish.type === "place"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {dish.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {dish.price || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/foods/${dish.id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteDialog({ isOpen: true, dish })}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, dish: null })}
        onConfirm={() => handleDelete(deleteDialog.dish?.id)}
        title="Delete Dish"
        message={`Are you sure you want to delete "${deleteDialog.dish?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}

