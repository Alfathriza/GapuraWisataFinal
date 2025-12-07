# Image Path Fixes - Rekomendasi Perbaikan

Berdasarkan mapping yang sudah dilakukan, berikut adalah rekomendasi perbaikan untuk memastikan semua gambar ter-mapping dengan benar.

## 🔧 Fix 1: Villages - Update Path

**Masalah**: Data.js menggunakan `/villages/purbayan.jpg` tapi file di public adalah `purbayan.png` di root.

**Solusi**: Update path di `VillagesGrid.jsx` dan `migrate-data.js` sudah dilakukan.

## 🔧 Fix 2: Tours - Heritage Walk

**Masalah**: `/tour/heritage-walk/hero.jpg` tidak ada.

**Solusi**: 
- Option 1: Gunakan `tour/walk.png` yang sudah ada
- Option 2: Buat folder `public/tour/heritage-walk/` dan copy `walk.png` sebagai `hero.jpg`

## 🔧 Fix 3: Foods/Drinks/Places - Missing Files

**Masalah**: Semua file foods, drinks, dan places tidak ada.

**Solusi**:
1. Buat folder structure:
   ```
   public/
   ├── food/
   ├── drink/
   └── places/
   ```

2. Atau update data.js untuk menggunakan placeholder/gambar yang sudah ada

## 🔧 Fix 4: Events - Pasar Lawas

**Masalah**: Folder `events/pasar-lawas/` dan semua file di dalamnya tidak ada.

**Solusi**:
- Gunakan gambar dari `whatson/` sebagai fallback
- Atau buat folder dan file yang diperlukan

## 📝 Checklist

- [x] Update villages path dari .jpg ke .png
- [ ] Fix heritage-walk hero image
- [ ] Create food/drink/places folders atau update data.js
- [ ] Create events/pasar-lawas atau update data.js
- [ ] Test semua image paths setelah migration

