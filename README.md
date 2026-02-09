# 📝 Aplikasi Catatan (Notes App)

Aplikasi catatan modern yang dibangun dengan vanilla JavaScript dan Web Components. Proyek ini mendemonstrasikan arsitektur yang bersih, integrasi RESTful API, dan desain UI/UX yang menarik.

## ✨ Fitur

- **📋 Operasi CRUD Lengkap**: Membuat, membaca, mengarsipkan, dan menghapus catatan
- **🔍 Pencarian Real-time**: Filter catatan berdasarkan judul atau isi secara instan
- **📂 Filter Cerdas**: Organisasi catatan dengan navigasi tab (Semua, Aktif, Diarsipkan)
- **🎨 UI Modern**: Desain responsif yang bersih dengan animasi halus
- **⚡ Indikator Loading**: Feedback visual selama operasi API
- **📱 Responsif Penuh**: Dioptimalkan untuk desktop, tablet, dan perangkat mobile
- **🎭 Modal Overlay**: Form dan tampilan detail yang indah
- **✅ Validasi Form**: Validasi input real-time dengan pesan error yang membantu

## 🛠️ Teknologi

- **Vanilla JavaScript (ES6+)**: Tanpa framework, JavaScript murni
- **Web Components**: Custom elements dengan Shadow DOM
- **Webpack**: Module bundling dan optimasi build
- **Babel**: Transpilasi JavaScript untuk kompatibilitas browser
- **Anime.js**: Animasi dan transisi yang halus
- **SweetAlert2**: Notifikasi alert dan toast yang cantik
- **CSS Grid & Flexbox**: Teknik layout modern
- **RESTful API**: Integrasi dengan Notes API v2

## 📦 Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/username-anda/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan development server**

   ```bash
   npm run start-dev
   ```

   Aplikasi akan tersedia di `http://localhost:8080`

4. **Build untuk production**
   ```bash
   npm run build
   ```
   File production akan dibuat di folder `dist`.

## 🚀 Cara Penggunaan

### Menambah Catatan

1. Klik tombol **"+ Catatan Baru"** di header atau tombol floating action button (FAB)
2. Isi judul (minimal 3 karakter) dan isi catatan (minimal 10 karakter)
3. Klik **"Tambah Catatan"** untuk menyimpan

### Mencari Catatan

- Ketik di search bar untuk memfilter catatan berdasarkan judul atau isi
- Pencarian tidak case-sensitive dan update secara real-time

### Memfilter Catatan

- **Semua**: Tampilkan semua catatan (aktif dan diarsipkan)
- **Aktif**: Tampilkan hanya catatan aktif
- **Diarsipkan**: Tampilkan hanya catatan yang diarsipkan

### Mengelola Catatan

- **Lihat Detail**: Klik kartu catatan untuk melihat isi lengkap
- **Arsipkan/Aktifkan**: Klik tombol arsip pada kartu catatan
- **Hapus**: Klik tombol hapus dan konfirmasi aksi

## 📁 Struktur Proyek

```
notes-app/
├── src/
│   ├── api/
│   │   └── notes-api.js           # Layer service API
│   ├── components/
│   │   ├── appBarComponent.js     # Header dengan search dan tombol tambah
│   │   ├── navbarComponent.js     # Navigasi tab
│   │   ├── noteFormComponent.js   # Form untuk menambah catatan
│   │   ├── noteItemComponent.js   # Kartu catatan individual
│   │   ├── noteListComponent.js   # Grid layout untuk catatan
│   │   ├── notesAppComponent.js   # Komponen aplikasi utama
│   │   └── loadingIndicatorComponent.js  # Animasi loading
│   ├── styles/
│   │   └── main.css               # Style global dan CSS variables
│   └── main.js                    # Entry point aplikasi
├── index.html                     # Template HTML
├── package.json                   # Dependencies dan scripts
├── webpack.common.js              # Konfigurasi dasar Webpack
├── webpack.dev.js                 # Konfigurasi development
├── webpack.prod.js                # Konfigurasi production
└── README.md                      # File ini
```

## 🎨 Highlight Desain

- **Skema Warna**: Tema hijau lembut dengan warna aksen yang dipilih dengan hati-hati
- **Tipografi**: Font family Inter untuk keterbacaan yang bersih dan modern
- **Animasi**: Transisi halus menggunakan Anime.js untuk UX yang lebih baik
- **Aksesibilitas**: Tombol yang ramah sentuhan pada perangkat mobile
- **Grid Responsif**: Layout adaptif menggunakan CSS Grid

## 🔌 Integrasi API

Aplikasi ini menggunakan [Dicoding Notes API v2](https://notes-api.dicoding.dev/v2) untuk persistensi data.

**Endpoint yang digunakan:**

- `GET /notes` - Mengambil semua catatan aktif
- `GET /notes/archived` - Mengambil catatan yang diarsipkan
- `POST /notes` - Membuat catatan baru
- `POST /notes/{id}/archive` - Mengarsipkan catatan
- `POST /notes/{id}/unarchive` - Mengaktifkan kembali catatan
- `DELETE /notes/{id}` - Menghapus catatan

## 📝 Scripts

- `npm run start-dev` - Menjalankan development server dengan hot reload
- `npm run build` - Build untuk production
- `npm run format` - Format kode dengan Prettier

## 🌟 Implementasi Fitur Utama

### Arsitektur Web Components

Semua komponen UI dibangun sebagai custom elements menggunakan Web Components API, menyediakan:

- Enkapsulasi dengan Shadow DOM
- Kode yang dapat digunakan kembali dan mudah dipelihara
- Batasan komponen yang jelas

### Manajemen State

- State terpusat di komponen `NotesApp` utama
- Komunikasi antar komponen berbasis event
- Update DOM yang efisien dengan re-rendering yang tertarget

### Error Handling

- Blok try-catch yang komprehensif untuk semua operasi async
- Pesan error yang ramah pengguna via SweetAlert2
- Degradasi yang anggun ketika API tidak tersedia

## 📄 Lisensi

Proyek ini dibuat sebagai submission untuk kursus Frontend Web Development Dicoding.

## 👨‍💻 Pembuat

Dibuat dengan ❤️ sebagai bagian dari learning path Frontend Web Development Dicoding.

---

**Catatan**: Proyek ini mendemonstrasikan kemahiran dalam vanilla JavaScript, Web Components, integrasi API, dan praktik pengembangan web modern tanpa bergantung pada framework.
