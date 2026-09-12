"use client";

export type AdminModuleKey =
  | "members"
  | "payments"
  | "attendance"
  | "requests"
  | "activities"
  | "alumni"
  | "reports";

type GenericModule = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

const genericModules: Record<
  Exclude<AdminModuleKey, "requests" | "activities" | "alumni">,
  GenericModule
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
  reports: {
    eyebrow: "LAPORAN",
    title: "Print, PDF, Excel, dan CSV",
    description:
      "Pusat laporan untuk keanggotaan, peserta, absensi, pembayaran, kegiatan, permintaan, dan alumni.",
    items: ["Anggota", "Peserta", "Absensi", "Pembayaran", "Kegiatan", "Permintaan", "Alumni"],
  },
};

const requestStatuses = [
  "Baru",
  "Sedang Direview",
  "Diteruskan ke CV",
  "Sedang Diproses",
  "Disetujui / Ditolak",
  "Selesai",
];

const activityTypes = [
  "Kegiatan Publik",
  "Rapat Internal",
  "Seminar",
  "Dokumentasi Pelatihan",
];

const visibilityLevels = ["PUBLIC", "MEMBER", "PENGURUS", "ADMIN"];

const alumniFields = [
  "ID / anggota PODH",
  "Program dan batch",
  "Tanggal selesai / lulus",
  "Referensi sertifikat bila tersedia",
  "Riwayat pelatihan",
  "Tracer study",
  "Status pekerjaan dengan persetujuan alumni",
];

function Toolbar({ label }: { label: string }) {
  return (
    <div className="module-toolbar">
      <span>{label}</span>
      <div>
        <button type="button" onClick={() => window.print()}>
          Cetak / PDF
        </button>
        <button type="button" disabled>
          Tambah Data • setelah API
        </button>
      </div>
    </div>
  );
}

function EmptyTable({
  columns,
  message,
}: {
  columns: string[];
  message: string;
}) {
  return (
    <div className="ops-table-wrap">
      <table className="ops-data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length} className="ops-data-empty">
              {message}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RequestsModule() {
  return (
    <section className="ops-module-detail">
      <div className="admin-module-hero">
        <span>PERMINTAAN PERUSAHAAN</span>
        <h2>Permintaan → review PODH → CV → selesai</h2>
        <p>
          Satu alur status untuk permintaan perusahaan. Data komersial CV tetap
          dipisahkan dari administrasi organisasi PODH.
        </p>
      </div>

      <Toolbar label="Workflow permintaan" />

      <div className="request-status-flow">
        {requestStatuses.map((status, index) => (
          <article key={status}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{status}</strong>
          </article>
        ))}
      </div>

      <div className="ops-definition-grid">
        <article>
          <small>FORM PERMINTAAN</small>
          <h3>Data yang disiapkan</h3>
          <ul>
            <li>Nama perusahaan</li>
            <li>PIC dan kontak</li>
            <li>Kebutuhan tenaga kerja</li>
            <li>Jumlah kebutuhan</li>
            <li>Lokasi / kebutuhan kerja</li>
            <li>Catatan dan dokumen pendukung</li>
          </ul>
        </article>
        <article>
          <small>AUDIT STATUS</small>
          <h3>Riwayat tidak ditimpa</h3>
          <ul>
            <li>Status saat ini</li>
            <li>Waktu perubahan</li>
            <li>Admin yang mengubah</li>
            <li>Catatan tindak lanjut</li>
            <li>Referensi penerusan ke CV</li>
          </ul>
        </article>
      </div>

      <EmptyTable
        columns={["Perusahaan", "Kebutuhan", "PIC", "Status", "Update"]}
        message="Belum ada data permintaan produksi."
      />
    </section>
  );
}

function ActivitiesModule() {
  return (
    <section className="ops-module-detail">
      <div className="admin-module-hero">
        <span>KEGIATAN & RAPAT</span>
        <h2>Kegiatan publik dan administrasi internal</h2>
        <p>
          Dokumentasi organisasi, rapat, seminar, serta materi dapat memakai
          tingkat visibilitas yang berbeda agar data internal tidak tampil ke publik.
        </p>
      </div>

      <Toolbar label="Kegiatan organisasi" />

      <div className="ops-definition-grid ops-definition-grid-four">
        {activityTypes.map((type) => (
          <article key={type}>
            <small>JENIS</small>
            <h3>{type}</h3>
            <p>Struktur pencatatan siap, menunggu data resmi.</p>
          </article>
        ))}
      </div>

      <section className="visibility-panel">
        <div>
          <small>VISIBILITAS</small>
          <h3>Hak lihat konten</h3>
          <p>
            Setiap kegiatan atau dokumen nantinya memilih satu tingkat akses.
          </p>
        </div>
        <div className="visibility-tags">
          {visibilityLevels.map((level) => (
            <span key={level}>{level}</span>
          ))}
        </div>
      </section>

      <div className="ops-definition-grid">
        <article>
          <small>RAPAT</small>
          <h3>Notulen terstruktur</h3>
          <ul>
            <li>Agenda</li>
            <li>Pembahasan</li>
            <li>Keputusan</li>
            <li>Daftar hadir berdasarkan ID anggota</li>
          </ul>
        </article>
        <article>
          <small>DOKUMENTASI</small>
          <h3>Arsip kegiatan</h3>
          <ul>
            <li>Foto dan video</li>
            <li>Materi seminar</li>
            <li>Dokumen kegiatan</li>
            <li>Kontrol akses publik / internal</li>
          </ul>
        </article>
      </div>

      <EmptyTable
        columns={["Kegiatan", "Jenis", "Tanggal", "Visibilitas", "Status"]}
        message="Belum ada kegiatan produksi yang dimasukkan."
      />
    </section>
  );
}

function AlumniModule() {
  return (
    <section className="ops-module-detail">
      <div className="admin-module-hero">
        <span>ALUMNI PODH</span>
        <h2>Riwayat lulusan per program dan batch</h2>
        <p>
          Alumni adalah riwayat kelulusan program, bukan pengganti status
          keanggotaan. Satu anggota dapat memiliki lebih dari satu record alumni.
        </p>
      </div>

      <Toolbar label="Data alumni" />

      <div className="alumni-principle-grid">
        <article>
          <small>ANGGOTA</small>
          <strong>1 akun anggota</strong>
          <p>Identitas utama tetap satu.</p>
        </article>
        <span>→</span>
        <article>
          <small>ALUMNI</small>
          <strong>Banyak riwayat</strong>
          <p>Welder, K3, Crane, Rigger, atau batch lain.</p>
        </article>
        <span>→</span>
        <article>
          <small>TRACER</small>
          <strong>Tindak lanjut</strong>
          <p>Dicatat dengan persetujuan alumni.</p>
        </article>
      </div>

      <div className="ops-definition-grid">
        <article>
          <small>RECORD ALUMNI</small>
          <h3>Data inti</h3>
          <ul>
            {alumniFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </article>
        <article>
          <small>PRIVASI</small>
          <h3>Tidak otomatis publik</h3>
          <ul>
            <li>Nomor HP tidak dipublikasi otomatis</li>
            <li>Alamat tidak dipublikasi otomatis</li>
            <li>Status pekerjaan perlu persetujuan</li>
            <li>Direktori publik hanya bila alumni menyetujui</li>
          </ul>
        </article>
      </div>

      <EmptyTable
        columns={["Alumni", "Program", "Batch", "Lulus", "Tracer", "Status"]}
        message="Belum ada record alumni produksi."
      />
    </section>
  );
}

function GenericModulePanel({ module }: { module: keyof typeof genericModules }) {
  const item = genericModules[module];

  return (
    <section className="admin-module-panel">
      <div className="admin-module-hero">
        <span>{item.eyebrow}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <Toolbar label={item.eyebrow} />

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
          Tidak ada data organisasi yang dibuat-buat. Modul ini menyiapkan
          alur admin sampai backend tahap berikutnya diaktifkan.
        </p>
      </div>
    </section>
  );
}

export function AdminModulePanel({ module }: { module: AdminModuleKey }) {
  if (module === "requests") return <RequestsModule />;
  if (module === "activities") return <ActivitiesModule />;
  if (module === "alumni") return <AlumniModule />;

  return <GenericModulePanel module={module} />;
}
