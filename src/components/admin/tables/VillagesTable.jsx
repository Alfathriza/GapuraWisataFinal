// src/components/admin/tables/VillagesTable.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit } from "lucide-react";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

export default function VillagesTable() {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVillages();
  }, []);

  const fetchVillages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/villages");
      const data = await response.json();
      setVillages(data.villages || []);
    } catch (error) {
      console.error("Error fetching villages:", error);
    } finally {
      setLoading(false);
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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Blurb
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {villages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No villages found
                </td>
              </tr>
            ) : (
              villages.map((village) => (
                <tr key={village.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {village.key}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {village.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {village.blurb.substring(0, 100)}
                    {village.blurb.length > 100 ? "..." : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/villages/${village.id}`}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

