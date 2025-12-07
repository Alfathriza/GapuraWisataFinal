# Image Mapping - Gapura Wisata

Dokumen ini memetakan semua gambar yang digunakan di aplikasi dengan lokasi file di folder `public/`.

## 📁 Struktur Folder Public

```
public/
├── villages/          # (BELUM ADA - perlu dibuat)
│   ├── purbayan.jpg
│   ├── prenggan.jpg
│   ├── basen.jpg
│   ├── kemasan.jpg
│   └── jagalan.jpg
├── tour/
│   ├── heritage-walk/ # (BELUM ADA - perlu dibuat)
│   │   └── hero.jpg
│   ├── batik.jpeg     ✅ ADA
│   ├── gapura.png     ✅ ADA
│   ├── kelastari.png  ✅ ADA
│   ├── makam.png      ✅ ADA
│   ├── masak.png      ✅ ADA
│   ├── masjid.png     ✅ ADA
│   ├── museum.png     ✅ ADA
│   ├── pasar.png      ✅ ADA
│   ├── perak.png      ✅ ADA
│   ├── pottery.png    ✅ ADA
│   ├── silvera.png    ✅ ADA
│   ├── silverb.png    ✅ ADA
│   ├── silverc.png    ✅ ADA
│   ├── silverd.png    ✅ ADA
│   ├── silvere.png    ✅ ADA
│   ├── silverf.png    ✅ ADA
│   └── walk.png       ✅ ADA
├── food/              # (BELUM ADA - perlu dibuat)
│   ├── kipo/
│   │   ├── hero.jpg
│   │   ├── detail-1.jpg
│   │   └── detail-2.jpg
│   ├── rambak-noya.jpg
│   ├── yangko.jpg
│   ├── intip.jpg
│   └── wingko.jpg
├── drink/             # (BELUM ADA - perlu dibuat)
│   ├── wedang-uwuh.jpg
│   ├── wedang-ronde.jpg
│   └── jamu.jpg
├── places/            # (BELUM ADA - perlu dibuat)
│   ├── omah-dhuwur.jpg
│   ├── omah-dhuwur-1.jpg
│   └── omah-dhuwur-2.jpg
├── whatson/
│   ├── gapura.png     ✅ ADA
│   ├── jalan.png      ✅ ADA
│   ├── kroncong.png   ✅ ADA
│   ├── legi.png       ✅ ADA
│   ├── naga.png       ✅ ADA
│   ├── pasar.png      ✅ ADA
│   ├── pawai.png      ✅ ADA
│   ├── pawaiperak.png ✅ ADA
│   ├── pawaitari.png  ✅ ADA
│   └── silver.png      ✅ ADA
└── events/            # (BELUM ADA - perlu dibuat)
    └── pasar-lawas/
        ├── hero.jpg
        ├── hl-1.jpg
        ├── hl-2.jpg
        ├── hl-3.jpg
        ├── hl-4.jpg
        ├── g-1.jpg
        ├── g-2.jpg
        ├── g-3.jpg
        ├── g-4.jpg
        ├── g-5.jpg
        └── g-6.jpg
```

## 🗺️ Mapping Detail

### 1. Villages (5 images)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/villages/purbayan.jpg` | `purbayan.png` | ⚠️ EXTENSION BERBEDA | Rename atau update path |
| `/villages/prenggan.jpg` | `prenggan.png` | ⚠️ EXTENSION BERBEDA | Rename atau update path |
| `/villages/basen.jpg` | `basen.png` | ⚠️ EXTENSION BERBEDA | Rename atau update path |
| `/villages/kemasan.jpg` | `kemasan.png` | ⚠️ EXTENSION BERBEDA | Rename atau update path |
| `/villages/jagalan.jpg` | `jagalan.png` | ⚠️ EXTENSION BERBEDA | Rename atau update path |

**Solusi**: Buat folder `public/villages/` dan copy/rename file .png menjadi .jpg, atau update path di data.js menjadi .png

### 2. Tours (8 tours)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/tour/heritage-walk/hero.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file atau gunakan fallback |
| `/tour/pasar.png` | `tour/pasar.png` | ✅ ADA | OK |
| `/tour/silvera.png` | `tour/silvera.png` | ✅ ADA | OK |
| `/tour/silverb.png` | `tour/silverb.png` | ✅ ADA | OK |
| `/tour/silverc.png` | `tour/silverc.png` | ✅ ADA | OK |
| `/tour/masak.png` | `tour/masak.png` | ✅ ADA | OK |
| `/tour/batik.jpeg` | `tour/batik.jpeg` | ✅ ADA | OK |
| `/tour/pottery.png` | `tour/pottery.png` | ✅ ADA | OK |

**Solusi**: Untuk `heritage-walk/hero.jpg`, bisa gunakan `tour/walk.png` atau buat folder baru

### 3. Foods (5 foods)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/food/kipo/hero.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file |
| `/food/kipo/detail-1.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file |
| `/food/kipo/detail-2.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file |
| `/food/rambak-noya.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/food/yangko.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/food/intip.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/food/wingko.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |

**Solusi**: Buat folder `public/food/` dan semua file yang diperlukan, atau gunakan placeholder/fallback

### 4. Drinks (3 drinks)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/drink/wedang-uwuh.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/drink/wedang-ronde.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/drink/jamu.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |

**Solusi**: Buat folder `public/drink/` dan semua file yang diperlukan

### 5. Places (1 place)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/places/omah-dhuwur.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/places/omah-dhuwur-1.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/places/omah-dhuwur-2.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |

**Solusi**: Buat folder `public/places/` dan semua file yang diperlukan

### 6. Events (1 event dengan banyak gambar)

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/events/pasar-lawas/hero.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file |
| `/events/pasar-lawas/hl-1.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/events/pasar-lawas/hl-2.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/events/pasar-lawas/hl-3.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/events/pasar-lawas/hl-4.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |
| `/events/pasar-lawas/g-1.jpg` sampai `g-6.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |

**Solusi**: Buat folder `public/events/pasar-lawas/` dan semua file yang diperlukan, atau gunakan gambar dari `whatson/` sebagai fallback

### 7. Location Photos

| Data.js Path | Public File | Status | Action |
|-------------|-------------|--------|--------|
| `/food/location/pasar-legi.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat folder & file |
| `/places/omah-dhuwur.jpg` | ❌ TIDAK ADA | ❌ MISSING | Buat file |

## 📋 Summary

### ✅ Yang Sudah Ada
- **Tours**: 7/8 (87.5%) - hanya `heritage-walk/hero.jpg` yang missing
- **Whatson**: 9/9 (100%) - semua ada
- **Villages**: 5/5 (100%) - tapi extension berbeda (.png vs .jpg)

### ❌ Yang Belum Ada
- **Foods**: 0/7 (0%) - semua missing
- **Drinks**: 0/3 (0%) - semua missing
- **Places**: 0/3 (0%) - semua missing
- **Events**: 0/11 (0%) - semua missing (pasar-lawas)
- **Location Photos**: 0/2 (0%) - semua missing

## 🔧 Rekomendasi

1. **Untuk Villages**: Update path di `VillagesGrid.jsx` dan `migrate-data.js` dari `.jpg` ke `.png`
2. **Untuk Tours**: Gunakan `tour/walk.png` sebagai fallback untuk `heritage-walk/hero.jpg`
3. **Untuk Foods/Drinks/Places**: 
   - Buat folder structure yang diperlukan
   - Gunakan placeholder images atau gambar yang ada
   - Atau update data.js untuk menggunakan gambar yang sudah ada
4. **Untuk Events**: Gunakan gambar dari `whatson/` sebagai fallback untuk `pasar-lawas`

## 🚀 Action Items

1. ✅ Buat folder `public/villages/` dan copy/rename .png files
2. ✅ Update path villages dari .jpg ke .png di data files
3. ⚠️ Buat folder `public/food/`, `public/drink/`, `public/places/`
4. ⚠️ Buat folder `public/events/pasar-lawas/`
5. ⚠️ Sediakan placeholder images atau update data.js untuk menggunakan gambar yang ada

