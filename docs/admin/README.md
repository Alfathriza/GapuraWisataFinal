# Admin Panel Documentation

## Overview

Admin panel untuk manage data wisata Kotagede. Admin panel menggunakan database PostgreSQL via Prisma, sedangkan client side tetap menggunakan file `data.js` (hybrid approach).

## Struktur

- **Admin Routes**: `src/app/admin/`
- **Admin Components**: `src/components/admin/`
- **API Routes**: `src/app/api/admin/`
- **Database**: Prisma dengan PostgreSQL

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

1. Buat file `.env` dari `.env.example`
2. Set `DATABASE_URL` dengan connection string PostgreSQL
3. Run migrations:

```bash
npx prisma migrate dev
```

4. Generate Prisma client:

```bash
npx prisma generate
```

### 3. Setup Supabase Storage

1. Buat bucket `photos` di Supabase Dashboard:
   - Buka Storage di Supabase Dashboard
   - Klik "New bucket"
   - Nama: `photos`
   - Set sebagai **Public bucket**
   - Klik "Create bucket"

2. Set environment variables di `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://bgxnuqbhsxszxcjjnqet.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

3. Set bucket policies (opsional, untuk security):
   - Buka Storage > Policies
   - Buat policy untuk allow upload dari authenticated users

### 4. Create Admin User

Jalankan seed script untuk membuat admin user default:

```bash
npm run seed
```

Atau jika menggunakan Prisma langsung:

```bash
npx prisma db seed
```

**Default credentials:**
- Email: `admin@gapurawisata.com`
- Password: `admin123`

⚠️ **PENTING**: Ganti password default setelah login pertama kali!

Anda bisa mengubah default credentials dengan set environment variables:
- `ADMIN_EMAIL` - Email untuk admin user
- `ADMIN_PASSWORD` - Password untuk admin user (akan di-hash otomatis)
- `ADMIN_NAME` - Nama admin user

## Authentication

- Login page: `/admin/login`
- Session menggunakan cookies
- Protected routes: semua routes di `/admin/*` (kecuali `/admin/login`)

## API Endpoints

### Authentication
- `POST /api/admin/auth` - Login
- `DELETE /api/admin/auth` - Logout
- `GET /api/admin/auth` - Get current session

### Tours
- `GET /api/admin/tours` - List tours
- `POST /api/admin/tours` - Create tour
- `GET /api/admin/tours/[id]` - Get tour
- `PUT /api/admin/tours/[id]` - Update tour
- `DELETE /api/admin/tours/[id]` - Delete tour

### Foods
- `GET /api/admin/foods` - List dishes
- `POST /api/admin/foods` - Create dish
- `GET /api/admin/foods/[id]` - Get dish
- `PUT /api/admin/foods/[id]` - Update dish
- `DELETE /api/admin/foods/[id]` - Delete dish

### Upload
- `POST /api/admin/upload` - Upload image ke Supabase Storage
  - Body: FormData dengan `file` dan `folder` (optional)
  - Returns: `{ url: string, path: string }`
- `DELETE /api/admin/foods/[id]` - Delete dish

### Events
- `GET /api/admin/events` - List events
- `POST /api/admin/events` - Create event
- `GET /api/admin/events/[id]` - Get event
- `PUT /api/admin/events/[id]` - Update event
- `DELETE /api/admin/events/[id]` - Delete event

### Villages
- `GET /api/admin/villages` - List villages
- `GET /api/admin/villages/[id]` - Get village
- `PUT /api/admin/villages/[id]` - Update village

## Database Schema

Lihat `prisma/schema.prisma` untuk detail schema lengkap.

Models utama:
- `User` - Admin users
- `Tour` - Tours dengan `ItineraryItem` dan `MeetingPoint`
- `Dish` - Foods/Drinks/Places dengan `GalleryItem`, `Location`, `MenuItem`
- `Event` - Events dengan `EventLocation`, `EventHighlight`, `EventSchedule`, `EventGallery`, `EventSEO`
- `Village` - Villages

## Notes

- Client side tetap menggunakan `data.js` files (tidak diubah)
- Admin panel terpisah dan tidak mengganggu client side
- Semua routes admin protected dengan authentication

