"use client";

import VillagesGrid from "@/components/exploreby/VillagesGrid";
import VillagesHeader from "@/components/exploreby/VillagesHeader";

export default function VillagesPage() {
  return (
    <main className="bg-white min-h-screen">
      <VillagesHeader />
      <VillagesGrid/>
    </main>
  );
}
