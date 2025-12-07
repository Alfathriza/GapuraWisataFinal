// src/components/admin/shared/ImageUploader.jsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageUploader({
  value = "",
  onChange,
  label = "Image",
  accept = "image/*",
  helperText = "Upload an image file",
  folder = "images",
}) {
  const [preview, setPreview] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageLoadError, setImageLoadError] = useState(false);
  const fileInputRef = useRef(null);

  // Sync preview dengan value prop ketika value berubah
  useEffect(() => {
    if (value) {
      setPreview(value);
      setImageLoadError(false);
    } else if (!value) {
      // Jika value dihapus, hapus preview juga
      setPreview("");
      setImageLoadError(false);
    }
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Update with Supabase URL
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.message || "Failed to upload image");
      setPreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    setUploadError("");
    setImageLoadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {uploadError}
        </div>
      )}
      
      {preview ? (
        <div className="relative">
          {imageLoadError ? (
            <div className="w-full h-48 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-slate-600">Failed to load image</p>
                <p className="text-xs text-slate-500 mt-1">Please check the URL</p>
              </div>
            </div>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-slate-200"
              onError={() => {
                setImageLoadError(true);
              }}
              onLoad={() => {
                setImageLoadError(false);
              }}
            />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                <p className="mt-2 text-white text-sm font-medium">Uploading...</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-slate-300 rounded-lg p-8 text-center ${
            isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-slate-400"
          } transition-colors`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-400 border-t-transparent"></div>
              <p className="mt-4 text-sm font-medium text-slate-600">Uploading image...</p>
              <p className="text-xs text-slate-500 mt-1">Please wait</p>
            </div>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-slate-600">Click to upload</p>
              <p className="text-xs text-slate-500">{helperText}</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {preview && (
        <input
          type="text"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      )}
    </div>
  );
}

