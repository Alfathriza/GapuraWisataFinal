import { notFound } from "next/navigation";
import { getAllToursServer, getTourBySlugServer } from "@/lib/api-server";
import { buildTourBadges } from "@/app/tour/helpers";

import TourDetailHeader from "@/components/tourandact/TourDetailHeader";
import TourAbout from "@/components/tourandact/TourAbout";
import TourItinerary from "@/components/tourandact/TourItinerary";
import TourBookingForm from "@/components/tourandact/TourBookingForm";
import TourMeetingPoint from "@/components/tourandact/TourMeetingPoint";
import SimilarExperiences from "@/components/tourandact/SimilarExperiences";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const tours = await getAllToursServer();
    return tours.map((t) => ({ slug: t.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const tour = await getTourBySlugServer(slug);
    if (!tour) return { title: "Tour Not Found | Gapura Wisata" };

    const title = `${tour.title} | Gapura Wisata`;
    const description = tour.subtitle || (typeof tour.about === "string" ? tour.about.slice(0, 140) : "") || "";
    const images = [tour.image || tour.hero].filter(Boolean);

    return {
      title,
      description,
      openGraph: { title, description, images, type: "article" },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch (error) {
    return { title: "Tour Not Found | Gapura Wisata" };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const tour = await getTourBySlugServer(slug);
    if (!tour) return notFound();

    const hero = tour.image || tour.hero || "/fallbacks/tour-hero.jpg";

  return (
    <>
      <TourDetailHeader
        image={hero}
        title={tour.title}
        subtitle={tour.subtitle}
        badges={buildTourBadges(tour)}
      />

      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
          <TourAbout
            title="About"
            content={tour.about}
            highlights={tour.highlightsMeta || []}
          />
          <TourItinerary items={tour.itinerary || []} />
          <TourMeetingPoint items={tour.meetingPoints || []} />
        </div>

        <div className="lg:col-span-4">
          <TourBookingForm />
        </div>
      </div>

      <SimilarExperiences currentSlug={slug} />
    </>
  );
  } catch (error) {
    console.error("Error fetching tour:", error);
    return notFound();
  }
}
