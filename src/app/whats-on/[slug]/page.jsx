// src/app/whats-on/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getEventBySlugServer, getAllEventsServer } from "@/lib/api-server";

import EventHero from "@/components/events/EventHero";
import EventAbout from "@/components/events/EventAbout";
import EventHighlights from "@/components/events/EventHighlights";
import EventScheduleLocation from "@/components/events/EventScheduleLocation";
import RelatedEvents from "@/components/events/RelatedEvents";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const events = await getAllEventsServer();
    return events.map((e) => ({ slug: e.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const ev = await getEventBySlugServer(slug);
    if (!ev) return { title: "Event Not Found | Gapura Wisata" };

    const title = `${ev.title} | Gapura Wisata`;
    const description = ev.seo?.description || ev.subtitle || "";
    const url = `https://your-domain.com/whats-on/${ev.slug}`;
    const images = [ev.hero || ev.image].filter(Boolean);

    return {
      title,
      description,
      alternates: { canonical: url },
      keywords: ev.seo?.keywords,
      openGraph: { title, description, url, type: "article", images },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch (error) {
    return { title: "Event Not Found | Gapura Wisata" };
  }
}

// Helper functions
function buildBadges(ev) {
  const dateLabel = ev.dateLabel || (ev.dateStart && ev.dateEnd ? `${ev.dateStart} to ${ev.dateEnd}` : "");
  const pin = ev.location?.name || ev.where || "Kotagede";
  return [
    dateLabel ? { icon: "calendar", text: dateLabel } : null,
    pin ? { icon: "pin", text: pin } : null,
  ].filter(Boolean);
}

function mapScheduleToTimeline(ev) {
  if (Array.isArray(ev.schedule) && ev.schedule.length) {
    return ev.schedule.map((s) => ({
      time: s.time || "",
      title: s.title || "",
      desc: s.description || "",
    }));
  }
  return [];
}

async function getRelatedEvents(currentSlug, limit = 4) {
  const events = await getAllEventsServer();
  return events
    .filter((e) => e.slug !== currentSlug)
    .slice(0, limit)
    .map((e) => ({
      title: e.title,
      duration: "3 hours",
      people: "2–10 people",
      price: "IDR 150,000",
      img: e.image || e.hero,
      href: `/whats-on/${e.slug}`,
    }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const event = await getEventBySlugServer(slug);
    if (!event) return notFound();

    const badges = buildBadges(event);
    const aboutImages = (event.highlights || [])
      .slice(0, 2)
      .map((h) => ({ src: h.img || h.image, alt: h.caption || h.title }));
    const sections = [
      { heading: event.title, text: event.about || "" },
      {
        heading: "Community identity",
        text: "Diselenggarakan oleh komunitas lokal sebagai upaya pelestarian budaya.",
      },
    ];
    const schedule = mapScheduleToTimeline(event);
    const location = {
      name: event.location?.name,
      address: event.location?.address,
      img: event.hero || event.image,
    };
    const related = await getRelatedEvents(event.slug, 4);

  return (
    <>
      <EventHero
        hero={event.hero || event.image}
        title={event.title}
        subtitle={event.subtitle}
        badges={badges}
      />
      <EventAbout sections={sections} images={aboutImages} />
      <EventHighlights items={event.highlights || []} />
      <EventScheduleLocation schedule={schedule} location={location} />
      {related.length > 0 && <RelatedEvents items={related} />}
    </>
  );
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }
}
