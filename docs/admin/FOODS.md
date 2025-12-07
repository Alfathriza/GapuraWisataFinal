# Foods & Drinks Management

## Overview

Manage foods, drinks, places, dan events terkait kuliner.

## Types

- **food**: Traditional foods
- **drink**: Traditional drinks
- **place**: Restaurants/places
- **event**: Food-related events

## Fields

### Basic Information
- **Type** (required): food, drink, place, atau event
- **Slug** (required): URL-friendly identifier
- **Title** (required): Nama
- **Subtitle**: Deskripsi singkat
- **Price**: Harga (optional untuk places/events)
- **Image**: Image utama
- **Badges**: Array of badge strings
- **About**: Array of paragraph strings
- **Quote**: Quote/testimonial

### Gallery
Array of gallery items dengan:
- **src**: Path ke image
- **alt**: Alt text
- **ratio**: Aspect ratio (4/3, 1/1, 4/5, 16/9)

### Location
- **title**: Nama lokasi
- **desc**: Deskripsi (untuk places)
- **address** (required): Alamat
- **hours**: Jam operasional
- **phone**: Nomor telepon
- **mapUrl**: URL Google Maps
- **photo**: Photo lokasi
- **lat**: Latitude (optional)
- **lng**: Longitude (optional)

### Menu Items (untuk places)
Array of menu items dengan:
- **title**: Nama menu
- **desc**: Deskripsi
- **price**: Harga

## Best Practices

1. Untuk places, pastikan location lengkap
2. Gallery images harus memiliki alt text untuk accessibility
3. Badges digunakan untuk highlight features (e.g., "Available daily", "Local favorite")

