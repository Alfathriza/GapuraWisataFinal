# Events Management

## Overview

Manage events dan activities di Kotagede.

## Fields

### Basic Information
- **Slug** (required): URL-friendly identifier
- **Title** (required): Nama event
- **Subtitle**: Deskripsi singkat
- **Tag**: Festival, Workshop, Culture, Tour, Performance
- **Category**: Array of categories
- **Date Label**: Format display (e.g., "March 15 to 17, 2025")
- **Where**: Lokasi singkat
- **Date Start** (required): Tanggal mulai
- **Date End** (required): Tanggal selesai
- **Time**: Waktu (e.g., "08.00 - 21.00")
- **Image**: Image untuk list
- **Hero**: Image untuk hero section
- **Excerpt**: Ringkasan event
- **About**: Array of paragraph strings
- **Expect**: Array of "what to expect" items

### Location
- **name**: Nama lokasi
- **address** (required): Alamat
- **lat**: Latitude (optional)
- **lng**: Longitude (optional)

### Highlights
Array of highlight images dengan:
- **img**: Path ke image
- **caption**: Caption untuk image

### Schedule
Array of schedule days dengan:
- **day**: Nama hari (e.g., "Sabtu")
- **date**: Tanggal
- **items**: Array of activity strings

### Gallery
Array of image paths (strings)

### SEO
- **description**: Meta description
- **keywords**: Array of keywords

## Best Practices

1. Date Start dan Date End harus valid dates
2. Schedule items akan diurutkan berdasarkan order
3. Highlights images harus representatif dari event
4. SEO keywords penting untuk search engine optimization

