import Image from "next/image";

export default function PlaceMenu({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">
        {title || "What You Can Try"}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image || "/fallbacks/food.jpg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {item.desc}
              </p>
              <p className="text-yellow-600 font-semibold">
                {item.price}
                <span className="text-gray-500 font-normal text-sm ml-1">
                  per serving
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
