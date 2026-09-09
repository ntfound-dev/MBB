export type TrainingProgram = {
  slug: "welder" | "rigger" | "k3";
  name: string;
  short: string;
  description: string;
  topics: string[];
};

export const siteData = {
  organization: {
    name: "Muara Badak Bersatu",
    shortName: "MBB",
    location: "Muara Badak, Kalimantan Timur",
    tagline: "Pelatihan & Pengembangan Kompetensi Tenaga Kerja Lokal",
  },

  programs: [
    {
      slug: "welder",
      name: "Welder",
      short: "Kompetensi pengelasan untuk lingkungan kerja industri.",
      description:
        "Program pelatihan yang membantu peserta memahami dasar kerja pengelasan, prosedur, disiplin teknis, serta aspek keselamatan dalam pelaksanaan pekerjaan.",
      topics: [
        "Dasar dan prosedur pengelasan",
        "Pengenalan peralatan kerja",
        "Keselamatan saat bekerja",
        "Evaluasi hasil pelatihan",
      ],
    },
    {
      slug: "rigger",
      name: "Rigger",
      short: "Kesiapan kerja rigging dan pengangkatan beban.",
      description:
        "Program pelatihan yang membangun pemahaman mengenai rigging, penggunaan peralatan, komunikasi lapangan, prosedur pengangkatan, dan keselamatan kerja.",
      topics: [
        "Dasar rigging",
        "Pengenalan lifting gear",
        "Komunikasi lapangan",
        "Prosedur keselamatan",
      ],
    },
    {
      slug: "k3",
      name: "K3",
      short: "Pemahaman keselamatan dan kesehatan kerja.",
      description:
        "Program yang membantu peserta membangun kesadaran risiko, memahami prosedur keselamatan, dan menerapkan budaya kerja yang lebih aman di lingkungan industri.",
      topics: [
        "Identifikasi risiko",
        "Prosedur keselamatan kerja",
        "Tanggung jawab pekerja",
        "Budaya K3",
      ],
    },
  ] satisfies TrainingProgram[],

  publicProcess: [
    {
      title: "Pilih pelatihan",
      description:
        "Pelajari program yang tersedia dan pilih pelatihan yang sesuai dengan kebutuhan kompetensi.",
    },
    {
      title: "Daftar sebagai peserta",
      description:
        "Lengkapi data pendaftaran melalui kanal resmi Muara Badak Bersatu.",
    },
    {
      title: "Ikuti pelatihan",
      description:
        "Peserta mengikuti kegiatan sesuai jadwal, materi, dan ketentuan program.",
    },
    {
      title: "Ikuti evaluasi",
      description:
        "Peserta mengikuti evaluasi atau penilaian yang ditetapkan pada program pelatihan.",
    },
    {
      title: "Proses hasil",
      description:
        "Hasil pelatihan diproses sesuai prosedur program dan ketentuan pihak penerbit sertifikat.",
    },
  ],

  values: [
    {
      title: "Akses lebih dekat",
      description:
        "Membawa kesempatan pengembangan kompetensi lebih dekat kepada masyarakat Muara Badak dan sekitarnya.",
    },
    {
      title: "Administrasi tertib",
      description:
        "Pendaftaran, informasi program, kegiatan, dan hasil pelatihan dikelola melalui proses administrasi yang terstruktur.",
    },
    {
      title: "Berorientasi industri",
      description:
        "Program diarahkan pada jenis kompetensi yang relevan dengan aktivitas kerja dan kebutuhan lingkungan industri.",
    },
    {
      title: "Keselamatan sebagai dasar",
      description:
        "Budaya kerja aman menjadi bagian penting dalam setiap program yang berkaitan dengan aktivitas lapangan.",
    },
  ],

  faq: [
    {
      question: "Siapa yang dapat mengikuti pelatihan?",
      answer:
        "Persyaratan peserta berbeda pada setiap program. Ketentuan lengkap akan ditampilkan pada pengumuman batch atau disampaikan melalui kanal pendaftaran resmi.",
    },
    {
      question: "Apakah pelatihan dilaksanakan di Muara Badak?",
      answer:
        "Lokasi pelaksanaan akan dicantumkan pada informasi resmi setiap batch. Tujuan program adalah membuat akses pelatihan lebih dekat bagi masyarakat daerah.",
    },
    {
      question: "Bagaimana cara mendaftar?",
      answer:
        "Pendaftaran dilakukan melalui tautan resmi yang tersedia di situs ini. Hindari melakukan pendaftaran atau pembayaran melalui kontak yang tidak tercantum sebagai kanal resmi.",
    },
    {
      question: "Apakah mengikuti pelatihan berarti otomatis mendapat sertifikat?",
      answer:
        "Tidak. Peserta tetap mengikuti proses pelatihan dan evaluasi sesuai ketentuan program. Penerbitan sertifikat mengikuti hasil dan prosedur lembaga penerbit yang berlaku.",
    },
    {
      question: "Siapa yang menerbitkan sertifikat?",
      answer:
        "Nama lembaga penerbit dan jenis sertifikat akan dicantumkan pada informasi resmi setiap program setelah detail kerja sama dan pelaksanaan telah ditetapkan.",
    },
    {
      question: "Di mana informasi biaya dan jadwal diumumkan?",
      answer:
        "Biaya, jadwal, fasilitas, persyaratan, dan ketentuan lain diumumkan pada halaman atau pengumuman resmi untuk setiap batch pelatihan.",
    },
  ],
} as const;
