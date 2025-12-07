import AboutKotagede from "@/components/AboutKotagede";
import ExploreBento from "@/components/ExploreBento";
import ExploreCarousel from "@/components/ExploreCarousel";
import Hero from "@/components/Hero";
import VillagesCarousel from "@/components/VillagesCarousel";

export default function Page() {
  return (
    <>
      <Hero />
      <AboutKotagede />
      <ExploreCarousel />
      <ExploreBento />
      <VillagesCarousel />
      {/* section berikutnya di sini */}
    </>
  );
}
