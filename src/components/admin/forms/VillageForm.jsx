// src/components/admin/forms/VillageForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

export default function VillageForm({ villageId, initialData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    title: "",
    img: "",
    blurb: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        key: initialData.key || "",
        title: initialData.title || "",
        img: initialData.img || "",
        blurb: initialData.blurb || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = villageId ? `/api/admin/villages/${villageId}` : "/api/admin/villages";
      const method = villageId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save village");
        setLoading(false);
        return;
      }

      router.push("/admin/villages");
      router.refresh();
    } catch (error) {
      console.error("Error saving village:", error);
      alert("Error saving village");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Village Information</h2>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Key <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.key}
            onChange={(e) => setFormData({ ...formData, key: e.target.value })}
            required
            disabled={!!villageId}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900"
            placeholder="purbayan"
          />
          {villageId && (
            <p className="mt-1 text-xs text-slate-500">Key cannot be changed after creation</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
          />
        </div>

        <div>
          <ImageUploader
            label="Image"
            value={formData.img}
            onChange={(value) => setFormData({ ...formData, img: value })}
            folder="villages"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Blurb <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.blurb}
            onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
            required
            rows={5}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : villageId ? "Update Village" : "Create Village"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/villages")}
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

