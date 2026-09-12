export type ProgramKey = "welder" | "crane" | "k3" | "rigger";

export type PaymentStatus = "Lunas" | "Menunggu";
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
  subtitle: "Program Kompetensi PODH 2026",
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
          id: "PODH-S1-W001",
          name: "Rizky P.",
          phoneMasked: "08•• •••• 6190",
          nikMasked: "64••••••••••1854",
          payment: "Menunggu",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
        {
          id: "PODH-S1-W002",
          name: "Fajar H.",
          phoneMasked: "08•• •••• 2471",
          nikMasked: "64••••••••••4419",
          payment: "Lunas",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
      ],
    },
    {
      key: "crane",
      name: "Operator Crane",
      code: "S1-CRN",
      date: "Oktober 2026",
      trainingStatus: "Pendaftaran",
      participants: [
        {
          id: "PODH-S1-C001",
          name: "Ahmad F.",
          phoneMasked: "08•• •••• 1287",
          nikMasked: "64••••••••••2143",
          payment: "Lunas",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
        {
          id: "PODH-S1-C002",
          name: "Dwi S.",
          phoneMasked: "08•• •••• 0038",
          nikMasked: "64••••••••••5301",
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
      code: "S1-K3",
      date: "Oktober 2026",
      trainingStatus: "Pendaftaran",
      participants: [
        {
          id: "PODH-S1-K001",
          name: "Nur A.",
          phoneMasked: "08•• •••• 4421",
          nikMasked: "64••••••••••7720",
          payment: "Lunas",
          attendance: 0,
          score: null,
          certificate: "Belum Diproses",
        },
        {
          id: "PODH-S1-K002",
          name: "Yuni M.",
          phoneMasked: "08•• •••• 9081",
          nikMasked: "64••••••••••1028",
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
      code: "S1-RIG",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [],
    },
  ],
};

const season2: Season = {
  id: "season-2",
  name: "Season 2",
  subtitle: "Rencana Program Berikutnya",
  status: "Rencana",
  programs: [
    {
      key: "welder",
      name: "Welder",
      code: "S2-WEL",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [],
    },
    {
      key: "crane",
      name: "Operator Crane",
      code: "S2-CRN",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [],
    },
    {
      key: "k3",
      name: "K3",
      code: "S2-K3",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [],
    },
    {
      key: "rigger",
      name: "Rigger",
      code: "S2-RIG",
      date: "Belum ditentukan",
      trainingStatus: "Pendaftaran",
      participants: [],
    },
  ],
};

export const mockSeasons: Season[] = [season1, season2];

export function getSeasonSummary(season: Season) {
  const participants = season.programs.flatMap(
    (program) => program.participants,
  );

  const paid = participants.filter(
    (participant) => participant.payment === "Lunas",
  ).length;

  const scored = participants.filter(
    (participant) => participant.score !== null,
  );

  const certificates = participants.filter(
    (participant) => participant.certificate === "Terbit",
  ).length;

  const averageScore = scored.length
    ? Math.round(
        scored.reduce(
          (sum, participant) => sum + (participant.score ?? 0),
          0,
        ) / scored.length,
      )
    : 0;

  return {
    participants: participants.length,
    paid,
    certificates,
    averageScore,
  };
}
