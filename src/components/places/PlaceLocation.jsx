import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";

export default function PlaceLocation({ title = "Location", location }) {
  if (!location) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-50">
            <Image
              src={location.photo || "/fallbacks/food.jpg"}
              alt={location.title}
              width={600}
              height={400}
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/70 rounded-full p-3 shadow-sm">
                <MapPin size={28} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xl font-semibold">{location.title}</h3>
          {location.desc && (
            <p className="text-gray-600 leading-relaxed">{location.desc}</p>
          )}

          <ul className="text-sm text-gray-700 space-y-2 mt-4">
            {location.address && (
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-600" />
                <span>{location.address}</span>
              </li>
            )}
            {location.hours && (
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-yellow-600" />
                <span>{location.hours}</span>
              </li>
            )}
            {location.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-600" />
                <span>{location.phone}</span>
              </li>
            )}
          </ul>

          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-yellow-600 text-yellow-700 font-medium px-4 py-2 rounded-xl mt-4 hover:bg-yellow-50 transition"
            >
              OPEN IN MAPS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5H21m0 0v7.5m0-7.5L10.5 15"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
