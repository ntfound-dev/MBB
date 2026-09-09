export type ProgramSlug = "welder" | "rigger" | "k3";

export type ProgramDetail = {
  slug: ProgramSlug;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  location: string;
  duration: string;
  certificate: string;
  topics: string[];
  facilities: string[];
  requirements: string[];
};

export const programDetails: ProgramDetail[] = [
  {
    slug: "welder",
    name: "Welder",
    subtitle: "Kompetensi pengelasan untuk lingkungan kerja industri.",
    description:
      "Pelatihan yang membantu peserta memahami dasar pengelasan, prosedur kerja, penggunaan peralatan, disiplin teknis, dan keselamatan kerja.",
    price: "Rp7.500.000",
    location: "Muara Badak",
    duration: "Menyesuaikan batch",
    certificate: "Diterbitkan lembaga mitra sesuai ketentuan program",
    topics: ["Dasar pengelasan", "Pengenalan peralatan", "Prosedur kerja", "Keselamatan kerja", "Evaluasi kompetensi"],
    facilities: ["Materi pelatihan", "Peralatan praktik sesuai program", "Konsumsi selama kegiatan", "Evaluasi peserta", "Administrasi sertifikasi"],
    requirements: ["Identitas diri yang masih berlaku", "Mengisi formulir pendaftaran", "Memenuhi persyaratan kesehatan program", "Mengikuti seluruh rangkaian pelatihan"],
  },
  {
    slug: "rigger",
    name: "Rigger",
    subtitle: "Rigging dan kesiapan kerja pengangkatan beban.",
    description:
      "Pelatihan yang membangun pemahaman mengenai rigging, lifting gear, komunikasi lapangan, prosedur pengangkatan, dan keselamatan kerja.",
    price: "Rp7.500.000",
    location: "Muara Badak",
    duration: "Menyesuaikan batch",
    certificate: "Diterbitkan lembaga mitra sesuai ketentuan program",
    topics: ["Dasar rigging", "Pengenalan lifting gear", "Komunikasi dan hand signal", "Prosedur pengangkatan", "Keselamatan kerja"],
    facilities: ["Materi pelatihan", "Peralatan praktik sesuai program", "Konsumsi selama kegiatan", "Evaluasi peserta", "Administrasi sertifikasi"],
    requirements: ["Identitas diri yang masih berlaku", "Mengisi formulir pendaftaran", "Memenuhi persyaratan kesehatan program", "Mengikuti seluruh rangkaian pelatihan"],
  },
  {
    slug: "k3",
    name: "K3",
    subtitle: "Keselamatan dan kesehatan kerja untuk lingkungan industri.",
    description:
      "Pelatihan yang membantu peserta membangun kesadaran risiko, memahami prosedur keselamatan, dan menerapkan budaya kerja yang lebih aman.",
    price: "Rp7.500.000",
    location: "Muara Badak",
    duration: "Menyesuaikan batch",
    certificate: "Diterbitkan lembaga mitra sesuai ketentuan program",
    topics: ["Identifikasi bahaya", "Risk awareness", "Prosedur K3", "Tanggung jawab pekerja", "Budaya keselamatan"],
    facilities: ["Materi pelatihan", "Konsumsi selama kegiatan", "Evaluasi peserta", "Administrasi sertifikasi", "Dokumentasi kegiatan"],
    requirements: ["Identitas diri yang masih berlaku", "Mengisi formulir pendaftaran", "Memenuhi persyaratan program", "Mengikuti seluruh rangkaian pelatihan"],
  },
];

export function getProgramDetail(slug: string) {
  return programDetails.find((program) => program.slug === slug);
}
