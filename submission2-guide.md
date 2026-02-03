# Panduan Lengkap Submission Proyek Notes App

Dokumen ini merangkum seluruh panduan submission, mulai dari tips teknis, instruksi umum, kriteria wajib dan opsional, sistem penilaian, hingga ketentuan penolakan. Seluruh isi disusun ulang dalam format teknis dan terstruktur tanpa mengubah substansi aturan.

---

## A. Tips Submission Proyek Kedua

### 1. Larangan Direktori `node_modules` dalam ZIP

- Folder `node_modules` **tidak boleh** disertakan dalam berkas ZIP submission.
- Keberadaan `node_modules` akan menyebabkan submission **langsung ditolak**.
- `package.json` wajib ada agar reviewer dapat menjalankan `npm install`.

### 2. Perintah Webpack Harus Dibungkus NPM Script

- Jangan menjalankan webpack secara manual dengan `npx` saat workflow utama.
- Semua perintah build dan dev harus tersedia di `package.json` bagian `scripts`.
- Nama file konfigurasi webpack **harus konsisten** antara filesystem dan script.

Contoh:

```json
"scripts": {
  "build": "webpack --config webpack.prod.js",
  "start-dev": "webpack serve --config webpack.dev.js"
}
```

### 3. Sumber Data Wajib dari RESTful API

- Data aplikasi **harus** berasal dari Notes API v2.
- Data dummy, array lokal, atau localStorage **dilarang** sebagai sumber utama.
- Pengambilan data dilakukan menggunakan Fetch API (`fetch`).

Endpoint API: [https://notes-api.dicoding.dev/v2](https://notes-api.dicoding.dev/v2)

### 4. Indikator Loading Wajib pada Proses Asynchronous

- Setiap proses network harus memiliki indikator loading.
- Loading muncul saat request berjalan dan hilang setelah selesai.
- Implementasi dapat menggunakan `finally` (Promise atau async/await).
- Web Component untuk loading diperbolehkan dan bernilai tambah.

---

## B. Pengantar Instruksi Submission

Submission ini adalah asesmen akhir untuk menguji pemahaman nyata terhadap:

- Manajemen JavaScript package (npm).
- Module bundling menggunakan webpack.
- Konsumsi data dari RESTful API.

Aplikasi yang dibangun adalah **kelanjutan dari Notes App sebelumnya**, bukan proyek baru. Fokus utama adalah integrasi teknis dan arsitektur, bukan sekadar tampilan.

Kreativitas diperbolehkan, tetapi **kepatuhan terhadap kriteria teknis adalah syarat kelulusan**.

---

## C. Kriteria Wajib Submission

### Kriteria Wajib 1: Mempertahankan Kriteria Submission Sebelumnya

- Semua kriteria submission pertama **harus tetap terpenuhi**.
- Tidak boleh ada regresi fitur atau struktur.

### Kriteria Wajib 2: Menggunakan RESTful API sebagai Sumber Data

API yang digunakan:

- Notes API v2

Fitur wajib yang harus terhubung ke API:

1. Menambahkan catatan (POST).
2. Mendapatkan dan menampilkan daftar catatan (GET).
3. Menghapus catatan (DELETE).

Catatan penting:

- Seluruh data lokal atau dummy **harus dihapus**.
- UI harus merefleksikan data dari server secara nyata.

---

## D. Kriteria Opsional (Nilai Tambah)

### Opsional 1: Fitur Arsip Catatan

- Menggunakan endpoint archive dan unarchive dari API.
- Catatan aktif dan arsip harus dipisahkan berdasarkan response server.

### Opsional 2: Feedback Saat Error

- Menampilkan pesan saat request gagal.
- Minimal menggunakan `alert()`.
- Error handling harus berbasis kondisi nyata (try/catch atau `response.ok`).

### Opsional 3: Efek Animasi atau Pergerakan Halus

- Dapat menggunakan CSS atau library pihak ketiga.
- Animasi tidak boleh mengganggu fungsional aplikasi.

### Opsional 4: Prettier sebagai Code Formatter

- Prettier harus terdaftar di `package.json`.
- Harus ada file konfigurasi `.prettierrc`.
- Kode terlihat konsisten dan rapi.

---

## E. Sistem Penilaian

Penilaian menggunakan skala bintang 1–5 dan **hanya berlaku jika submission lulus**.

### Rating 1

- Terindikasi plagiat, meskipun fitur berjalan.

### Rating 2

- Hanya memenuhi kriteria wajib.
- Kualitas kode buruk (tidak rapi, banyak kode tidak terpakai).

### Rating 3

- Semua kriteria wajib terpenuhi.

### Rating 4

- Semua kriteria wajib + minimal 2 kriteria opsional.

### Rating 5

- Semua kriteria wajib + minimal 3 kriteria opsional.

---

## F. Ketentuan Submission Ditolak

Submission **akan ditolak langsung** jika:

- Ada kriteria wajib yang tidak terpenuhi.
- Menggunakan proyek orang lain.
- Menggunakan framework JavaScript (React, Angular, Vue).
- Menyertakan `node_modules` dalam ZIP.
- Tidak menyertakan `package.json`.

---

## G. Ketentuan Berkas Submission

- Submission berupa folder proyek dalam bentuk ZIP.
- Berisi HTML, CSS, JavaScript, dan aset pendukung.
- Contoh nama berkas: `notes-app.zip`.

---

## H. Proses Review

- Waktu review maksimal 3 hari kerja.
- Tidak disarankan submit berulang tanpa perbaikan.
- Hasil review dikirim melalui email dan halaman submission.

---

## I. Kebijakan Anti-Plagiarisme

- Tingkat kemiripan kode tidak boleh >70%.
- Kode dari sumber luar hanya sebagai referensi.
- Pelanggaran berakibat:
  - Penangguhan akun Dicoding.
  - Reset progres belajar ke 0.

---
