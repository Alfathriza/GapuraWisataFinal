"use client";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlaceGallery({ title = "Gallery", images = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!images.length) return null;

  return (
    <section className="container mx-auto px-4 py-12 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] rounded-2xl overflow-hidden shadow-md flex-shrink-0"
          >
            <Image
              src={img.src || "/fallbacks/food.jpg"}
              alt={img.alt || `Gallery image ${i + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
