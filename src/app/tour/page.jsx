import SilverWorkshopList from "@/components/tourandact/SilverWorkshopList";
import SimiliarExperiencesCarousel from "@/components/tourandact/SimiliarExperiencesCarousel";
import TourHero from "@/components/tourandact/TourHero";
import TourList from "@/components/tourandact/TourList";

export default function Page() {
  return (
    <>
      <TourHero />
      <TourList/>
      <SilverWorkshopList/>
      <SimiliarExperiencesCarousel/>
      {/* section berikutnya */}
    </>
  );
}
