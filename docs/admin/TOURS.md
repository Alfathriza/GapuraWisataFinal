# Tours Management

## Overview

Manage tours dan activities di Kotagede.

## Fields

### Basic Information
- **Slug** (required): URL-friendly identifier (e.g., `kotagede-heritage-walk`)
- **Title** (required): Nama tour
- **Subtitle**: Deskripsi singkat
- **Hero Image**: Image untuk hero section
- **Image**: Image utama
- **Location** (required): Lokasi tour
- **Schedule** (required): Jadwal (e.g., "Daily, 09:00 and 15:00")
- **Duration** (required): Durasi (e.g., "3 hours")
- **Group** (required): Ukuran grup (e.g., "2–10 people")
- **Price** (required): Harga (e.g., "IDR 150,000")
- **Category**: Array of categories (walking, culture, workshop, craft, food)
- **About** (required): Deskripsi lengkap

### Itinerary
Array of items dengan:
- **Title**: Nama aktivitas
- **Minutes**: Durasi dalam menit
- **Description**: Deskripsi aktivitas

### Meeting Points
Array of meeting points dengan:
- **Type**: "WALK IN" atau "CAR"
- **Icon**: "walk", "car", atau "pin"
- **Title**: Nama meeting point
- **Note**: Catatan tambahan
- **Address**: Alamat lengkap

## Best Practices

1. Slug harus unique dan URL-friendly
2. Gunakan format konsisten untuk price (e.g., "IDR 150,000")
3. Itinerary items akan diurutkan berdasarkan order
4. Meeting points akan diurutkan berdasarkan order

