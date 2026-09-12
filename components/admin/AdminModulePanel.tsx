export type AdminModuleKey =
  | "members"
  | "payments"
  | "attendance"
  | "requests"
  | "activities"
  | "alumni"
  | "reports";

const modules: Record<
  AdminModuleKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  }
> = {
  members: {
    eyebrow: "KEANGGOTAAN",
    title: "Verifikasi dan data anggota",
    description:
      "Kelola pendaftaran, pemeriksaan identitas, status verifikasi, dan ID anggota PODH.",
    items: [
      "Pendaftar baru",
      "Verifikasi atau tolak",
      "Pencarian anggota",
      "Cetak daftar anggota",
    ],
  },
  payments: {
    eyebrow: "KEUANGAN PELATIHAN",
    title: "Pembayaran dan cicilan",
    description:
      "Catat pembayaran, cicilan, sisa tagihan, metode pembayaran, dan bukti transaksi.",
    items: [
      "Input pembayaran",
      "Catat cicilan",
      "Sisa tagihan",
      "Kuitansi dan rekap",
    ],
  },
  attendance: {
    eyebrow: "ABSENSI",
    title: "Kehadiran pelatihan 4 hari",
    description:
      "Pantau kehadiran peserta per hari. QR Google Form dapat menjadi input, database PODH tetap menjadi sumber data utama.",
    items: ["Hari 1", "Hari 2", "Hari 3", "Hari 4", "Rekap kehadiran"],
  },
  requests: {
    eyebrow: "PERMINTAAN",
    title: "Permintaan perusahaan",
    description:
      "Pantau permintaan masuk, review PODH, penerusan ke CV, tindak lanjut, dan penyelesaian.",
    items: ["Permintaan baru", "Direview", "Diteruskan ke CV", "Selesai"],
  },
  activities: {
    eyebrow: "KEGIATAN",
    title: "Kegiatan, rapat, dan seminar",
    description:
      "Kelola agenda, keputusan rapat, kegiatan organisasi, dokumentasi, dan materi internal.",
    items: ["Tambah kegiatan", "Buat rapat", "Catat keputusan", "Dokumentasi"],
  },
  alumni: {
    eyebrow: "ALUMNI",
    title: "Data lulusan dan tracer study",
    description:
      "Kelola alumni per program dan batch tanpa mengganti status keanggotaan utama.",
    items: ["Daftar alumni", "Riwayat program", "Tracer study", "Rekap alumni"],
  },
  reports: {
    eyebrow: "LAPORAN",
    title: "Print, PDF, Excel, dan CSV",
    description:
      "Pusat laporan untuk keanggotaan, peserta, absensi, pembayaran, kegiatan, permintaan, dan alumni.",
    items: ["Anggota", "Peserta", "Absensi", "Pembayaran", "Alumni"],
  },
};

export function AdminModulePanel({ module }: { module: AdminModuleKey }) {
  const item = modules[module];

  return (
    <section className="admin-module-panel">
      <div className="admin-module-hero">
        <span>{item.eyebrow}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <div className="admin-module-grid">
        {item.items.map((label) => (
          <article key={label}>
            <small>MODUL</small>
            <strong>{label}</strong>
            <p>Struktur UI siap. Data produksi disambungkan pada tahap API.</p>
          </article>
        ))}
      </div>

      <div className="admin-module-note">
        <strong>Mode persiapan</strong>
        <p>
          Belum ada data organisasi yang dibuat-buat. Modul ini menyiapkan
          alur admin sampai backend tahap berikutnya diaktifkan.
        </p>
      </div>
    </section>
  );
}
