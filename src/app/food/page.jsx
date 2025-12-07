"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import FoodCardGrid from "@/components/foodanddrink/FoodCardGrid";
import FoodDrinkHeader from "@/components/foodanddrink/FoodDrinkHeader";
import FoodTabs from "@/components/foodanddrink/FoodTabs";
import { getAllDishes, getAllEvents } from "@/lib/api";

export default function FoodDrinkPage() {
  const [activeTab, setActiveTab] = useState("foods");
  const [dishes, setDishes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = useCallback((tab) => setActiveTab(tab), []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dishesData, eventsData] = await Promise.all([
          getAllDishes(),
          getAllEvents(),
        ]);
        setDishes(dishesData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDishes([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const foods = useMemo(
    () =>
      dishes.filter((d) => d.type === "food").map((d) => ({
        type: d.type,
        slug: d.slug,
        title: d.title,
        img: d.image,
        excerpt: d.subtitle,
      })),
    [dishes]
  );
  const drinks = useMemo(
    () =>
      dishes.filter((d) => d.type === "drink").map((d) => ({
        type: d.type,
        slug: d.slug,
        title: d.title,
        img: d.image,
        excerpt: d.subtitle,
      })),
    [dishes]
  );
  const places = useMemo(
    () =>
      dishes.filter((d) => d.type === "place").map((d) => ({
        type: d.type,
        slug: d.slug,
        title: d.title,
        img: d.image,
        excerpt: d.subtitle,
      })),
    [dishes]
  );

  const foodEvents = useMemo(
    () =>
      events.map((e) => ({
        type: "event",
        slug: e.slug,
        title: e.title,
        img: e.image || e.hero,
        excerpt: e.excerpt || e.subtitle,
      })),
    [events]
  );

  const datasets = { foods, drinks, places, events: foodEvents };

  if (loading) {
    return (
      <main className="bg-white min-h-screen">
        <FoodDrinkHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <FoodDrinkHeader />
      <FoodTabs onChange={handleChange} />
      <FoodCardGrid datasets={datasets} activeTab={activeTab} />
    </main>
  );
}
