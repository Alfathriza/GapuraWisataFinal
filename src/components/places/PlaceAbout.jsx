import Image from "next/image";

export default function PlaceAbout({ title, paragraphs = [], quote, image }) {
  return (
    <section className="container mx-auto px-4 py-12 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <h2 className="text-2xl font-semibold mb-4">
          {title || "About the Place"}
        </h2>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {quote && (
          <blockquote className="mt-6 border-l-4 border-yellow-500 pl-4 italic text-gray-600">
            “{quote}”
          </blockquote>
        )}
      </div>

      <div className="lg:col-span-4">
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <Image
            src={image || "/fallbacks/food.jpg"}
            alt={title}
            width={600}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
