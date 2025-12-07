// src/app/tour/helpers.js

/** Bangun badge kecil di header detail tour */
export function buildTourBadges(tour) {
  const badges = [];

  if (tour.schedule) {
    badges.push({ icon: "calendar", text: tour.schedule });
  }
  if (tour.location) {
    badges.push({ icon: "pin", text: tour.location });
  }
  if (tour.duration) {
    badges.push({ icon: "clock", text: tour.duration });
  }
  if (tour.group) {
    badges.push({ icon: "users", text: tour.group });
  }

  return badges;
}

/** Utility opsional untuk format pesan WhatsApp dari form booking */
export function formatWhatsAppBookingMessage({ name, people, date }, tour) {
  const title = tour?.title || "Tour Inquiry";
  const when = new Date(date).toLocaleDateString("en-GB");
  return (
    `Hello, I would like to book:\n` +
    `Tour: ${title}\n` +
    `Name: ${name}\n` +
    `People: ${people}\n` +
    `Date: ${when}\n\n` +
    `Please confirm availability. Thank you.`
  );
}
