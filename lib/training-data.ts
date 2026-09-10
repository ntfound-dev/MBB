export type TrainingStatus = "open" | "closed" | "upcoming";
export type TrainingKind = "welder" | "k3" | "crane" | "rigger";

export type Training = {
  slug: string;
  kind: TrainingKind;
  title: string;
  category: string;
  status: TrainingStatus;
  registrationWindow: string;
  trainingDate: string;
  method: string;
  location: string;
  quota: string;
  facilitator: string;
  fee: string;
  certificate: string;
  description: string;
  topics: string[];
  featured: boolean;
};

export const trainings: Training[] = [
  {
    slug: "welder",
    kind: "welder",
    title: "Pelatihan Welder",
    category: "Welder",
    status: "upcoming",
    registrationWindow: "Menunggu jadwal resmi",
    trainingDate: "Akan diumumkan",
    method: "Tatap muka",
    location: "Muara Badak",
    quota: "Akan diumumkan",
    facilitator: "Akan diumumkan",
    fee: "Menunggu keputusan resmi",
    certificate: "Lembaga penerbit akan dicantumkan pada batch resmi",
    description:
      "Program pengembangan kompetensi pengelasan untuk membantu peserta memahami dasar teknis, prosedur kerja, penggunaan peralatan, disiplin, dan keselamatan kerja.",
    topics: [
      "Dasar dan prosedur pengelasan",
      "Pengenalan peralatan kerja",
      "Keselamatan kerja",
      "Praktik dan evaluasi",
    ],
    featured: true,
  },
  {
    slug: "k3",
    kind: "k3",
    title: "Pelatihan K3",
    category: "Keselamatan & Kesehatan Kerja",
    status: "upcoming",
    registrationWindow: "Menunggu jadwal resmi",
    trainingDate: "Akan diumumkan",
    method: "Tatap muka",
    location: "Muara Badak",
    quota: "Akan diumumkan",
    facilitator: "Akan diumumkan",
    fee: "Menunggu keputusan resmi",
    certificate: "Lembaga penerbit akan dicantumkan pada batch resmi",
    description:
      "Program yang membangun pemahaman peserta mengenai identifikasi bahaya, risiko, prosedur keselamatan, dan budaya kerja aman.",
    topics: [
      "Identifikasi bahaya",
      "Penilaian risiko",
      "Prosedur K3",
      "Budaya keselamatan",
    ],
    featured: true,
  },
  {
    slug: "operator-crane",
    kind: "crane",
    title: "Pelatihan Operator Crane",
    category: "Operator Crane",
    status: "upcoming",
    registrationWindow: "Menunggu jadwal resmi",
    trainingDate: "Akan diumumkan",
    method: "Tatap muka",
    location: "Muara Badak",
    quota: "Akan diumumkan",
    facilitator: "Akan diumumkan",
    fee: "Menunggu keputusan resmi",
    certificate: "Lembaga penerbit akan dicantumkan pada batch resmi",
    description:
      "Program kompetensi operasi crane yang menekankan pemeriksaan alat, komunikasi lapangan, prosedur pengangkatan, dan keselamatan kerja.",
    topics: [
      "Dasar operasi crane",
      "Pemeriksaan alat dan area kerja",
      "Komunikasi dan hand signal",
      "Prosedur pengangkatan aman",
    ],
    featured: true,
  },
  {
    slug: "rigger",
    kind: "rigger",
    title: "Pelatihan Rigger",
    category: "Rigging & Lifting",
    status: "upcoming",
    registrationWindow: "Menunggu jadwal resmi",
    trainingDate: "Akan diumumkan",
    method: "Tatap muka",
    location: "Muara Badak",
    quota: "Akan diumumkan",
    facilitator: "Akan diumumkan",
    fee: "Menunggu keputusan resmi",
    certificate: "Lembaga penerbit akan dicantumkan pada batch resmi",
    description:
      "Program kompetensi rigging dan lifting untuk memahami peralatan, komunikasi lapangan, prosedur pengangkatan, dan keselamatan.",
    topics: [
      "Dasar rigging",
      "Pengenalan lifting gear",
      "Hand signal",
      "Prosedur pengangkatan",
    ],
    featured: true,
  },
];

export const featuredTrainings = trainings.filter((training) => training.featured);

export function getTraining(slug: string) {
  return trainings.find((training) => training.slug === slug);
}

export function getStatusLabel(status: TrainingStatus) {
  if (status === "open") return "BUKA";
  if (status === "closed") return "TUTUP";
  return "SEGERA";
}
