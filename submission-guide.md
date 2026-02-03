# Submission Proyek: Notes App

Dokumen ini merupakan panduan lengkap submission proyek **Notes App**, yang berfungsi sebagai asesmen kelulusan kelas. Seluruh ketentuan di dalam dokumen ini bersifat mengikat dan menjadi dasar penilaian reviewer.

---

## 1. Pengantar

Sampai tahap ini, peserta telah mempelajari:

- Pembuatan formulir web yang benar.
- Penyusunan layout menggunakan CSS Grid Layout.
- Pembangunan komponen UI dengan Web Component.

Pemahaman terhadap materi di atas tidak dinilai dari teori, melainkan diuji melalui **asesmen proyek**. Peserta diminta membangun sebuah aplikasi web yang akan diperiksa secara manual oleh reviewer.

---

## 2. Tujuan Proyek

Peserta diwajibkan membangun aplikasi web bertema **aplikasi pencatatan (Notes App)**.

Ketentuan umum:

- Proyek ini adalah **syarat kelulusan kelas**.
- Kreativitas diperbolehkan, tetapi harus berada dalam batas kriteria teknis.
- Aplikasi harus berfungsi dan dapat diverifikasi secara nyata melalui DOM dan perilaku aplikasi.

---

## 3. Kompetensi yang Diuji

Proyek ini menguji kemampuan peserta dalam:

- Manipulasi DOM menggunakan JavaScript murni (vanilla JS).
- Pembuatan dan pengelolaan formulir HTML.
- Penyusunan layout menggunakan CSS Grid.
- Pembuatan dan penggunaan Web Component (custom element).

---

## 4. Kriteria Wajib (Penentu Lulus / Tidak Lulus)

Seluruh kriteria di bawah **harus terpenuhi**. Jika satu saja tidak terpenuhi, submission **ditolak dan tidak dinilai**.

### 4.1 Menampilkan Daftar Catatan

- Aplikasi harus menampilkan **seluruh data dummy** yang disediakan.
- Data berasal dari JavaScript Object (Array).
- Seluruh data harus dirender menjadi elemen HTML nyata di DOM.
- Tidak boleh ada data yang hilang atau hanya tersimpan di variabel JavaScript.
- Keberadaan elemen dapat diverifikasi melalui DevTools (tab _Elements_).

---

### 4.2 Formulir Tambah Catatan

Aplikasi wajib memiliki formulir dengan ketentuan:

- Terdapat dua input:
  - Judul catatan.
  - Isi catatan (body).

- Body **wajib menggunakan `<textarea>`** atau elemen input multi-baris setara.

---

### 4.3 Penggunaan CSS Grid

- CSS Grid **wajib digunakan** minimal untuk menyusun layout daftar catatan.
- Jika seluruh layout hanya menggunakan Flexbox atau teknik lain, kriteria ini tidak terpenuhi.

---

### 4.4 Web Component

- Minimal terdapat **3 custom element berbeda**.
- Setiap custom element harus:
  - Didefinisikan menggunakan `customElements.define`.
  - Diimpor agar dapat digunakan di DOM.

- Komponen bebas ditentukan (item catatan, app bar, form, dsb.).

---

## 5. Kriteria Opsional (Penentu Nilai)

Kriteria ini **tidak wajib**, tetapi meningkatkan rating jika diterapkan.

### 5.1 Tampilan Menarik

- Skema warna konsisten.
- Tata letak rapi dan tidak saling menimpa.
- Font mudah dibaca.
- Padding dan margin proporsional.

### 5.2 Realtime Validation

- Validasi berjalan saat input diisi (`input`, `change`).
- Pesan kesalahan tidak menunggu tombol submit ditekan.

### 5.3 Custom Attribute

- Custom element menangani attribute buatan.
- Attribute digunakan di HTML.
- Perubahan attribute memengaruhi tampilan atau perilaku komponen.

### 5.4 Tampilan Responsive

- Layout menyesuaikan berbagai ukuran layar.
- Tidak ada elemen keluar layar atau rusak.

---

## 6. Sistem Penilaian

Penilaian menggunakan skala bintang **1–5** dan hanya berlaku jika submission **lulus**.

| Rating | Keterangan                                                  |
| ------ | ----------------------------------------------------------- |
| ★      | Kriteria wajib terpenuhi, tetapi terindikasi plagiat        |
| ★★     | Hanya kriteria wajib, kualitas setara atau di bawah latihan |
| ★★★    | Hanya kriteria wajib                                        |
| ★★★★   | Kriteria wajib + minimal 2 kriteria opsional                |
| ★★★★★  | Kriteria wajib + minimal 3 kriteria opsional                |

Jika submission **ditolak**, tidak ada rating.

---

## 7. Tips Submission (Panduan Teknis Penting)

### 7.1 Menampilkan Sample Data ke DOM

- Data sample disediakan dalam bentuk Array JavaScript.
- Data **wajib dirender ke DOM**.
- Keberhasilan dapat diverifikasi melalui DevTools.

DOM API yang umum digunakan:

- `querySelector`, `querySelectorAll`
- `createElement`
- `setAttribute`, `getAttribute`, `removeAttribute`
- `classList`
- `innerText`, `textContent`
- `innerHTML`
- `append`

Pendekatan bebas selama data tampil lengkap di DOM.

---

### 7.2 Realtime Validation Harus Realtime

- Validasi berjalan saat pengguna mengisi input.
- Jika pesan error hanya muncul setelah submit, maka **bukan realtime validation**.

---

### 7.3 Custom Element Wajib Diimpor

- Custom element yang sudah didefinisikan harus diimpor.
- File JavaScript cukup diimpor sebagai module.
- Tidak perlu `export` jika hanya ingin menjalankan definisi.

Jika file tidak diimpor, browser tidak mengenali custom element.

---

## 8. Ketentuan Penolakan Submission

Submission akan **langsung ditolak** jika:

- Ada kriteria wajib yang tidak terpenuhi.
- Menggunakan atau meniru proyek peserta lain.
- Menggunakan framework JavaScript (React, Angular, Vue).
- Menyertakan folder `node_modules` dalam ZIP.

Proyek wajib menggunakan **JavaScript murni**.

---

## 9. Ketentuan Berkas Submission

- Berisi HTML, CSS, JavaScript, dan aset pendukung.
- Dikemas sebagai **satu folder proyek** dalam format ZIP.
- Contoh nama berkas: `notes-app.zip`.
- Tidak menggunakan build system atau dependency npm.

---

## 10. Proses Review

- Review dilakukan maksimal **3 hari kerja** (tidak termasuk libur).
- Tidak disarankan submit berkali-kali.
- Hasil review dikirim melalui email dan halaman submission.

---

## 11. Ketentuan Plagiarisme

- Submission harus **karya sendiri**.
- Sumber lain hanya sebagai referensi.
- Tingkat kemiripan maksimal **70%**.

Sanksi pelanggaran:

- Penangguhan akun Dicoding.
- Tidak dapat melakukan submission.
- Progres kelas di-reset ke 0.

---

## 12. Kesimpulan Akhir

- **Kriteria wajib menentukan kelulusan.**
- **Kriteria opsional menentukan nilai.**
- Kepatuhan spesifikasi dan orisinalitas kode bersifat mutlak.
- Aplikasi yang berjalan tetap dapat ditolak jika melanggar aturan teknis atau etika.

**Bangun Notes App dengan JavaScript murni, tampilkan seluruh data dummy di DOM, gunakan CSS Grid dan Web Component sesuai ketentuan, dan pastikan kode adalah karya sendiri.**

---
