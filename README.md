# PODH — Persatuan Operator, Driver, Helper

Website organisasi + training center PODH.

## Konsep

PODH adalah **organisasi**, bukan CV.

Website publik berfungsi sebagai pusat informasi program pelatihan kompetensi:

- Welder
- K3
- Operator Crane
- Rigger

Setiap pelatihan mempunyai halaman detail dengan:

- status pendaftaran
- periode pendaftaran
- tanggal pelatihan
- metode
- lokasi
- kuota
- instruktur / fasilitator
- biaya
- lembaga / mitra sertifikasi
- deskripsi & materi
- tombol pendaftaran

Data training utama ada di:

```text
lib/training-data.ts
```

## Reguler vs Permintaan

### Reguler

Pelatihan terjadwal untuk peserta umum melalui PODH.

### Permintaan perusahaan

PODH tetap organisasi. Pelatihan khusus perusahaan diarahkan ke **CV terpisah** sebagai badan usaha pelaksana untuk:

- penawaran
- kontrak
- invoice
- pembayaran
- administrasi komersial

Nama CV dapat diisi melalui:

```env
NEXT_PUBLIC_CV_NAME=
NEXT_PUBLIC_REQUEST_WHATSAPP_URL=
```

## Pendaftaran peserta

Frontend sudah mempunyai form:

- program
- nama lengkap
- NIK
- nomor HP / WhatsApp
- domisili
- satu PDF dokumen

Saat ini form masih **simulasi frontend** dan sengaja tidak mengirim NIK/PDF ke server.

Sebelum data asli digunakan, backend wajib mempunyai auth, private storage, authorization, dan perlindungan data peserta.

## Akun peserta

UI akun disiapkan, tetapi tombol masuk default dinonaktifkan:

```env
NEXT_PUBLIC_ENABLE_ACCOUNT=false
```

Aktifkan hanya setelah backend autentikasi aman tersedia.

## Development di Termux

```bash
npm run typecheck
git diff --check
```

Tidak perlu build lokal di Termux. Gunakan Vercel untuk build production:

```bash
vercel --prod
```
