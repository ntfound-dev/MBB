# Muara Badak Bersatu — Full Mock v2

Versi ini dibuat untuk review tim sebelum database dan data peserta asli digunakan.

## Route

- `/` — website publik
- `/daftar` — form pendaftaran demo
- `/program/welder`
- `/program/rigger`
- `/program/k3`
- `/karier` — konsep pendampingan setelah pelatihan
- `/admin` — dashboard administrasi mock

## Data

Seluruh data pada `/admin` adalah data fiktif. NIK dan nomor telepon ditampilkan dalam bentuk masked.
Dashboard **belum memiliki login dan belum terhubung database**, jadi jangan masukkan data peserta asli.

## Test

```bash
npm install
npm run typecheck
npm run build
```

## Preview Vercel

```bash
vercel
```

Jangan gunakan `vercel --prod` sampai hasil review disetujui.
