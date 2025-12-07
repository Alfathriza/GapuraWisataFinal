// src/components/admin/forms/EventForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

const EVENT_TAGS = ["Festival", "Workshop", "Culture", "Tour", "Performance"];
const EVENT_CATEGORIES = ["culture", "festival", "workshop", "craft", "food", "tour", "performance", "market"];

export default function EventForm({ eventId, initialData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    tag: "",
    category: [],
    dateLabel: "",
    where: "",
    image: "",
    href: "",
    excerpt: "",
    dateStart: "",
    dateEnd: "",
    time: "",
    hero: "",
    about: [],
    expect: [],
    villageId: "",
    location: null,
    highlights: [],
    schedule: [],
    gallery: [],
    seo: null,
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
        tag: initialData.tag || "",
        category: initialData.category || [],
        dateLabel: initialData.dateLabel || "",
        where: initialData.where || "",
        image: initialData.image || "",
        href: initialData.href || "",
        excerpt: initialData.excerpt || "",
        dateStart: initialData.dateStart
          ? new Date(initialData.dateStart).toISOString().split("T")[0]
          : "",
        dateEnd: initialData.dateEnd
          ? new Date(initialData.dateEnd).toISOString().split("T")[0]
          : "",
        time: initialData.time || "",
        hero: initialData.hero || "",
        about: initialData.about || [],
        expect: initialData.expect || [],
        villageId: initialData.villageId || "",
        location: initialData.location || null,
        highlights: initialData.highlights || [],
        schedule: initialData.schedule || [],
        gallery: initialData.gallery?.map((g) => (typeof g === "string" ? g : g.src)) || [],
        seo: initialData.seo || null,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = eventId ? `/api/admin/events/${eventId}` : "/api/admin/events";
      const method = eventId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save event");
        setLoading(false);
        return;
      }

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event");
      setLoading(false);
    }
  };

  const toggleCategory = (cat) => {
    setFormData({
      ...formData,
      category: formData.category.includes(cat)
        ? formData.category.filter((c) => c !== cat)
        : [...formData.category, cat],
    });
  };

  const addAboutParagraph = () => {
    setFormData({
      ...formData,
      about: [...formData.about, ""],
    });
  };

  const updateAboutParagraph = (index, value) => {
    const updated = [...formData.about];
    updated[index] = value;
    setFormData({ ...formData, about: updated });
  };

  const removeAboutParagraph = (index) => {
    setFormData({
      ...formData,
      about: formData.about.filter((_, i) => i !== index),
    });
  };

  const addExpect = () => {
    const item = prompt("Enter expect item:");
    if (item) {
      setFormData({
        ...formData,
        expect: [...formData.expect, item],
      });
    }
  };

  const removeExpect = (index) => {
    setFormData({
      ...formData,
      expect: formData.expect.filter((_, i) => i !== index),
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { img: "", caption: "" }],
    });
  };

  const updateHighlight = (index, field, value) => {
    const updated = [...formData.highlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, highlights: updated });
  };

  const removeHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { day: "", date: "", items: [] },
      ],
    });
  };

  const updateSchedule = (index, field, value) => {
    const updated = [...formData.schedule];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, schedule: updated });
  };

  const addScheduleItem = (scheduleIndex) => {
    const updated = [...formData.schedule];
    updated[scheduleIndex].items = [...(updated[scheduleIndex].items || []), ""];
    setFormData({ ...formData, schedule: updated });
  };

  const updateScheduleItem = (scheduleIndex, itemIndex, value) => {
    const updated = [...formData.schedule];
    updated[scheduleIndex].items[itemIndex] = value;
    setFormData({ ...formData, schedule: updated });
  };

  const removeScheduleItem = (scheduleIndex, itemIndex) => {
    const updated = [...formData.schedule];
    updated[scheduleIndex].items = updated[scheduleIndex].items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, schedule: updated });
  };

  const removeSchedule = (index) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index),
    });
  };

  const addGalleryItem = () => {
    const src = prompt("Enter image path:");
    if (src) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, src],
      });
    }
  };

  const removeGalleryItem = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tag</label>
            <select
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select tag</option>
              {EVENT_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Where</label>
            <input
              type="text"
              value={formData.where}
              onChange={(e) => setFormData({ ...formData, where: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  formData.category.includes(cat)
                    ? "bg-purple-600 text-white"
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
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select a village (optional)</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date Start <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateStart}
              onChange={(e) => setFormData({ ...formData, dateStart: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date End <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateEnd}
              onChange={(e) => setFormData({ ...formData, dateEnd: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Label</label>
            <input
              type="text"
              value={formData.dateLabel}
              onChange={(e) => setFormData({ ...formData, dateLabel: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="March 15 to 17, 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="08.00 - 21.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />
          <ImageUploader
            label="Hero Image"
            value={formData.hero}
            onChange={(value) => setFormData({ ...formData, hero: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">About</label>
          {formData.about.map((para, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <textarea
                value={para}
                onChange={(e) => updateAboutParagraph(index, e.target.value)}
                rows={3}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => removeAboutParagraph(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAboutParagraph}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Add Paragraph
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">What to Expect</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.expect.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-2"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeExpect(index)}
                  className="text-purple-700 hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={addExpect}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Add Expect Item
          </button>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Location</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.location?.name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, name: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <input
              type="text"
              value={formData.location?.address || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.location?.lat || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      lat: e.target.value ? parseFloat(e.target.value) : null,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.location?.lng || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      lng: e.target.value ? parseFloat(e.target.value) : null,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Highlights</h2>
          <button
            type="button"
            onClick={addHighlight}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Highlight
          </button>
        </div>

        <div className="space-y-4">
          {formData.highlights.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => updateHighlight(index, "img", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="/path/to/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Caption</label>
                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => updateHighlight(index, "caption", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Schedule</h2>
          <button
            type="button"
            onClick={addSchedule}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Schedule Day
          </button>
        </div>

        <div className="space-y-4">
          {formData.schedule.map((schedule, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Day</label>
                  <input
                    type="text"
                    value={schedule.day}
                    onChange={(e) => updateSchedule(index, "day", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="Sabtu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={schedule.date ? new Date(schedule.date).toISOString().split("T")[0] : ""}
                    onChange={(e) => updateSchedule(index, "date", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove Day
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Items</label>
                {schedule.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateScheduleItem(index, itemIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeScheduleItem(index, itemIndex)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addScheduleItem(index)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                >
                  Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Gallery</h2>
          <button
            type="button"
            onClick={addGalleryItem}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Image
          </button>
        </div>

        <div className="space-y-2">
          {formData.gallery.map((src, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={src}
                onChange={(e) => {
                  const updated = [...formData.gallery];
                  updated[index] = e.target.value;
                  setFormData({ ...formData, gallery: updated });
                }}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="/path/to/image.jpg"
              />
              <button
                type="button"
                onClick={() => removeGalleryItem(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.seo?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, description: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Keywords</label>
            <input
              type="text"
              value={formData.seo?.keywords?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: {
                    ...formData.seo,
                    keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : eventId ? "Update Event" : "Create Event"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/events")}
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

