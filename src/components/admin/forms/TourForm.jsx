// src/components/admin/forms/TourForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

const CATEGORIES = ["walking", "culture", "workshop", "craft", "food"];

export default function TourForm({ tourId, initialData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    hero: "",
    image: "",
    location: "",
    schedule: "",
    duration: "",
    group: "",
    price: "",
    category: [],
    about: "",
    villageId: "",
    itinerary: [],
    meetingPoints: [],
  });

  useEffect(() => {
    // Fetch villages
    const fetchVillages = async () => {
      try {
        const response = await fetch("/api/admin/villages");
        const data = await response.json();
        if (data.villages) {
          setVillages(data.villages);
        }
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };
    fetchVillages();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        slug: initialData.slug || "",
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        hero: initialData.hero || "",
        image: initialData.image || "",
        location: initialData.location || "",
        schedule: initialData.schedule || "",
        duration: initialData.duration || "",
        group: initialData.group || "",
        price: initialData.price || "",
        category: initialData.category || [],
        about: initialData.about || "",
        villageId: initialData.villageId || "",
        itinerary: initialData.itinerary || [],
        meetingPoints: initialData.meetingPoints || [],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = tourId ? `/api/admin/tours/${tourId}` : "/api/admin/tours";
      const method = tourId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save tour");
        setLoading(false);
        return;
      }

      router.push("/admin/tours");
      router.refresh();
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Error saving tour");
      setLoading(false);
    }
  };

  const addItineraryItem = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { title: "", minutes: 0, description: "" }],
    });
  };

  const updateItineraryItem = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, itinerary: updated });
  };

  const removeItineraryItem = (index) => {
    setFormData({
      ...formData,
      itinerary: formData.itinerary.filter((_, i) => i !== index),
    });
  };

  const addMeetingPoint = () => {
    setFormData({
      ...formData,
      meetingPoints: [
        ...formData.meetingPoints,
        { type: "WALK IN", icon: "walk", title: "", note: "", address: "" },
      ],
    });
  };

  const updateMeetingPoint = (index, field, value) => {
    const updated = [...formData.meetingPoints];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, meetingPoints: updated });
  };

  const removeMeetingPoint = (index) => {
    setFormData({
      ...formData,
      meetingPoints: formData.meetingPoints.filter((_, i) => i !== index),
    });
  };

  const toggleCategory = (cat) => {
    setFormData({
      ...formData,
      category: formData.category.includes(cat)
        ? formData.category.filter((c) => c !== cat)
        : [...formData.category, cat],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="kotagede-heritage-walk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Hero Image"
            value={formData.hero}
            onChange={(value) => setFormData({ ...formData, hero: value })}
          />
          <ImageUploader
            label="Image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Schedule <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Daily, 09:00 and 15:00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="3 hours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Group <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2–10 people"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="IDR 150,000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  formData.category.includes(cat)
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Village</label>
          <select
            value={formData.villageId}
            onChange={(e) => setFormData({ ...formData, villageId: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a village (optional)</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            About <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            required
            rows={5}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Itinerary</h2>
          <button
            type="button"
            onClick={addItineraryItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {formData.itinerary.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItineraryItem(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Minutes</label>
                  <input
                    type="number"
                    value={item.minutes}
                    onChange={(e) =>
                      updateItineraryItem(index, "minutes", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItineraryItem(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItineraryItem(index, "description", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Points Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Meeting Points</h2>
          <button
            type="button"
            onClick={addMeetingPoint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Meeting Point
          </button>
        </div>

        <div className="space-y-4">
          {formData.meetingPoints.map((point, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select
                    value={point.type}
                    onChange={(e) => updateMeetingPoint(index, "type", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="WALK IN">WALK IN</option>
                    <option value="CAR">CAR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
                  <input
                    type="text"
                    value={point.icon}
                    onChange={(e) => updateMeetingPoint(index, "icon", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="walk, car, pin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={point.title}
                    onChange={(e) => updateMeetingPoint(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Note</label>
                  <input
                    type="text"
                    value={point.note}
                    onChange={(e) => updateMeetingPoint(index, "note", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input
                  type="text"
                  value={point.address}
                  onChange={(e) => updateMeetingPoint(index, "address", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMeetingPoint(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : tourId ? "Update Tour" : "Create Tour"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/tours")}
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

