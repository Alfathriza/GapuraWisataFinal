// src/components/admin/forms/DishForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

const DISH_TYPES = ["food", "drink", "place", "event"];

export default function DishForm({ dishId, initialData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [formData, setFormData] = useState({
    type: "food",
    slug: "",
    title: "",
    subtitle: "",
    price: "",
    image: "",
    badges: [],
    about: [],
    quote: "",
    gallery: [],
    location: null,
    menuItems: [],
    villageId: null,
  });

  useEffect(() => {
    // Fetch villages for dropdown
    const fetchVillages = async () => {
      try {
        const response = await fetch("/api/admin/villages");
        const data = await response.json();
        setVillages(data.villages || []);
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };
    fetchVillages();

    if (initialData) {
      setFormData({
        type: initialData.type || "food",
        slug: initialData.slug || "",
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        price: initialData.price || "",
        image: initialData.image || "",
        badges: initialData.badges || [],
        about: initialData.about || [],
        quote: initialData.quote || "",
        gallery: initialData.gallery || [],
        location: initialData.location || null,
        menuItems: initialData.menuItems || [],
        villageId: initialData.villageId || null,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = dishId ? `/api/admin/foods/${dishId}` : "/api/admin/foods";
      const method = dishId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save dish");
        setLoading(false);
        return;
      }

      router.push("/admin/foods");
      router.refresh();
    } catch (error) {
      console.error("Error saving dish:", error);
      alert("Error saving dish");
      setLoading(false);
    }
  };

  const addBadge = () => {
    const badge = prompt("Enter badge text:");
    if (badge) {
      setFormData({
        ...formData,
        badges: [...formData.badges, badge],
      });
    }
  };

  const removeBadge = (index) => {
    setFormData({
      ...formData,
      badges: formData.badges.filter((_, i) => i !== index),
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

  const addGalleryItem = () => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, { src: "", alt: "", ratio: "4/3" }],
    });
  };

  const updateGalleryItem = (index, field, value) => {
    const updated = [...formData.gallery];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, gallery: updated });
  };

  const removeGalleryItem = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    });
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, { title: "", desc: "", price: "" }],
    });
  };

  const updateMenuItem = (index, field, value) => {
    const updated = [...formData.menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, menuItems: updated });
  };

  const removeMenuItem = (index) => {
    setFormData({
      ...formData,
      menuItems: formData.menuItems.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {DISH_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
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
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Village</label>
          <select
            value={formData.villageId || ""}
            onChange={(e) => setFormData({ ...formData, villageId: e.target.value || null })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select Village --</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Rp 15.000"
            />
          </div>

          <div>
            <ImageUploader
              label="Image"
              value={formData.image}
              onChange={(value) => setFormData({ ...formData, image: value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Badges</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
              >
                {badge}
                <button
                  type="button"
                  onClick={() => removeBadge(index)}
                  className="text-green-700 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={addBadge}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Add Badge
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">About</label>
          {formData.about.map((para, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <textarea
                value={para}
                onChange={(e) => updateAboutParagraph(index, e.target.value)}
                rows={3}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Quote</label>
          <input
            type="text"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Gallery</h2>
          <button
            type="button"
            onClick={addGalleryItem}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Image
          </button>
        </div>

        <div className="space-y-4">
          {formData.gallery.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Source</label>
                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => updateGalleryItem(index, "src", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="/path/to/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => updateGalleryItem(index, "alt", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ratio</label>
                  <select
                    value={item.ratio}
                    onChange={(e) => updateGalleryItem(index, "ratio", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="4/3">4/3</option>
                    <option value="1/1">1/1</option>
                    <option value="4/5">4/5</option>
                    <option value="16/9">16/9</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeGalleryItem(index)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Location</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.location?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hours</label>
              <input
                type="text"
                value={formData.location?.hours || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, hours: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="Daily 08.00–18.00"
              />
            </div>
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="text"
                value={formData.location?.phone || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Map URL</label>
              <input
                type="url"
                value={formData.location?.mapUrl || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, mapUrl: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items Section (for places) */}
      {formData.type === "place" && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Menu Items</h2>
            <button
              type="button"
              onClick={addMenuItem}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Menu Item
            </button>
          </div>

          <div className="space-y-4">
            {formData.menuItems.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateMenuItem(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateMenuItem(index, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeMenuItem(index)}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                    value={item.desc}
                    onChange={(e) => updateMenuItem(index, "desc", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : dishId ? "Update Dish" : "Create Dish"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/foods")}
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

