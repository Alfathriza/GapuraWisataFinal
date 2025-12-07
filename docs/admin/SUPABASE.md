# Supabase Storage Setup

## Overview

Admin panel menggunakan Supabase Storage untuk menyimpan semua foto/gambar. Semua upload akan otomatis tersimpan di Supabase dan URL akan disimpan di database.

## Setup

### 1. Buat Bucket di Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka **Storage** di sidebar
4. Klik **New bucket**
5. Isi form:
   - **Name**: `photos`
   - **Public bucket**: ✅ Centang (agar URL bisa diakses public)
   - **File size limit**: 5MB (default)
   - **Allowed MIME types**: `image/*` (opsional)
6. Klik **Create bucket**

### 2. Set Environment Variables

Tambahkan ke file `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://bgxnuqbhsxszxcjjnqet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneG51cWJoc3hzenhjampucWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTY3NTUsImV4cCI6MjA4MDM5Mjc1NX0.rij8PxodA8WA3QpXipWhZt957t_nqY17Va1i9Wma7dc"
```

### 3. Set Bucket Policies (Opsional)

Untuk security, Anda bisa set policies agar hanya authenticated admin yang bisa upload:

1. Buka Storage > Policies
2. Klik **New Policy**
3. Pilih **For full customization**
4. Policy name: `Allow authenticated uploads`
5. Allowed operation: `INSERT`
6. Policy definition:
   ```sql
   (bucket_id = 'photos'::text) AND (auth.role() = 'authenticated'::text)
   ```
7. Klik **Review** dan **Save policy**

## Usage

### Upload Image via Admin Panel

1. Buka form create/edit (Tour, Food, Event, dll)
2. Klik area upload image
3. Pilih file gambar (max 5MB)
4. File akan otomatis di-upload ke Supabase
5. URL akan otomatis terisi di form

### Folder Structure

Images akan disimpan dengan struktur:
```
photos/
  ├── images/          # Default folder
  ├── tour-hero/       # Tour hero images
  ├── tour-main/       # Tour main images
  ├── dish-main/       # Dish main images
  ├── dish-gallery/    # Dish gallery images
  ├── event-hero/      # Event hero images
  └── location-photos/ # Location photos
```

### Manual Upload via API

```javascript
const formData = new FormData();
formData.append("file", fileObject);
formData.append("folder", "images"); // optional

const response = await fetch("/api/admin/upload", {
  method: "POST",
  body: formData,
});

const { url, path } = await response.json();
```

## File Limits

- **Max file size**: 5MB
- **Allowed types**: `image/*` (jpg, png, gif, webp, dll)
- **Auto-generated filename**: `{timestamp}-{random}.{ext}`

## Troubleshooting

### Error: "Missing Supabase environment variables"

Pastikan environment variables sudah di-set di `.env`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "Bucket not found"

Pastikan bucket `photos` sudah dibuat di Supabase Dashboard.

### Error: "Upload failed"

1. Check bucket policies - pastikan bucket public atau policy allow upload
2. Check file size - max 5MB
3. Check file type - harus image file
4. Check network connection

### Images tidak muncul

1. Pastikan bucket set sebagai **Public**
2. Check URL di browser - harus bisa diakses langsung
3. Check CORS settings di Supabase (default sudah allow all)

## Best Practices

1. **Organize by folder**: Gunakan folder berbeda untuk tipe image berbeda
2. **Optimize images**: Compress images sebelum upload untuk performa lebih baik
3. **Use descriptive filenames**: System akan auto-generate, tapi Anda bisa rename di Supabase Dashboard
4. **Clean up unused images**: Hapus images yang tidak digunakan untuk save storage

