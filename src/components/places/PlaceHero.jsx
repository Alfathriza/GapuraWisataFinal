"use client";

import Image from "next/image";
import { MapPin, Clock, DollarSign } from "lucide-react";

export default function PlaceHero({
  title,
  subtitle,
  image,
  locationLabel,
  openingHoursLabel,
  priceLabel,
}) {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden h-[70vh] flex items-end">
      <Image
        src={image || "/fallbacks/food.jpg"}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 p-6 md:p-10 text-white max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">
          {title}
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6">{subtitle}</p>

        <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-90">
          {locationLabel && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{locationLabel}</span>
            </div>
          )}
          {openingHoursLabel && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{openingHoursLabel}</span>
            </div>
          )}
          {priceLabel && (
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              <span>{priceLabel}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
