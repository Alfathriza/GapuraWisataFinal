// src/lib/api.js
// Helper functions untuk fetch data dari API

/**
 * Get base URL for API calls
 * Works for both server and client side
 */
function getBaseURL() {
  // For server-side (Next.js)
  if (typeof window === "undefined") {
    // Use environment variable or default to localhost
    const baseURL = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    return baseURL;
  }
  // For client-side, use relative URL
  return "";
}

/**
 * Fetch data dari API dengan error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const baseURL = getBaseURL();
    const url = `${baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Only add next.revalidate for server-side
      ...(typeof window === "undefined" && { next: { revalidate: 3600 } }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get all tours
 */
export async function getAllTours(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.village) searchParams.set("village", params.village);

  const query = searchParams.toString();
  const endpoint = `/api/tours${query ? `?${query}` : ""}`;
  const data = await fetchAPI(endpoint);
  return data.tours || [];
}

/**
 * Get tour by slug
 */
export async function getTourBySlug(slug) {
  const data = await fetchAPI(`/api/tours/${slug}`);
  return data.tour || null;
}

/**
 * Get all dishes
 */
export async function getAllDishes(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.type) searchParams.set("type", params.type);
  if (params.search) searchParams.set("search", params.search);
  if (params.village) searchParams.set("village", params.village);

  const query = searchParams.toString();
  const endpoint = `/api/dishes${query ? `?${query}` : ""}`;
  const data = await fetchAPI(endpoint);
  return data.dishes || [];
}

/**
 * Get dish by slug
 */
export async function getDishBySlug(slug) {
  const data = await fetchAPI(`/api/dishes/${slug}`);
  return data.dish || null;
}

/**
 * Get all events
 */
export async function getAllEvents(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.month) searchParams.set("month", params.month);
  if (params.search) searchParams.set("search", params.search);
  if (params.village) searchParams.set("village", params.village);

  const query = searchParams.toString();
  const endpoint = `/api/events${query ? `?${query}` : ""}`;
  const data = await fetchAPI(endpoint);
  return data.events || [];
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug) {
  const data = await fetchAPI(`/api/events/${slug}`);
  return data.event || null;
}

/**
 * Get all villages
 */
export async function getAllVillages() {
  const data = await fetchAPI(`/api/villages`);
  return data.villages || [];
}

/**
 * Get village by key
 */
export async function getVillageByKey(key) {
  const data = await fetchAPI(`/api/villages/${key}`);
  return data.village || null;
}

/**
 * Get related tours (helper untuk SimilarExperiences)
 */
export async function getRelatedTours(currentSlug, limit = 8) {
  const tours = await getAllTours();
  return tours
    .filter((t) => t.slug !== currentSlug)
    .slice(0, limit)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      img: t.image || t.hero || "/fallbacks/tour-hero.jpg",
      duration: t.duration,
      people: t.group,
      price: t.price,
    }));
}

