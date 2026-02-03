# Rencana Pengerjaan Submission 2: Notes App (API & Webpack)

Dokumen ini berisi langkah-langkah sistematis untuk meningkatkan aplikasi Notes App agar memenuhi kriteria Submission 2 dari Dicoding.

---

## 🏗️ Langkah 1: Inisialisasi Project & Webpack

Pada tahap ini, kita akan mengubah struktur project agar menggunakan toolkit modern.

- [ ] Inisialisasi NPM (`npm init -y`).
- [ ] Instalasi Webpack (`webpack`, `webpack-cli`, `webpack-dev-server`).
- [ ] Instalasi Loaders & Plugins (`style-loader`, `css-loader`, `html-webpack-plugin`, `copy-webpack-plugin`).
- [ ] Konfigurasi Webpack (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`).
- [ ] Menambahkan script `build` dan `start-dev` di `package.json`.
- [ ] Penyesuaian struktur folder (memastikan `index.html` dan `src` sesuai dengan output build).

## 🌐 Langkah 2: Pembuatan Modul API

Mengganti data lokal dengan koneksi ke server riil.

- [ ] Membuat folder `src/api` dan file `notes-api.js`.
- [ ] Implementasi fungsi `fetchNotes` (GET /notes).
- [ ] Implementasi fungsi `fetchArchivedNotes` (GET /notes/archived).
- [ ] Implementasi fungsi `addNote` (POST /notes).
- [ ] Implementasi fungsi `deleteNote` (DELETE /notes/{id}).
- [ ] Implementasi fungsi `archiveNote` (POST /notes/{id}/archive).
- [ ] Implementasi fungsi `unarchiveNote` (POST /notes/{id}/unarchive).

## ⏳ Langkah 3: Indikator Loading & Komponen Baru

Memberikan feedback visual kepada user saat proses asynchronous berjalan.

- [ ] Membuat Web Component `<loading-indicator>`.
- [ ] Menambahkan logic global untuk menampilkan/menyembunyikan loading saat proses `fetch`.
- [ ] Menambahkan tombol **Hapus** pada komponen `NoteItem`.

## 🔄 Langkah 4: Integrasi Component dengan API

Menghubungkan logic UI dengan data dari server.

- [ ] Update `notesAppComponent.js` agar memanggil API saat `connectedCallback`.
- [ ] Update logic `addNote` agar mengirim data ke server terlebih dahulu sebelum memperbarui UI.
- [ ] Update logic **Arsip** dan **Hapus** agar sinkron dengan database server.
- [ ] Implementasi pengelompokan data (Aktif vs Arsip) berdasarkan respon API.

## 🛡️ Langkah 5: Handling Error & Fitur Opsional

Meningkatkan kualitas aplikasi untuk mendapatkan Rating 5.

- [ ] Implementasi Try-Catch pada setiap call API.
- [ ] Menampilkan pesan error (menggunakan `alert` atau komponen khusus).
- [ ] Instalasi & Konfigurasi **Prettier** sebagai code formatter.
- [ ] Melakukan pengecekan akhir terhadap kriteria wajib dan opsional (Web Components tetap terjaga).

## 📦 Langkah 6: Final Build & Pengemasan

- [ ] Jalankan `npm run build` untuk memastikan tidak ada error.
- [ ] Pastikan folder `dist` (hasil build) berjalan dengan baik.
- [ ] Bersihkan file yang tidak perlu (seperti data dummy lama).
- [ ] Siapkan berkas ZIP (tanpa `node_modules`).

---

**Status Proyek:** 🟢 Siap Memulai Tahap 1.
