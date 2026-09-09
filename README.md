# Muara Badak Bersatu

Website publik Muara Badak Bersatu.

## Stack

- Next.js 16
- React 19
- TypeScript strict
- Node.js 24+
- App Router

## Data publik

Konten publik utama ada di:

```text
lib/site-data.ts
```

Website tidak memuat target peserta, margin, database peserta, alur pembayaran internal, nilai peserta, atau mekanisme administrasi internal.

## Konfigurasi publik

Salin `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Kemudian isi jika sudah resmi:

```env
NEXT_PUBLIC_REGISTRATION_URL=https://...
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/...
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/...
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/...
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/...
NEXT_PUBLIC_EMAIL=...
```

Jangan masukkan secret, data peserta, token, atau kredensial database ke variabel `NEXT_PUBLIC_*`.

## Development Termux

```bash
npm install
npm run typecheck
npm run dev
```

`dev` memakai webpack untuk menghindari masalah HMR Turbopack di Termux.

## Production

```bash
npm run typecheck
npm run build
vercel
```
