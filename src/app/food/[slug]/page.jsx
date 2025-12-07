// src/app/food/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getAllDishesServer, getDishBySlugServer } from "@/lib/api-server";
import FoodDetailHeader from "@/components/foodanddrink/FoodDetailHeader";
import FoodAbout from "@/components/foodanddrink/FoodAbout";
import FoodReserveForm from "@/components/foodanddrink/FoodReserveForm";
import FoodGallery from "@/components/foodanddrink/FoodGallery";
import PlaceDetail from "@/components/places/PlaceDetail";

export const revalidate = 3600;
export const dynamicParams = true;

const FALLBACK_IMG = "/fallbacks/food.jpg";

export async function generateStaticParams() {
  try {
    const dishes = await getAllDishesServer();
    return dishes.map((d) => ({ slug: d.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const dish = await getDishBySlugServer(slug);
    if (!dish) return { title: "Not Found" };

    const title = `${dish.title} | Gapura Wisata`;
    const description = dish.subtitle || "";
    const ogImage = dish.image || FALLBACK_IMG;

    return {
      title,
      description,
      openGraph: { title, description, images: [ogImage] },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const dish = await getDishBySlugServer(slug);
    if (!dish) return notFound();

  // NEW: jika type-nya place, render PlaceDetail
  if (dish.type === "place") {
    return <PlaceDetail place={dish} />;
  }

  // kalau nanti kamu tambahkan event
  if (dish.type === "event") {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-semibold mb-4">{dish.title}</h1>
        <p className="text-gray-600 mb-8">{dish.subtitle}</p>
        <img
          src={dish.image || FALLBACK_IMG}
          alt={dish.title}
          className="rounded-2xl mb-6 shadow-md"
        />
        <div className="space-y-4 text-gray-700">
          {(dish.about || []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  // default: food / drink
  const hero = dish.image || FALLBACK_IMG;
  const aboutImg = dish.aboutImage || FALLBACK_IMG;
  const gallery = (dish.gallery || []).map((g, i) => ({
    src: g?.src || FALLBACK_IMG,
    alt: g?.alt || `${dish.title} image ${i + 1}`,
    ratio: g?.ratio || "4/3",
  }));

  const locationText =
    typeof dish.location === "string"
      ? dish.location
      : dish.location?.title || "Kotagede Culinary Spot";

  return (
    <>
      <FoodDetailHeader
        image={hero}
        title={dish.title}
        subtitle={dish.subtitle}
        badges={dish.badges || []}
      />
      <div className="container mx-auto grid gap-8 px-4 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          <FoodAbout
            image={aboutImg}
            paragraphs={dish.about}
            quote={dish.quote}
          />
          {gallery.length > 0 && (
            <FoodGallery title="Gallery" images={gallery} />
          )}
        </div>
        <div className="lg:col-span-4">
          <FoodReserveForm dishName={dish.title} location={locationText} />
        </div>
      </div>
    </>
  );
  } catch (error) {
    console.error("Error fetching dish:", error);
    return notFound();
  }
}
