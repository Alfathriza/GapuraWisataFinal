import PlaceHero from "./PlaceHero";
import PlaceAbout from "./PlaceAbout";
import PlaceMenu from "./PlaceMenu";
import PlaceGallery from "./PlaceGallery";
import PlaceLocation from "./PlaceLocation";
import PlaceReserveForm from "./PlaceReserveForm";

export default function PlaceDetail({ place }) {
  return (
    <main>
      {/* Hero section */}
      <PlaceHero
        title={place.title}
        subtitle={place.subtitle}
        image={place.image}
        locationLabel={place.locationLabel}
        openingHoursLabel={place.openingHoursLabel}
        priceLabel={place.priceLabel}
      />

      {/* Content layout */}
      <div className="container mx-auto px-4 py-12 grid gap-8 lg:grid-cols-12">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-12">
          {/* About */}
          <PlaceAbout
            title="About the Place"
            paragraphs={place.about}
            quote={place.quote}
            image={place.aboutImage}
          />

          {/* Menu */}
          <PlaceMenu title={place.menuTitle} items={place.menuItems} />

          {/* Gallery */}
          <PlaceGallery title="Gallery" images={place.gallery} />

          {/* Location */}
          <PlaceLocation title="Location" location={place.location} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-4">
          <PlaceReserveForm place={place} />
        </div>
      </div>
    </main>
  );
}
