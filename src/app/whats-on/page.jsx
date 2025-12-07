import CalendarGrid from "@/components/events/CalendarGrid";
import DiscoverCarousel from "@/components/events/DiscoverCarousel";
import MajorEvents from "@/components/events/MajorEvents";
import WhatsOnHero from "@/components/events/WhatsOnHero";
import EventGrid from "@/components/events/EventGrid";
import { getAllEventsServer } from "@/lib/api-server";

export const metadata = {
  title: "What's On",
  description:
    "Agenda terkini kegiatan, tur, workshop, dan festival di Kotagede.",
};

export default async function WhatsOnPage({ searchParams }) {
  const month = searchParams?.month;
  const allEvents = await getAllEventsServer();
  
  // Filter by month if provided
  const events = month
    ? allEvents.filter((e) => {
        const eventDate = new Date(e.dateStart);
        const monthIndex = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ].indexOf(String(month).toLowerCase());
        return eventDate.getMonth() === monthIndex;
      })
    : allEvents;

  return (
    <>
      <WhatsOnHero />
      <MajorEvents />
      <DiscoverCarousel />
      <CalendarGrid />

      <EventGrid events={events} />
    </>
  );
}
