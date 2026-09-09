export type ProgramKey = "welder" | "rigger" | "k3";

export type PaymentStatus = "Lunas" | "Cicilan" | "Menunggu";
export type TrainingStatus =
  | "Pendaftaran"
  | "Siap Pelatihan"
  | "Berjalan"
  | "Selesai";
export type CertificateStatus =
  | "Belum Diproses"
  | "Siap Dikirim"
  | "Diproses Mitra"
  | "Terbit";

export type Participant = {
  id: string;
  name: string;
  phoneMasked: string;
  nikMasked: string;
  payment: PaymentStatus;
  attendance: number;
  score: number | null;
  certificate: CertificateStatus;
};

export type SeasonProgram = {
  key: ProgramKey;
  name: string;
  code: string;
  date: string;
  trainingStatus: TrainingStatus;
  participants: Participant[];
};

export type Season = {
  id: string;
  name: string;
  subtitle: string;
  status: "Aktif" | "Rencana" | "Selesai";
  programs: SeasonProgram[];
};

const season1: Season = {
  id: "season-1",
  name: "Season 1",
  subtitle: "Pelatihan Kompetensi 2026",
  status: "Aktif",
  programs: [
    {
      key: "welder",
      name: "Welder",
      code: "S1-WEL",
      date: "Oktober 2026",
      trainingStatus: "Siap Pelatihan",
      participants: [
        {
          id: "MBB-S1-W001",
          name: "Rizky P.",
          phoneMasked: "08•• •••• 6190",
          nikMasked: "64••••••••••1854",
          payment: "Cicilan",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
        {
          id: "MBB-S1-W002",
          name: "Fajar H.",
          phoneMasked: "08•• •••• 2471",
          nikMasked: "64••••••••••4419",
          payment: "Lunas",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
        {
          id: "MBB-S1-W003",
          name: "Arman J.",
          phoneMasked: "08•• •••• 5519",
          nikMasked: "64••••••••••3011",
          payment: "Lunas",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
      ],
    },
    {
      key: "rigger",
      name: "Rigger",
      code: "S1-RIG",
      date: "September 2026",
      trainingStatus: "Selesai",
      participants: [
        {
          id: "MBB-S1-R001",
          name: "Ahmad F.",
          phoneMasked: "08•• •••• 1287",
          nikMasked: "64••••••••••2143",
          payment: "Lunas",
          attendance: 100,
          score: 86,
          certificate: "Diproses Mitra",
        },
        {
          id: "MBB-S1-R002",
          name: "Dwi S.",
          phoneMasked: "08•• •••• 0038",
          nikMasked: "64••••••••••5301",
          payment: "Lunas",
          attendance: 100,
          score: 82,
          certificate: "Siap Dikirim",
        },
        {
          id: "MBB-S1-R003",
          name: "Andi K.",
          phoneMasked: "08•• •••• 1184",
          nikMasked: "64••••••••••7711",
          payment: "Menunggu",
          attendance: 75,
          score: 78,
          certificate: "Belum Diproses",
        },
      ],
    },
    {
      key: "k3",
      name: "K3",
      code: "S1-K3",
      date: "September 2026",
      trainingStatus: "Selesai",
      participants: [
        {
          id: "MBB-S1-K001",
          name: "Nur A.",
          phoneMasked: "08•• •••• 4421",
          nikMasked: "64••••••••••7720",
          payment: "Lunas",
          attendance: 100,
          score: 91,
          certificate: "Diproses Mitra",
        },
        {
          id: "MBB-S1-K002",
          name: "Yuni M.",
          phoneMasked: "08•• •••• 9081",
          nikMasked: "64••••••••••1028",
          payment: "Lunas",
          attendance: 100,
          score: 88,
          certificate: "Terbit",
        },
        {
          id: "MBB-S1-K003",
          name: "Siti R.",
          phoneMasked: "08•• •••• 7712",
          nikMasked: "64••••••••••9842",
          payment: "Cicilan",
          attendance: 100,
          score: 85,
          certificate: "Siap Dikirim",
        },
      ],
    },
  ],
};

const season2: Season = {
  id: "season-2",
  name: "Season 2",
  subtitle: "Rencana Pelatihan Berikutnya",
  status: "Rencana",
  programs: [
    {
      key: "welder",
      name: "Welder",
      code: "S2-WEL",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [
        {
          id: "MBB-S2-W001",
          name: "Budi R.",
          phoneMasked: "08•• •••• 2091",
          nikMasked: "64••••••••••6702",
          payment: "Menunggu",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
      ],
    },
    {
      key: "rigger",
      name: "Rigger",
      code: "S2-RIG",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [
        {
          id: "MBB-S2-R001",
          name: "Rahmat T.",
          phoneMasked: "08•• •••• 3810",
          nikMasked: "64••••••••••1113",
          payment: "Menunggu",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
      ],
    },
    {
      key: "k3",
      name: "K3",
      code: "S2-K3",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [
        {
          id: "MBB-S2-K001",
          name: "Maya S.",
          phoneMasked: "08•• •••• 5294",
          nikMasked: "64••••••••••8082",
          payment: "Menunggu",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
      ],
    },
  ],
};

export const mockSeasons: Season[] = [season1, season2];

export function getSeasonSummary(season: Season) {
  const participants = season.programs.flatMap((program) => program.participants);
  const paid = participants.filter((participant) => participant.payment === "Lunas").length;
  const scored = participants.filter((participant) => participant.score !== null);
  const certificates = participants.filter(
    (participant) => participant.certificate === "Terbit",
  ).length;

  const averageScore = scored.length
    ? Math.round(
        scored.reduce((sum, participant) => sum + (participant.score ?? 0), 0) /
          scored.length,
      )
    : 0;

  return {
    participants: participants.length,
    paid,
    certificates,
    averageScore,
  };
}
