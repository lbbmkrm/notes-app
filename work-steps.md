## Langkah-Langkah Pengerjaan Submission Notes App

### 1. Struktur Proyek & Berkas Dasar

- Folder Utama: `submission1`
- Folder Sumber: `src/` (Komponen, Data, Styles)
- File Entry: `index.html` terhubung ke `src/main.js` (type="module") dan `src/styles/main.css`.
- Arsitektur: Berbasis Web Components (Custom Elements) yang dikelola oleh satu komponen utama `<notes-app>`.

---

### 2. Penyiapan Data Dummy

- Lokasi: `src/data/notes.js`.
- Format: Array of Objects (id, title, body, createdAt).
- Metode: `export default` agar bisa di-import oleh komponen utama.

---

### 3. Pembuatan Komponen UI (Web Components)

Minimal 3 custom element berbeda (Saat ini sudah 4):

- **`<notes-app>`**: Komponen root/orchestrator (Selesai ✅)
- **`<app-bar>`**: Komponen header (Selesai ✅)
- **`<note-list>`**: Komponen kontainer daftar catatan (Selesai ✅)
- **`<note-item>`**: Komponen kartu catatan individual (Selesai ✅)
- **`<note-form>`**: Komponen formulir tambah catatan (**BELUM**)

---

### 4. Implementasi CSS Grid & Layout

- Lokasi: Di dalam Shadow DOM `<note-list>`.
- Teknik: `display: grid` dengan `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.
- Responsivitas: Menggunakan unit `fr` dan `auto-fit` agar layout adaptif tanpa media query berlebih.

---

### 5. Manipulasi DOM & Rendering Data

- Lokasi: Di dalam `<note-list>`.
- API: `document.createElement('note-item')`, `appendChild`, dan penggunaan `Setter` (`setNote`) untuk mengirim data antar komponen Shadow DOM.

---

### 6. Pembuatan Form Tambah Catatan

- Komponen: `<note-form>`.
- Elemen Wajib: `<input>` (judul) dan `<textarea>` (isi).
- Penanganan Event: `submit` untuk menangkap data baru.

---

### 7. Validasi Real-time

- Menerapkan Constraint Validation API.
- Live feedback saat user mengetik di dalam `<note-form>`.

---

### 8. Integrasi Akhir & State Management

- Cara menambah data baru dari `<note-form>` ke dalam list yang sudah ada di `<notes-app>`.
- Memastikan sinkronisasi data antar komponen.

---

### 9. Finishing & Checklist

- Memastikan tidak ada error di Developer Tools Console.
- Memastikan Shadow DOM terenkapsulasi dengan benar.
- Cek kriteria wajib (3 Web Components, CSS Grid, Form Textarea).

---

### 10. ZIP dan Submit

- Nama file: `notes-app.zip`.
- Pastikan folder `node_modules` tidak ikut ter-ZIP jika ada.
